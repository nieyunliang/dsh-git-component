# dsh-git-component — Git 面板（DeepSeek Harness WebUI 插件）

> DeepSeek Harness Web GUI 的 Git 插件：悬浮在窗口右侧的面板，实时查看当前更改（已暂存 / 未暂存 / 未跟踪），支持提交、提交并推送、推送，提交信息留空时自动用 AI 生成。
>
> A Git plugin for the DeepSeek Harness Web GUI: a floating right-side panel showing your working-tree changes, with commit / commit-and-push / push and AI commit-message autofill.

## 功能 / Features

- 右侧悬浮面板（376px 宽，透明卡片风），可折叠为 Git 分支小图标
- 三个分组：**已暂存 / 未暂存 / 未跟踪**（porcelain v1 精确解析，含重命名）
- 点击文件内联查看 diff（最多 400 行）
- 提交 / 提交并推送 / 推送
- 提交信息留空 → 自动用当前默认模型生成中文提交信息（≤60 字，单行）
- 15 秒自动刷新；跟随当前会话的工作目录（切换会话/工作区自动重载）
- 操作通过宿主 `shell` 执行 git，尊重沙箱策略；`GIT_TERMINAL_PROMPT=0` 禁止交互

## 安装 / Install

从 GitHub（git 源，推荐）：

```sh
dsh plugin --profile web add github:nieyunliang/dsh-git-component
```

从本地源码目录（开发/测试，需在插件父目录执行）：

```sh
dsh plugin --profile web add ./dsh-git-component
```

> `dsh plugin add` 会自动把声明了 `dsh.bundle.patch` 的包加入该 profile 的
> `dsh.profile.bundles` 层（即 `dsh plugin --profile web --dump-config` 里能看到
> `git-component` 这一行）。之后**重启** webui 进程生效（Node 模块缓存不会热替换旧代码）。
>
> 注意：git 源安装需要 pnpm 允许构建脚本（`prepare`），如被拦截请按 pnpm 提示在
> profile 的 `pnpm-workspace.yaml` 的 `allowBuilds` 中加入对应 key 后重试。

要求：`web` profile（提供 `webServer` 与 `shell` 服务）、Node ≥ 22、Git ≥ 2.x。
插件零运行时依赖（不 import 任何包，直接消费 Cordis `ctx`）。

## 使用 / Usage

1. 重启后打开 WebUI，右侧出现 Git 面板（右上角小分支图标可展开/收起）
2. 面板显示当前仓库的三个分组与变更文件；点击文件看 diff
3. 提交：填入信息后点「提交」或「提交并推送」（Ctrl/⌘+Enter 提交）
4. 留空提交信息：点提交后自动生成 AI 提交信息并提交
5. 「推送」按钮推送当前分支到上游

## 安全说明 / Security

- git 命令在**当前会话工作目录**下执行（自动 `git rev-parse --show-toplevel` 定位仓库根）
- 面板调用宿主 `/git-component/*` 路由，宿主侧按会话沙箱策略执行；不会放宽你当前的文件权限模式
- 仓库内执行的 git 操作与你在终端里敲等价命令的风险一致

## 原理 / How it works

单个 npm 包同时承载两半：

| 半 | 文件 | 机制 |
|---|---|---|
| Host 路由 | `index.js` | 包主入口；`inject: [webServer, shell]` 等 `webServer` 就绪后注册 `/git-component/status\|diff\|commit\|push\|automessage` 五个 exact 路由 |
| 浏览器面板 | `client.js` | `exports["./client"]` + `dsh.client.platform: web`，由 `dsh-client-modules` 扫描发现，经 `/plugins/git-component/client.js` 注入页面，注册到 `shell.overlay` 插槽（id `git-component`, order 90） |

`cordis.patch.yml` 是 bundle 层：profile 列出本 bundle 时插入一行 `git-component`。
激活顺序由服务可用性驱动，`inject` 保证 `webServer`/`shell` 就绪后才 apply。

## 开发 / Development

```
dsh-git-component/
├── package.json        # dsh.bundle.patch + dsh.client 声明
├── cordis.patch.yml    # bundle 补丁层（一行 insert）
├── index.js            # Host 半：git 操作 + HTTP 路由（零依赖）
├── client.js           # 浏览器半：手写 __ModuleLoader__ bundle（无构建步骤）
├── README.md
└── LICENSE             # MIT
```

修改后本地验证：

```sh
dsh plugin --profile web add ./dsh-git-component   # 重装（或先 remove）
dsh --profile web --dump-config | grep git-component # 确认行存在
# 重启 webui 进程
```

## License

MIT © nieyunliang
