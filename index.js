// dsh-git-panel — Host half.
// Exposes git operations as HTTP routes consumed by the browser bundle
// (./client.js, served via exports["./client"]). Zero runtime dependencies.
const sq = (s) => "'" + String(s).replace(/'/g, "'\\''") + "'"

// Hard dependencies: activation is service-availability driven, so without
// inject this row could apply before webServer/shell exist and silently no-op.
const inject = ['webServer', 'shell']

export default {
  inject,
  apply(ctx) {
    const shell = ctx.get('shell')
    const sandboxPolicy = ctx.get('sandboxPolicy')
    const webServer = ctx.get('webServer')
    if (shell === undefined || webServer === undefined) return

    function sessionMode() {
      if (sandboxPolicy === undefined) return null
      try { return sandboxPolicy.resolve().mode } catch (e) { return null }
    }

    async function runGit(cwd, args, opts) {
      opts = opts || {}
      const request = {
        command: 'git ' + args,
        workdir: typeof cwd === 'string' && cwd.length > 0 ? cwd : undefined,
        timeoutMs: opts.timeoutMs || 20000,
        stdoutMaxBytes: opts.stdoutMaxBytes || 1024 * 1024,
        env: { GIT_TERMINAL_PROMPT: '0' },
      }
      if (opts.policy !== undefined) request.sandboxPolicy = opts.policy
      if (opts.stdin !== undefined) request.stdin = opts.stdin
      try {
        const spec = shell.resolve(request)
        return await shell.run(spec)
      } catch (err) {
        return { exitCode: -1, stdout: { text: '' }, stderr: { text: 'git 执行失败: ' + String((err && err.message) || err) } }
      }
    }

    async function resolveRepo(cwd) {
      const res = await runGit(cwd, 'rev-parse --show-toplevel', { timeoutMs: 10000, stdoutMaxBytes: 65536 })
      if (res.exitCode !== 0) return null
      const out = (res.stdout && res.stdout.text || '').trim()
      return out || null
    }

    // Never widen the session mode; only re-root the workspace-write boundary at the target repo.
    function policyFor(root) {
      const mode = sessionMode()
      if (mode === null) return undefined
      if (mode === 'read-only') return { mode: 'read-only', workspaceRoot: root }
      return { mode: 'workspace-write', workspaceRoot: root }
    }

    function errText(res, fallback) {
      return ((res.stderr && res.stderr.text) || (res.stdout && res.stdout.text) || fallback).trim()
    }

    function parseStatus(text) {
      const records = text.split('\0').filter((r) => r.length > 0)
      const view = { branch: 'HEAD', upstream: null, ahead: 0, behind: 0, gone: false, detached: true, changes: [] }
      let i = 0
      if (records.length > 0 && records[0].startsWith('## ')) {
        const head = records[0].slice(3)
        i = 1
        const m = head.match(/^(.+?)(?:\.\.\.([^\s]+))?(?:\s+\[([^\]]*)\])?$/)
        if (m) {
          if (m[1] === 'HEAD (no branch)') { view.detached = true; view.branch = 'HEAD' }
          else { view.detached = false; view.branch = m[1] }
          if (m[2]) view.upstream = m[2]
          const meta = m[3]
          if (meta === 'gone') view.gone = true
          else if (meta) {
            const am = meta.match(/ahead (\d+)/)
            const bm = meta.match(/behind (\d+)/)
            if (am) view.ahead = parseInt(am[1], 10)
            if (bm) view.behind = parseInt(bm[1], 10)
          }
        }
      }
      // porcelain v1: XY path where X is the index slot and Y the worktree slot;
      // either slot may be a space (unmodified), so both classes must include ' '.
      const statusRe = /^([ A-Z?!T])([ A-Z?!T]) (.*)$/
      for (; i < records.length; i++) {
        const rec = records[i]
        const m = statusRe.exec(rec)
        if (!m) continue
        const x = m[1]
        const y = m[2]
        let path = m[3]
        let oldPath = null
        if ((x === 'R' || x === 'C') && i + 1 < records.length && !statusRe.test(records[i + 1])) {
          oldPath = records[i + 1]
          i++
        }
        const state = x === '?' ? 'untracked' : x === ' ' ? 'unstaged' : 'staged'
        view.changes.push({ path, oldPath, x, y, state })
      }
      return view
    }

    const send = (res, code, body) => {
      res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify(body))
    }
    const readBody = (req) => new Promise((resolve, reject) => {
      let data = ''
      req.on('data', (c) => {
        data += c
        if (data.length > 1e6) { req.destroy(); reject(new Error('body too large')) }
      })
      req.on('end', () => {
        try { resolve(data ? JSON.parse(data) : {}) } catch (e) { reject(e) }
      })
      req.on('error', reject)
    })
    const queryOf = (req) => new URL(req.url, 'http://dsh.local').searchParams
    const route = (path, handler) => ctx.effect(() => webServer.register({ kind: 'exact', path, handler }))

    route('/git-panel/status', async (req, res) => {
      try {
        const cwd = queryOf(req).get('cwd') || ''
        const root = await resolveRepo(cwd)
        if (root === null) return send(res, 200, { ok: false, error: '当前目录不是 Git 仓库' })
        const r = await runGit(cwd, '-c core.quotepath=false status --porcelain=v1 -b -z -uall', {
          timeoutMs: 15000,
          stdoutMaxBytes: 4 * 1024 * 1024,
          policy: policyFor(root),
        })
        if (r.exitCode !== 0) return send(res, 200, { ok: false, error: errText(r, 'git status 失败') })
        const view = parseStatus(r.stdout && r.stdout.text || '')
        view.root = root
        send(res, 200, Object.assign({ ok: true }, view))
      } catch (e) { send(res, 500, { ok: false, error: String((e && e.message) || e) }) }
    })

    route('/git-panel/diff', async (req, res) => {
      try {
        const q = queryOf(req)
        const cwd = q.get('cwd') || ''
        const path = q.get('path') || ''
        if (!path) return send(res, 200, { ok: false, error: '缺少文件路径' })
        const root = await resolveRepo(cwd)
        if (root === null) return send(res, 200, { ok: false, error: '当前目录不是 Git 仓库' })
        let command
        if (q.get('untracked') === '1') command = 'diff --no-index /dev/null ' + sq('./' + path)
        else if (q.get('staged') === '1') command = 'diff --cached -- ' + sq(path)
        else command = 'diff -- ' + sq(path)
        const r = await runGit(cwd, '-c core.quotepath=false ' + command, {
          timeoutMs: 15000,
          stdoutMaxBytes: 768 * 1024,
          policy: policyFor(root),
        })
        const out = r.stdout && r.stdout.text || ''
        const err = r.stderr && r.stderr.text || ''
        if (r.exitCode !== 0 && r.exitCode !== 1) return send(res, 200, { ok: false, error: (err || out || 'git diff 失败').trim() })
        send(res, 200, { ok: true, text: out, truncated: !!(r.stdout && r.stdout.truncated) })
      } catch (e) { send(res, 500, { ok: false, error: String((e && e.message) || e) }) }
    })

    route('/git-panel/commit', async (req, res) => {
      try {
        const body = await readBody(req)
        const cwd = typeof body.cwd === 'string' ? body.cwd : ''
        const message = typeof body.message === 'string' ? body.message.trim() : ''
        if (!message) return send(res, 200, { ok: false, error: '提交信息不能为空' })
        const root = await resolveRepo(cwd)
        if (root === null) return send(res, 200, { ok: false, error: '当前目录不是 Git 仓库' })
        const policy = policyFor(root)
        const add = await runGit(cwd, 'add -A', { timeoutMs: 30000, policy })
        if (add.exitCode !== 0) return send(res, 200, { ok: false, error: errText(add, 'git add 失败') })
        const commit = await runGit(cwd, 'commit -F -', { timeoutMs: 30000, stdin: message, policy })
        const out = ((commit.stdout && commit.stdout.text || '') + (commit.stderr && commit.stderr.text || '')).trim()
        if (commit.exitCode !== 0) return send(res, 200, { ok: false, error: out || 'git commit 失败' })
        const short = /^\[[^\]]+\s([0-9a-f]{7,})\]/m.exec(out)
        send(res, 200, { ok: true, hash: short ? short[1] : null, output: out })
      } catch (e) { send(res, 500, { ok: false, error: String((e && e.message) || e) }) }
    })

    route('/git-panel/push', async (req, res) => {
      try {
        const body = await readBody(req)
        const cwd = typeof body.cwd === 'string' ? body.cwd : ''
        const root = await resolveRepo(cwd)
        if (root === null) return send(res, 200, { ok: false, error: '当前目录不是 Git 仓库' })
        const r = await runGit(cwd, 'push', { timeoutMs: 90000, stdoutMaxBytes: 512 * 1024, policy: policyFor(root) })
        const out = ((r.stdout && r.stdout.text || '') + (r.stderr && r.stderr.text || '')).trim()
        if (r.exitCode !== 0) return send(res, 200, { ok: false, error: out || 'git push 失败' })
        send(res, 200, { ok: true, output: out })
      } catch (e) { send(res, 500, { ok: false, error: String((e && e.message) || e) }) }
    })

    // AI-generated commit message from the working-tree changes.
    route('/git-panel/automessage', async (req, res) => {
      try {
        const body = await readBody(req)
        const cwd = typeof body.cwd === 'string' ? body.cwd : ''
        const root = await resolveRepo(cwd)
        if (root === null) return send(res, 200, { ok: false, error: '当前目录不是 Git 仓库' })
        const llm = ctx.get('llm')
        const modelSvc = ctx.get('agentDefaultModel')
        if (llm === undefined || modelSvc === undefined) {
          return send(res, 200, { ok: false, error: '当前环境不支持 AI 生成提交信息' })
        }
        const policy = policyFor(root)
        const stat1 = await runGit(cwd, 'diff --cached --stat', { timeoutMs: 15000, stdoutMaxBytes: 256 * 1024, policy })
        const stat2 = await runGit(cwd, 'diff --stat', { timeoutMs: 15000, stdoutMaxBytes: 256 * 1024, policy })
        const untrackedRes = await runGit(cwd, 'ls-files --others --exclude-standard', { timeoutMs: 10000, stdoutMaxBytes: 256 * 1024, policy })
        let summary = ''
        const s1 = stat1.exitCode === 0 ? (stat1.stdout && stat1.stdout.text || '').trim() : ''
        const s2 = stat2.exitCode === 0 ? (stat2.stdout && stat2.stdout.text || '').trim() : ''
        if (s1) summary += '已暂存的更改:\n' + s1 + '\n'
        if (s2) summary += '未暂存的更改:\n' + s2 + '\n'
        const untracked = untrackedRes.exitCode === 0 ? (untrackedRes.stdout && untrackedRes.stdout.text || '').trim() : ''
        if (untracked) summary += '未跟踪的新文件:\n' + untracked + '\n'
        const diffRes = await runGit(cwd, '-c core.quotepath=false diff HEAD --', { timeoutMs: 20000, stdoutMaxBytes: 768 * 1024, policy })
        let diffText = (diffRes.exitCode === 0 || diffRes.exitCode === 1) ? (diffRes.stdout && diffRes.stdout.text || '') : ''
        if (diffText.length > 4000) diffText = diffText.slice(0, 4000) + '\n…（截断）'
        if (diffText.trim()) summary += '\n具体 diff:\n' + diffText
        if (!summary.trim()) return send(res, 200, { ok: false, error: '没有可提交的更改' })

        const selection = modelSvc.currentSelection()
        if (!selection || !selection.provider || !selection.model) {
          return send(res, 200, { ok: false, error: '未配置默认模型' })
        }
        const system = '你是一个 git 提交信息生成器。根据用户提供的更改内容，生成一条简洁的中文提交信息。要求：单行、不超过 60 字、以动词开头（如 新增/修复/优化/重构/更新/删除）、不使用引号或反引号、不要解释、不要输出任何多余内容。'
        const userPrompt = '请为以下更改生成提交信息：\n' + summary.slice(0, 6000)
        let text = ''
        let failure = null
        const stream = llm.stream({
          provider: selection.provider,
          model: selection.model,
          reasoningEffort: selection.reasoningEffort,
          system,
          messages: [{
            id: 'git-panel-auto-msg',
            role: 'user',
            content: [{ type: 'text', text: userPrompt }],
            source: { kind: 'user' },
          }],
          temperature: 0.3,
          maxTokens: 200,
          stop: ['\n'],
        })
        for await (const chunk of stream) {
          if (chunk.type === 'text-delta') text += chunk.text
          else if (chunk.type === 'finish') {
            const reason = chunk.reason
            if (reason && (reason.kind === 'error' || reason.kind === 'aborted') && reason.failure) failure = reason.failure
          }
        }
        if (!text.trim() && failure) {
          return send(res, 200, { ok: false, error: 'AI 生成失败: ' + (failure.message || failure.code || '未知错误') })
        }
        let msg = text.trim().replace(/^["'`]+|["'`]+$/g, '')
        if (!msg) return send(res, 200, { ok: false, error: 'AI 未能生成提交信息' })
        send(res, 200, { ok: true, message: msg })
      } catch (e) { send(res, 500, { ok: false, error: String((e && e.message) || e) }) }
    })

    console.log('[git-panel] host plugin active: /git-panel/status /git-panel/diff /git-panel/commit /git-panel/push /git-panel/automessage')
  },
}
