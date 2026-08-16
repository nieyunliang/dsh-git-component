window.__ModuleLoader__.load({
	id: "dsh-git-component",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		var React = require("react");

		const CSS = `
.dsh-git-componentanel-root, .dsh-git-componentanel-root * { box-sizing: border-box; }
.dsh-git-componentanel-root {
  position: fixed; top: 84px; right: 14px; bottom: auto;
  width: 376px; height: calc(50vh - 56px);
  z-index: 2147483647; pointer-events: auto;
  display: flex; flex-direction: column;
  border-radius: 18px;
  background: transparent;
  color: var(--dsw-alias-label-primary, #16181d);
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 18%, transparent);
  box-shadow:
    0 1px 3px -1px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 6%, transparent),
    0 6px 16px -8px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 10%, transparent),
    0 14px 32px -16px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 8%, transparent);
  overflow: hidden;
  font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  animation: dsh-git-componentanel-in 0.22s cubic-bezier(0.21, 1.02, 0.73, 1);
}
@keyframes dsh-git-componentanel-in {
  from { opacity: 0; transform: translateX(16px) scale(0.98); }
  to { opacity: 1; transform: none; }
}
.dsh-git-componentanel-header {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 14px 10px;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 8%, transparent);
  background: transparent;
}
.dsh-git-componentanel-logo {
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--dsw-alias-brand-primary, #2563eb);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 20%, transparent);
  border-radius: 8px; padding: 3px 6px;
}
.dsh-git-componentanel-branch {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
  font-size: 12px; color: var(--dsw-alias-label-secondary, #5b6472);
  background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 10%, transparent);
  border-radius: 999px; padding: 2px 10px;
  max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dsh-git-componentanel-branch .dsh-git-componentanel-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--dsw-alias-state-success-primary, #16a34a); flex: none; box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-success-primary, #16a34a) 18%, transparent); }
.dsh-git-componentanel-branch .dsh-git-componentanel-dot.clean { background: var(--dsw-alias-label-secondary, #5b6472); box-shadow: none; }
.dsh-git-componentanel-icobtn {
  border: none; background: transparent; color: var(--dsw-alias-label-secondary, #5b6472);
  width: 26px; height: 26px; border-radius: 8px; cursor: pointer; font-size: 14px; line-height: 1;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.12s ease, color 0.12s ease;
}
.dsh-git-componentanel-icobtn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 8%, transparent); color: var(--dsw-alias-label-primary, #16181d); }
.dsh-git-componentanel-icobtn.loading { animation: dsh-git-componentanel-spin 0.9s linear infinite; }
@keyframes dsh-git-componentanel-spin { to { transform: rotate(360deg); } }
.dsh-git-componentanel-icobtn:disabled { opacity: 0.45; cursor: default; }
.dsh-git-componentanel-body {
  flex: 1; overflow-y: auto; padding: 8px 10px 10px;
  display: flex; flex-direction: column; gap: 10px;
}
.dsh-git-componentanel-body::-webkit-scrollbar { width: 8px; }
.dsh-git-componentanel-body::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 16%, transparent);
  border-radius: 8px; border: 2px solid transparent; background-clip: content-box;
}
.dsh-git-componentanel-section-title {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--dsw-alias-label-secondary, #5b6472);
  margin: 2px 2px 4px;
}
.dsh-git-componentanel-section-title .dsh-git-componentanel-count {
  font-family: ui-monospace, Menlo, Consolas, monospace; font-weight: 700; font-size: 10px;
  color: var(--dsw-alias-label-secondary, #5b6472);
  background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 6%, transparent);
  border-radius: 999px; padding: 0 6px;
}
.dsh-git-componentanel-row {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 6px; border-radius: 9px; cursor: pointer;
  transition: background 0.1s ease;
  min-width: 0;
}
.dsh-git-componentanel-row:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 6%, transparent); }
.dsh-git-componentanel-row.active { background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 9%, transparent); }
.dsh-git-componentanel-badge {
  flex: none; width: 20px; height: 20px; border-radius: 6px;
  display: inline-flex; align-items: center; justify-content: center;
  font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11px; font-weight: 700;
  background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 7%, transparent);
  color: var(--dsw-alias-label-secondary, #5b6472);
}
.dsh-git-componentanel-badge.staged {
  color: var(--dsw-alias-state-success-primary, #16a34a);
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #16a34a) 13%, transparent);
}
.dsh-git-componentanel-badge.unstaged {
  color: var(--dsw-alias-state-warn-primary, #d97706);
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #d97706) 13%, transparent);
}
.dsh-git-componentanel-path {
  font-family: ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
  font-size: 12px; color: var(--dsw-alias-label-primary, #16181d);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0;
}
.dsh-git-componentanel-path .dsh-git-componentanel-old { color: var(--dsw-alias-label-secondary, #5b6472); text-decoration: line-through; }
.dsh-git-componentanel-caret { color: var(--dsw-alias-label-secondary, #5b6472); font-size: 10px; flex: none; transition: transform 0.15s ease; }
.dsh-git-componentanel-row.open .dsh-git-componentanel-caret { transform: rotate(90deg); }
.dsh-git-componentanel-diff {
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 10%, transparent);
  border-radius: 12px; overflow: hidden;
  background: transparent;
}
.dsh-git-componentanel-diff-head {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 6px 10px; font-size: 11px; color: var(--dsw-alias-label-secondary, #5b6472);
  font-family: ui-monospace, Menlo, Consolas, monospace;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 8%, transparent);
  background: transparent;
}
.dsh-git-componentanel-diff-path { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-git-componentanel-diff-pre {
  margin: 0; padding: 8px 0; max-height: 190px; overflow: auto;
  font-family: ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
  font-size: 11.5px; line-height: 1.55; tab-size: 4;
}
.dsh-git-componentanel-diff-pre::-webkit-scrollbar { width: 8px; height: 8px; }
.dsh-git-componentanel-diff-pre::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 16%, transparent); border-radius: 8px; }
.dsh-git-componentanel-dl { display: block; padding: 0 10px; white-space: pre; color: var(--dsw-alias-label-primary, #16181d); }
.dsh-git-componentanel-dl.add { background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #16a34a) 11%, transparent); color: var(--dsw-alias-state-success-primary, #16a34a); }
.dsh-git-componentanel-dl.del { background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 11%, transparent); color: var(--dsw-alias-state-error-primary, #dc2626); }
.dsh-git-componentanel-dl.hunk { color: var(--dsw-alias-brand-primary, #2563eb); background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 4%, transparent); }
.dsh-git-componentanel-dl.meta { color: var(--dsw-alias-label-secondary, #5b6472); font-style: italic; }
.dsh-git-componentanel-empty {
  text-align: center; color: var(--dsw-alias-label-secondary, #5b6472);
  padding: 26px 12px; font-size: 12.5px;
}
.dsh-git-componentanel-empty .dsh-git-componentanel-big { font-size: 22px; margin-bottom: 6px; }
.dsh-git-componentanel-errorbox {
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 32%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 9%, transparent);
  color: var(--dsw-alias-state-error-primary, #dc2626);
  border-radius: 12px; padding: 10px 12px; font-size: 12px; line-height: 1.5;
  word-break: break-word;
}
.dsh-git-componentanel-commit {
  border-top: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 8%, transparent);
  padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 8px;
  background: transparent;
}
.dsh-git-componentanel-textarea {
  width: 100%; resize: none; min-height: 56px; max-height: 120px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 12%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 60%, transparent);
  backdrop-filter: blur(12px);
  color: var(--dsw-alias-label-primary, #16181d);
  padding: 8px 11px; font: 12.5px/1.5 inherit; outline: none;
  transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
}
.dsh-git-componentanel-textarea:focus {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 70%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 20%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 70%, transparent);
}
.dsh-git-componentanel-textarea::placeholder { color: var(--dsw-alias-label-secondary, #5b6472); }
.dsh-git-componentanel-btns { display: flex; gap: 8px; }
.dsh-git-componentanel-btn {
  flex: 1; min-height: 34px; border-radius: 11px; border: 1px solid transparent; cursor: pointer;
  padding: 6px 10px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.02em;
  display: inline-flex; align-items: center; justify-content: center;
  transition: filter 0.12s ease, background 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.dsh-git-componentanel-btn:disabled { opacity: 0.45; cursor: default; }
.dsh-git-componentanel-btn.primary {
  background: linear-gradient(180deg, #3b82f6, #1d4ed8);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 4px 14px -6px rgba(29, 78, 216, 0.55);
}
.dsh-git-componentanel-btn.primary:not(:disabled):hover { filter: brightness(1.08); }
.dsh-git-componentanel-btn.primary:not(:disabled):active { filter: brightness(0.94); }
.dsh-git-componentanel-btn.outline {
  background: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 10%, transparent);
  border-color: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 22%, transparent);
  color: var(--dsw-alias-label-primary, #16181d);
}
.dsh-git-componentanel-btn.outline:not(:disabled):hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: color-mix(in srgb, #3b82f6 12%, transparent);
}
.dsh-git-componentanel-btn.outline:not(:disabled):active { filter: brightness(0.94); }
.dsh-git-componentanel-footer { display: flex; align-items: center; gap: 8px; min-height: 22px; }
.dsh-git-componentanel-push {
  flex: none; border: none; background: transparent; cursor: pointer;
  color: var(--dsw-alias-label-secondary, #5b6472); font-size: 12px; font-weight: 600;
  padding: 2px 4px; border-radius: 6px;
}
.dsh-git-componentanel-push:hover { color: var(--dsw-alias-brand-primary, #2563eb); }
.dsh-git-componentanel-push:disabled { opacity: 0.5; cursor: default; }
.dsh-git-componentanel-notice { flex: 1; font-size: 12px; line-height: 1.45; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-git-componentanel-notice.ok { color: var(--dsw-alias-state-success-primary, #16a34a); }
.dsh-git-componentanel-notice.err { color: var(--dsw-alias-state-error-primary, #dc2626); }
.dsh-git-componentanel-notice.info { color: var(--dsw-alias-label-secondary, #5b6472); }
.dsh-git-componentanel-root.collapsed {
  top: 80px; bottom: auto; right: 20px;
  transform: none;
  width: 44px; height: 44px;
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  animation: none; cursor: pointer;
  align-items: center; justify-content: center;
  padding: 0;
}
.dsh-git-componentanel-tab-icon {
  display: inline-flex;
  color: var(--dsw-alias-label-secondary, #5b6472);
  transition: color 0.12s ease, transform 0.12s ease;
}
.dsh-git-componentanel-root.collapsed:hover .dsh-git-componentanel-tab-icon { color: var(--dsw-alias-brand-primary, #2563eb); transform: scale(1.1); }
`;

		function injectCss(css) {
			const style = document.createElement("style");
			style.textContent = css;
			document.head.appendChild(style);
			return () => style.remove();
		}

		const h = React.createElement;

		const BranchIcon = (props) => h("svg", Object.assign({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, props),
			h("line", { x1: "6", x2: "6", y1: "3", y2: "15" }),
			h("circle", { cx: "18", cy: "6", r: "3" }),
			h("circle", { cx: "6", cy: "18", r: "3" }),
			h("path", { d: "M18 9a9 9 0 0 1-9 9" }),
		);

		const call = async (path, body) => {
			const opt = body === undefined ? {} : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
			const r = await fetch(path, opt);
			return r.json();
		};

		const GitPanel = (props) => {
			const items = props.useWorkspaces((s) => s.items);
			const recentId = props.useWorkspaces((s) => s.recentWorkspaceId);
			const sessionsById = props.useSessions((s) => s.byId);
			const currentId = props.useSessions((s) => s.current);

			const [status, setStatus] = React.useState(null);
			const [error, setError] = React.useState(null);
			const [loading, setLoading] = React.useState(true);
			const [collapsed, setCollapsed] = React.useState(false);
			const [busy, setBusy] = React.useState(null);
			const [message, setMessage] = React.useState("");
			const [diff, setDiff] = React.useState(null);
			const [notice, setNotice] = React.useState(null);
			const alive = React.useRef(true);

			const currentSession = currentId ? sessionsById[currentId] : undefined;
			const recentWs = items.find((w) => w.workspaceId === recentId) || items[0];
			const cwd = (currentSession && currentSession.cwd) || (recentWs ? recentWs.path : "");

			const refresh = React.useCallback(async (silent) => {
				if (!alive.current) return;
				if (!silent) setLoading(true);
				try {
					const res = await call("/git-component/status?cwd=" + encodeURIComponent(cwd));
					if (!alive.current) return;
					if (res && res.ok) {
						setStatus(res);
						setError(null);
					} else {
						setStatus(null);
						setError((res && res.error) || "无法读取 Git 状态");
					}
				} catch (err) {
					if (!alive.current) return;
					setStatus(null);
					setError("Git 面板调用失败：" + String((err && err.message) || err));
				} finally {
					if (alive.current) setLoading(false);
				}
			}, [cwd]);

			React.useEffect(() => {
				alive.current = true;
				setDiff(null);
				setNotice(null);
				refresh(true);
				// 浏览器原生定时器：组件位于工厂顶层作用域，无法访问 apply 的 ctx
				// （client 侧亦无 timer 服务），故用 setInterval + cleanup 清理。
				const d = setInterval(() => refresh(true), 15000);
				return () => { alive.current = false; clearInterval(d); };
			}, [refresh]);

			const toggleDiff = async (ch) => {
				if (diff && diff.path === ch.path && !diff.loading) {
					setDiff(null);
					return;
				}
				setDiff({ path: ch.path, text: null, error: null, loading: true });
				try {
					const q = "cwd=" + encodeURIComponent(cwd) + "&path=" + encodeURIComponent(ch.path) + "&staged=" + (ch.state === "staged" ? "1" : "0") + "&untracked=" + (ch.state === "untracked" ? "1" : "0");
					const res = await call("/git-component/diff?" + q);
					if (!alive.current) return;
					if (res && res.ok) {
						setDiff({ path: ch.path, text: res.text, error: null, truncated: !!res.truncated, loading: false });
					} else {
						setDiff({ path: ch.path, text: null, error: (res && res.error) || "无法读取差异", loading: false });
					}
				} catch (err) {
					if (!alive.current) return;
					setDiff({ path: ch.path, text: null, error: String((err && err.message) || err), loading: false });
				}
			};

			const runCommit = async (alsoPush) => {
				if (busy !== null) return;
				setBusy(alsoPush ? "both" : "commit");
				setNotice(null);
				try {
					let msg = message.trim();
					if (!msg) {
						const gen = await call("/git-component/automessage", { cwd: cwd });
						if (!alive.current) return;
						if (gen && gen.ok && gen.message) {
							msg = gen.message;
							setMessage(msg);
							setNotice({ kind: "info", text: "已用 AI 生成提交信息" });
						} else {
							setNotice({ kind: "err", text: (gen && gen.error) || "AI 生成提交信息失败，请手动填写" });
							return;
						}
					}
					const res = await call("/git-component/commit", { cwd: cwd, message: msg });
					if (!alive.current) return;
					if (res && res.ok) {
						setMessage("");
						setNotice({ kind: "ok", text: "已提交" + (res.hash ? " " + res.hash : "") });
						if (alsoPush) {
							const pushRes = await call("/git-component/push", { cwd: cwd });
							if (!alive.current) return;
							if (pushRes && pushRes.ok) {
								setNotice({ kind: "ok", text: "已提交并推送到 " + (status && status.upstream ? status.upstream : "远端") });
							} else {
								setNotice({ kind: "err", text: "提交成功，但推送失败：" + ((pushRes && pushRes.error) || "未知错误") });
							}
						}
						refresh(true);
					} else {
						setNotice({ kind: "err", text: (res && res.error) || "提交失败" });
					}
				} catch (err) {
					if (!alive.current) return;
					setNotice({ kind: "err", text: String((err && err.message) || err) });
				} finally {
					if (alive.current) setBusy(null);
				}
			};

			const runPush = async () => {
				if (busy !== null) return;
				setBusy("push");
				setNotice(null);
				try {
					const res = await call("/git-component/push", { cwd: cwd });
					if (!alive.current) return;
					if (res && res.ok) {
						setNotice({ kind: "ok", text: "已推送到 " + (status && status.upstream ? status.upstream : "远端") });
					} else {
						setNotice({ kind: "err", text: (res && res.error) || "推送失败" });
					}
					refresh(true);
				} catch (err) {
					if (!alive.current) return;
					setNotice({ kind: "err", text: String((err && err.message) || err) });
				} finally {
					if (alive.current) setBusy(null);
				}
			};

			const changes = status ? status.changes : [];
			const staged = changes.filter((c) => c.state === "staged");
			const unstaged = changes.filter((c) => c.state === "unstaged");
			const untracked = changes.filter((c) => c.state === "untracked");
			const total = changes.length;
			const canCommit = total > 0 && busy === null;

			const renderRow = (ch, cls) => {
				const open = diff && diff.path === ch.path && !diff.loading;
				const badgeLetter = ch.x === "?" ? "?" : (ch.x !== " " ? ch.x : ch.y);
				return h("div", {
						key: ch.path,
						className: "dsh-git-componentanel-row" + (open ? " open active" : ""),
						onClick: () => toggleDiff(ch),
						title: "查看差异",
					},
					h("span", { className: "dsh-git-componentanel-badge " + cls }, badgeLetter),
					h("span", { className: "dsh-git-componentanel-path" },
						ch.oldPath ? h("span", null, h("span", { className: "dsh-git-componentanel-old" }, ch.oldPath), " → ") : null,
						ch.path,
					),
					h("span", { className: "dsh-git-componentanel-caret" }, "›"),
				);
			};

			const renderSection = (title, list, cls) => {
				if (list.length === 0) return null;
				return h("div", { className: "dsh-git-componentanel-section" },
					h("div", { className: "dsh-git-componentanel-section-title" },
						h("span", null, title),
						h("span", { className: "dsh-git-componentanel-count" }, String(list.length)),
					),
					list.map((ch) => renderRow(ch, cls)),
				);
			};

			const renderDiffLines = (d) => {
				const lines = (d.text || "").split("\n");
				const shown = lines.slice(0, 400);
				const spans = shown.map((ln, i) => {
					let cls = "dsh-git-componentanel-dl";
					if (ln.startsWith("@@")) cls += " hunk";
					else if (ln.startsWith("+")) cls += " add";
					else if (ln.startsWith("-")) cls += " del";
					else if (ln.startsWith("diff ") || ln.startsWith("index ") || ln.startsWith("---") || ln.startsWith("+++") || ln.startsWith("new file") || ln.startsWith("deleted file")) cls += " meta";
					return h("span", { key: i, className: cls }, ln);
				});
				if (lines.length > 400 || d.truncated) {
					spans.push(h("span", { key: "trunc", className: "dsh-git-componentanel-dl meta" }, "… 差异过大，已截断"));
				}
				return h("pre", { className: "dsh-git-componentanel-diff-pre" }, spans);
			};

			const renderDiff = () => {
				if (!diff) return null;
				return h("div", { className: "dsh-git-componentanel-diff" },
					h("div", { className: "dsh-git-componentanel-diff-head" },
						h("span", { className: "dsh-git-componentanel-diff-path" }, diff.path),
						h("button", { className: "dsh-git-componentanel-icobtn", onClick: () => setDiff(null), title: "关闭差异", "aria-label": "关闭差异" }, "✕"),
					),
					diff.loading
						? h("div", { className: "dsh-git-componentanel-empty" }, "读取差异中…")
						: diff.error
							? h("div", { className: "dsh-git-componentanel-errorbox" }, diff.error)
							: renderDiffLines(diff),
				);
			};

			let body;
			if (loading && !status && !error) {
				body = h("div", { className: "dsh-git-componentanel-body" }, h("div", { className: "dsh-git-componentanel-empty" }, h("div", { className: "dsh-git-componentanel-big" }, "…"), "正在读取 Git 状态"));
			} else if (error) {
				body = h("div", { className: "dsh-git-componentanel-body" },
					h("div", { className: "dsh-git-componentanel-errorbox" }, error),
					h("div", { className: "dsh-git-componentanel-empty" }, "提示：请在侧边栏选择一个 Git 仓库所在的工作区"),
				);
			} else if (status && total === 0) {
				body = h("div", { className: "dsh-git-componentanel-body" }, h("div", { className: "dsh-git-componentanel-empty" }, h("div", { className: "dsh-git-componentanel-big" }, "✓"), "工作区干净，没有未提交的更改"));
			} else {
				body = h("div", { className: "dsh-git-componentanel-body" },
					renderSection("已暂存", staged, "staged"),
					renderSection("未暂存", unstaged, "unstaged"),
					renderSection("未跟踪", untracked, "untracked"),
					renderDiff(),
				);
			}

			if (collapsed) {
				return h("div", {
						className: "dsh-git-componentanel-root collapsed",
						onClick: () => setCollapsed(false),
						onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") setCollapsed(false); },
						role: "button",
						tabIndex: 0,
						"aria-label": "展开 Git 面板",
						title: "展开 Git 面板",
					},
					h(BranchIcon, { className: "dsh-git-componentanel-tab-icon", width: 20, height: 20 }),
				);
			}

			const branchMeta = status
				? (status.ahead > 0 || status.behind > 0 ? " ↑" + status.ahead + " ↓" + status.behind : "") + (status.gone ? " (gone)" : "")
				: "";
			const branchName = status ? (status.detached ? "HEAD (游离)" : status.branch) : "—";

			return h("div", { className: "dsh-git-componentanel-root" },
				h("div", { className: "dsh-git-componentanel-header" },
					h("span", { className: "dsh-git-componentanel-logo", title: "Git 面板" },
						h(BranchIcon, { width: 14, height: 14 }),
					),
					status
						? h("span", { className: "dsh-git-componentanel-branch", title: status.upstream ? status.upstream : (status.detached ? "HEAD 游离状态" : "无上游分支") },
								h("span", { className: "dsh-git-componentanel-dot" + (total > 0 ? "" : " clean") }),
								h("span", null, branchName + branchMeta),
							)
						: h("span", { className: "dsh-git-componentanel-branch" }, branchName),
					h("div", { style: { flex: 1 } }),
					h("button", {
						className: "dsh-git-componentanel-icobtn" + (loading ? " loading" : ""),
						onClick: () => refresh(false),
						disabled: busy !== null,
						title: "刷新",
						"aria-label": "刷新",
					}, "↻"),
					h("button", {
						className: "dsh-git-componentanel-icobtn",
						onClick: () => setCollapsed(true),
						title: "折叠",
						"aria-label": "折叠",
					}, "»"),
				),
				body,
				(status !== null)
					? h("div", { className: "dsh-git-componentanel-commit" },
							h("textarea", {
								className: "dsh-git-componentanel-textarea",
								placeholder: "提交信息（留空将用 AI 自动生成）",
								value: message,
								rows: 2,
								disabled: busy !== null,
								onChange: (e) => setMessage(e.target.value),
								onKeyDown: (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") runCommit(false); },
							}),
							h("div", { className: "dsh-git-componentanel-btns" },
								h("button", { className: "dsh-git-componentanel-btn primary", onClick: () => runCommit(false), disabled: !canCommit },
									busy === "commit" ? "提交中…" : "提交"),
								h("button", { className: "dsh-git-componentanel-btn outline", onClick: () => runCommit(true), disabled: !canCommit },
									busy === "both" ? "提交并推送中…" : "提交并推送"),
							),
							h("div", { className: "dsh-git-componentanel-footer" },
								h("button", { className: "dsh-git-componentanel-push", onClick: runPush, disabled: busy !== null },
									busy === "push" ? "推送中…" : "推送"),
								notice
									? h("span", { className: "dsh-git-componentanel-notice " + notice.kind, title: notice.text }, notice.text)
									: h("span", { className: "dsh-git-componentanel-notice info" }, "Ctrl/⌘ + Enter 提交 · 留空 AI 生成"),
							),
						)
					: null,
			);
		};

		function apply(ctx) {
			const slots = ctx.get("slots");
			if (slots === undefined) return;
			console.log("[git-component] client apply: registering shell.overlay panel");
			ctx.effect(() => injectCss(CSS));
			slots.inject("shell.overlay", () => slots.register(
				{ name: "shell.overlay", id: "git-component", order: 90 },
				(props) => h(GitPanel, props),
			));
		}

		exports.name = "dsh-git-component";
		exports.apply = apply;
		return module.exports;
	}
});
