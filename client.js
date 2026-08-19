window.__ModuleLoader__.load({
	id: "dsh-git-component",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		var React = require("react");

		const CSS = `
.dsh-git-component-panel-root, .dsh-git-component-panel-root * { box-sizing: border-box; }
.dsh-git-component-panel-root {
  --dsh-git-component-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --dsh-git-component-font-mono: ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
  --dsh-border: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 18%, transparent);
  --dsh-border-weak: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 8%, transparent);
  --dsh-border-faint: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 6%, transparent);
  --dsh-border-very-faint: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 10%, transparent);
  --dsh-border-strong: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 22%, transparent);
  --dsh-border-input: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 12%, transparent);
  --dsh-border-focus: color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 70%, transparent);
  --dsh-border-brand-hover: color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 45%, transparent);
  --dsh-surface-soft: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 5%, transparent);
  --dsh-surface-faint: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 4%, transparent);
  --dsh-surface-code: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 3%, transparent);
  --dsh-surface-count: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 6%, transparent);
  --dsh-surface-badge: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 7%, transparent);
  --dsh-surface-hover-soft: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 6%, transparent);
  --dsh-surface-hover: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 8%, transparent);
  --dsh-surface-active: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 9%, transparent);
  --dsh-surface-btn: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 10%, transparent);
  --dsh-scrollbar-thumb: color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 16%, transparent);
  --dsh-ring-focus: color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 20%, transparent);
  --dsh-bg-input: color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 60%, transparent);
  --dsh-bg-input-focus: color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 70%, transparent);
  --dsh-shadow-panel:
    0 1px 3px -1px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 6%, transparent),
    0 6px 16px -8px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 10%, transparent),
    0 14px 32px -16px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 8%, transparent);
  --dsh-shadow-collapsed:
    0 1px 3px -1px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 6%, transparent),
    0 6px 16px -8px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 12%, transparent);
  --dsh-shadow-collapsed-hover:
    0 2px 4px -1px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 8%, transparent),
    0 10px 24px -10px color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-label-primary, #16181d) 35%, #000000) 16%, transparent);
  position: fixed; top: 90px; right: 14px; bottom: auto;
  width: min(376px, calc(100vw - 28px));
  max-height: max(240px, calc(100vh - 108px));
  z-index: 2147483647; pointer-events: auto;
  display: flex; flex-direction: column;
  border-radius: 18px;
  /* 跟随主题：浅色模式纯白（rgb(255,255,255)），深色模式近黑（rgb(21,21,23)） */
  background: var(--dsw-alias-bg-base, #ffffff);
  color: var(--dsw-alias-label-primary, #16181d);
  border: 1px solid var(--dsh-border);
  box-shadow: var(--dsh-shadow-panel);
  overflow: hidden;
  font: 14px/1.5 var(--dsh-git-component-font-sans);
  animation: dsh-git-component-panel-in 0.22s cubic-bezier(0.21, 1.02, 0.73, 1);
}
.dsh-git-component-panel-root.has-diff {
  width: min(720px, calc(100vw - 28px));
}
@keyframes dsh-git-component-panel-in {
  from { opacity: 0; transform: translateX(16px) scale(0.98); }
  to { opacity: 1; transform: none; }
}
.dsh-git-component-panel-header {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 14px 10px;
  border-bottom: 1px solid var(--dsh-border-weak);
  background: transparent;
}
.dsh-git-component-panel-logo {
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--dsw-alias-brand-primary, #2563eb);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 20%, transparent);
  border-radius: 8px; padding: 3px 6px;
}
.dsh-git-component-panel-branch {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--dsh-git-component-font-mono);
  font-size: 12px; color: var(--dsw-alias-label-secondary, #5b6472);
  background: var(--dsh-surface-soft);
  border: 1px solid var(--dsh-border-very-faint);
  border-radius: 999px; padding: 2px 10px;
  max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dsh-git-component-panel-branch .dsh-git-component-panel-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--dsw-alias-state-success-primary, #15803d); flex: none; box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-success-primary, #15803d) 18%, transparent); }
.dsh-git-component-panel-branch .dsh-git-component-panel-dot.clean { background: var(--dsw-alias-label-secondary, #5b6472); box-shadow: none; }
.dsh-git-component-panel-icobtn {
  border: none; background: transparent; color: var(--dsw-alias-label-secondary, #5b6472);
  width: 26px; height: 26px; border-radius: 8px; cursor: pointer; font-size: 14px; line-height: 1;
  display: inline-flex; align-items: center; justify-content: center; flex: none;
  transition: background 0.12s ease, color 0.12s ease;
}
.dsh-git-component-panel-icobtn:hover { background: var(--dsh-surface-hover); color: var(--dsw-alias-label-primary, #16181d); }
.dsh-git-component-panel-icobtn.loading { animation: dsh-git-component-panel-spin 0.9s linear infinite; }
@keyframes dsh-git-component-panel-spin { to { transform: rotate(360deg); } }
.dsh-git-component-panel-icobtn:disabled { opacity: 0.45; cursor: default; }
.dsh-git-component-panel-body {
  flex: 1; min-height: 0; overflow-y: auto; padding: 8px 10px 10px;
  display: flex; flex-direction: column; gap: 10px;
}
.dsh-git-component-panel-body.has-diff {
  flex-direction: row;
  align-items: stretch;
  overflow: hidden;
}
.dsh-git-component-panel-files {
  flex: 0 0 190px; min-width: 0;
  display: flex; flex-direction: column; gap: 10px;
  overflow-y: auto; padding-right: 2px;
}
.dsh-git-component-panel-body::-webkit-scrollbar,
.dsh-git-component-panel-files::-webkit-scrollbar { width: 8px; }
.dsh-git-component-panel-diff-pre::-webkit-scrollbar { width: 8px; height: 8px; }
.dsh-git-component-panel-body::-webkit-scrollbar-thumb,
.dsh-git-component-panel-files::-webkit-scrollbar-thumb {
  background: var(--dsh-scrollbar-thumb);
  border-radius: 8px; border: 2px solid transparent; background-clip: content-box;
}
.dsh-git-component-panel-diff-pre::-webkit-scrollbar-thumb {
  background: var(--dsh-scrollbar-thumb);
  border-radius: 8px;
}
.dsh-git-component-panel-section-title {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--dsw-alias-label-secondary, #5b6472);
  margin: 2px 2px 4px;
}
.dsh-git-component-panel-section-title .dsh-git-component-panel-count {
  font-family: var(--dsh-git-component-font-mono); font-weight: 700; font-size: 10px;
  color: var(--dsw-alias-label-secondary, #5b6472);
  background: var(--dsh-surface-count);
  border-radius: 999px; padding: 0 6px;
}
.dsh-git-component-panel-row {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 6px; border-radius: 9px; cursor: pointer;
  transition: background 0.1s ease;
  min-width: 0; width: 100%;
  border: none; background: transparent; appearance: none;
  font: inherit; color: inherit; text-align: left;
  content-visibility: auto; contain-intrinsic-size: 34px;
}
.dsh-git-component-panel-row:hover { background: var(--dsh-surface-hover-soft); }
.dsh-git-component-panel-row.active { background: var(--dsh-surface-active); }
.dsh-git-component-panel-badge {
  flex: none; width: 20px; height: 20px; border-radius: 6px;
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--dsh-git-component-font-mono); font-size: 11px; font-weight: 700;
  background: var(--dsh-surface-badge);
  color: var(--dsw-alias-label-secondary, #5b6472);
}
.dsh-git-component-panel-badge.staged {
  color: #166534;
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #16a34a) 13%, transparent);
}
.dsh-git-component-panel-badge.unstaged {
  color: #92400e;
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #d97706) 13%, transparent);
}
.dsh-git-component-panel-path {
  font-family: var(--dsh-git-component-font-mono);
  font-size: 12px; color: var(--dsw-alias-label-primary, #16181d);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0;
}
.dsh-git-component-panel-path .dsh-git-component-panel-old { color: var(--dsw-alias-label-secondary, #5b6472); text-decoration: line-through; }
.dsh-git-component-panel-caret { color: var(--dsw-alias-label-secondary, #5b6472); font-size: 10px; flex: none; transition: transform 0.15s ease; }
.dsh-git-component-panel-row.open .dsh-git-component-panel-caret { transform: rotate(90deg); }
.dsh-git-component-panel-diff {
  border: 1px solid var(--dsh-border-very-faint);
  border-radius: 12px; overflow: hidden;
  /* flex 压缩陷阱：body 是 flex column，overflow 非 visible 的 flex 子项
     min-height:auto 解析为 0，空间不足时会被压扁并裁掉内容；
     禁止收缩，高度由内容决定，滚动交给 body。 */
  flex: none;
  background: transparent;
}
.dsh-git-component-panel-body.has-diff .dsh-git-component-panel-diff {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dsh-git-component-panel-diff-head {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 6px 10px; font-size: 11px; color: var(--dsw-alias-label-secondary, #5b6472);
  font-family: var(--dsh-git-component-font-mono);
  border-bottom: 1px solid var(--dsh-border-weak);
  background: transparent;
}
.dsh-git-component-panel-diff-path { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-git-component-panel-diff-pre {
  margin: 0; padding: 8px 0; max-height: 190px; overflow: auto;
  font-family: var(--dsh-git-component-font-mono);
  font-size: 11.5px; line-height: 1.55; tab-size: 4;
}
.dsh-git-component-panel-body.has-diff .dsh-git-component-panel-diff-pre {
  flex: 1 1 auto;
  max-height: none;
  min-height: 0;
}
.dsh-git-component-panel-dl { display: block; padding: 0 10px; white-space: pre; color: var(--dsw-alias-label-primary, #16181d); }
.dsh-git-component-panel-dl.add { background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #16a34a) 11%, transparent); color: #166534; }
.dsh-git-component-panel-dl.del { background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 11%, transparent); color: #b91c1c; }
.dsh-git-component-panel-dl.hunk { color: var(--dsw-alias-brand-primary, #2563eb); background: var(--dsh-surface-faint); }
.dsh-git-component-panel-dl.meta { color: var(--dsw-alias-label-secondary, #5b6472); font-style: italic; }
.dsh-git-component-panel-empty {
  text-align: center; color: var(--dsw-alias-label-secondary, #5b6472);
  padding: 26px 12px; font-size: 12.5px;
}
.dsh-git-component-panel-empty .dsh-git-component-panel-big { font-size: 22px; margin-bottom: 6px; }
.dsh-git-component-panel-errorbox {
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 32%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 9%, transparent);
  color: var(--dsw-alias-state-error-primary, #dc2626);
  border-radius: 12px; padding: 10px 12px; font-size: 12px; line-height: 1.5;
  word-break: break-word;
}
.dsh-git-component-panel-commit {
  border-top: 1px solid var(--dsh-border-weak);
  padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 8px;
  background: transparent;
}
.dsh-git-component-panel-commit-hint {
  font-size: 11px; line-height: 1.4; color: var(--dsw-alias-label-secondary, #5b6472);
  padding: 0 2px;
}
.dsh-git-component-panel-textarea {
  width: 100%; resize: none; min-height: 56px; max-height: 120px;
  border: 1px solid var(--dsh-border-input);
  border-radius: 12px;
  background: var(--dsh-bg-input);
  color: var(--dsw-alias-label-primary, #16181d);
  padding: 8px 11px; font: 12.5px/1.5 inherit; outline: none;
  transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
}
.dsh-git-component-panel-textarea:focus {
  border-color: var(--dsh-border-focus);
  box-shadow: 0 0 0 3px var(--dsh-ring-focus);
  background: var(--dsh-bg-input-focus);
}
.dsh-git-component-panel-textarea::placeholder { color: var(--dsw-alias-label-secondary, #5b6472); }
.dsh-git-component-panel-btns { display: flex; gap: 8px; }
.dsh-git-component-panel-btn {
  flex: 1; min-height: 34px; border-radius: 11px; border: 1px solid transparent; cursor: pointer;
  padding: 6px 10px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.02em;
  display: inline-flex; align-items: center; justify-content: center;
  transition: filter 0.12s ease, background 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.dsh-git-component-panel-btn:disabled { opacity: 0.45; cursor: default; }
.dsh-git-component-panel-btn.primary {
  background: linear-gradient(180deg, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 4px 14px -6px rgba(29, 78, 216, 0.55);
}
.dsh-git-component-panel-btn.primary:not(:disabled):hover { filter: brightness(1.08); }
.dsh-git-component-panel-btn.primary:not(:disabled):active { filter: brightness(0.94); }
.dsh-git-component-panel-btn.outline {
  background: var(--dsh-surface-btn);
  border-color: var(--dsh-border-strong);
  color: var(--dsw-alias-label-primary, #16181d);
}
.dsh-git-component-panel-btn.outline:not(:disabled):hover {
  border-color: #2563eb;
  color: #2563eb;
  background: color-mix(in srgb, #2563eb 12%, transparent);
}
.dsh-git-component-panel-btn.outline:not(:disabled):active { filter: brightness(0.94); }
.dsh-git-component-panel-footer { display: flex; align-items: center; gap: 8px; min-height: 22px; }
.dsh-git-component-panel-push {
  flex: none; border: none; background: transparent; cursor: pointer;
  color: var(--dsw-alias-label-secondary, #5b6472); font-size: 12px; font-weight: 600;
  padding: 2px 4px; border-radius: 6px;
}
.dsh-git-component-panel-push:hover { color: var(--dsw-alias-brand-primary, #2563eb); }
.dsh-git-component-panel-push:disabled { opacity: 0.5; cursor: default; }
.dsh-git-component-panel-notice { flex: 1; font-size: 12px; line-height: 1.45; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-git-component-panel-notice.ok { color: var(--dsw-alias-state-success-primary, #15803d); }
.dsh-git-component-panel-notice.err { color: var(--dsw-alias-state-error-primary, #dc2626); }
.dsh-git-component-panel-notice.info { color: var(--dsw-alias-label-secondary, #5b6472); }
.dsh-git-component-panel-root.collapsed {
  transform: none;
  width: 42px; height: 42px;
  overflow: visible;
  background: var(--dsw-alias-bg-base, #ffffff);
  border: 1px solid var(--dsh-border);
  border-radius: 13px;
  box-shadow: var(--dsh-shadow-collapsed);
  animation: none; cursor: pointer;
  align-items: center; justify-content: center;
  padding: 0;
  transition: transform 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.dsh-git-component-panel-root.collapsed:hover {
  transform: translateY(-1px);
  border-color: var(--dsh-border-brand-hover);
  box-shadow: var(--dsh-shadow-collapsed-hover);
}
.dsh-git-component-panel-tab-icon {
  display: inline-flex;
  color: var(--dsw-alias-label-secondary, #5b6472);
  transition: color 0.12s ease, transform 0.12s ease;
}
.dsh-git-component-panel-root.collapsed:hover .dsh-git-component-panel-tab-icon { color: var(--dsw-alias-brand-primary, #2563eb); transform: scale(1.1); }
.dsh-git-component-panel-tab-badge {
  position: absolute; top: -4px; right: -4px;
  min-width: 16px; height: 16px; padding: 0 4px;
  border-radius: 999px;
  background: var(--dsw-alias-state-error-primary, #dc2626);
  color: #fff;
  font-family: var(--dsh-git-component-font-mono);
  font-size: 10px; font-weight: 700; line-height: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 2px var(--dsw-alias-bg-base, #ffffff);
  pointer-events: none;
}
.dsh-git-component-panel-diff-head { gap: 2px; }
.dsh-git-component-panel-diff-head .dsh-git-component-panel-icobtn { width: 22px; height: 22px; font-size: 12px; flex: none; }
.dsh-git-component-panel-hunk-head {
  display: flex; align-items: center; gap: 6px;
  padding: 3px 10px; cursor: pointer; user-select: none;
  font-family: var(--dsh-git-component-font-mono); font-size: 11.5px;
  color: var(--dsw-alias-brand-primary, #2563eb);
  background: var(--dsh-surface-faint);
  border-top: 1px solid var(--dsh-border-weak);
  border-bottom: 1px solid var(--dsh-border-weak);
  border-left: none; border-right: none; width: 100%; text-align: left; appearance: none;
}
.dsh-git-component-panel-hunk-head:hover { background: var(--dsh-surface-hover); }
.dsh-git-component-panel-hunk-caret { font-size: 9px; flex: none; }
.dsh-git-component-panel-hunk-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-git-component-panel-diff-split { display: flex; flex-direction: column; }
.dsh-git-component-panel-split-cols { display: flex; border-top: 1px solid var(--dsh-border-weak); }
.dsh-git-component-panel-split-col { flex: 1; min-width: 0; max-height: 260px; overflow: auto; }
.dsh-git-component-panel-body.has-diff .dsh-git-component-panel-diff-split {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}
.dsh-git-component-panel-body.has-diff .dsh-git-component-panel-split-cols,
.dsh-git-component-panel-body.has-diff .dsh-git-component-panel-split-col {
  max-height: none;
}
.dsh-git-component-panel-body.has-diff .dsh-git-component-panel-split-col {
  overflow: visible;
}
.dsh-git-component-panel-split-col + .dsh-git-component-panel-split-col { border-left: 1px solid var(--dsh-border-very-faint); }
.dsh-git-component-panel-split-line {
  display: flex; font-family: var(--dsh-git-component-font-mono);
  font-size: 11.5px; line-height: 1.55; white-space: pre;
}
.dsh-git-component-panel-lineno {
  flex: none; width: 34px; text-align: right; padding: 0 8px 0 4px;
  color: var(--dsw-alias-label-secondary, #5b6472);
  background: var(--dsh-surface-code);
  border-right: 1px solid var(--dsh-border-faint);
  user-select: none;
}
.dsh-git-component-panel-linebody { flex: 1; min-width: 0; padding: 0 8px; overflow: hidden; text-overflow: ellipsis; }
.dsh-git-component-panel-split-line.add { background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #16a34a) 11%, transparent); }
.dsh-git-component-panel-split-line.del { background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 11%, transparent); }
.dsh-git-component-panel-split-line.empty { background: transparent; }
.dsh-git-component-panel-split-line.mod { background: color-mix(in srgb, var(--dsw-alias-brand-primary, #2563eb) 9%, transparent); }
.dsh-git-component-panel-split-line.meta { color: var(--dsw-alias-label-secondary, #5b6472); font-style: italic; }
.dsh-git-component-panel-tok.comment { color: var(--dsw-alias-label-secondary, #5b6472); font-style: italic; }
.dsh-git-component-panel-tok.string { color: #0b7a3b; }
.dsh-git-component-panel-tok.keyword { color: #1a56db; font-weight: 600; }
.dsh-git-component-panel-tok.number { color: #b45309; }
body[data-ds-dark-theme] .dsh-git-component-panel-tok.string { color: #4ade80; }
body[data-ds-dark-theme] .dsh-git-component-panel-tok.keyword { color: #7aa2f7; }
body[data-ds-dark-theme] .dsh-git-component-panel-tok.number { color: #fbbf24; }
.dsh-git-component-panel-icobtn:focus-visible,
.dsh-git-component-panel-btn:focus-visible,
.dsh-git-component-panel-push:focus-visible,
.dsh-git-component-panel-root.collapsed:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary, #2563eb);
  outline-offset: 2px;
}
.dsh-git-component-panel-row:focus-visible,
.dsh-git-component-panel-hunk-head:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary, #2563eb);
  outline-offset: -2px;
}
@media (pointer: coarse) {
  .dsh-git-component-panel-icobtn { width: 44px; height: 44px; }
  .dsh-git-component-panel-diff-head .dsh-git-component-panel-icobtn { width: 44px; height: 44px; }
  .dsh-git-component-panel-btn { min-height: 44px; }
  .dsh-git-component-panel-push { min-height: 44px; padding: 8px 12px; }
  .dsh-git-component-panel-row { min-height: 44px; }
  .dsh-git-component-panel-hunk-head { min-height: 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-git-component-panel-root,
  .dsh-git-component-panel-icobtn,
  .dsh-git-component-panel-row,
  .dsh-git-component-panel-caret,
  .dsh-git-component-panel-textarea,
  .dsh-git-component-panel-btn,
  .dsh-git-component-panel-push,
  .dsh-git-component-panel-tab-icon,
  .dsh-git-component-panel-root.collapsed {
    animation: none !important;
    transition: none !important;
  }
}
.dsh-git-component-panel-root,
.dsh-git-component-panel-root button,
.dsh-git-component-panel-row,
.dsh-git-component-panel-hunk-head {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
.dsh-git-component-panel-body,
.dsh-git-component-panel-files,
.dsh-git-component-panel-diff-pre,
.dsh-git-component-panel-split-col {
  overscroll-behavior: contain;
}

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

		const Icon = (props) => {
			const { children, ...rest } = props;
			return h("svg", Object.assign({
				viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2,
				strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, width: 14, height: 14
			}, rest), children);
		};
		const RefreshIcon = (props) => h(Icon, Object.assign({}, props),
			h("path", { d: "M21 12a9 9 0 1 1-2.64-6.36" }),
			h("polyline", { points: "23 4 23 10 17 10" }),
		);
		const CollapseIcon = (props) => h(Icon, Object.assign({}, props),
			h("polyline", { points: "13 17 18 12 13 7" }),
			h("polyline", { points: "6 17 11 12 6 7" }),
		);
		const CloseIcon = (props) => h(Icon, Object.assign({}, props),
			h("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
			h("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
		);
		const SplitIcon = (props) => h(Icon, Object.assign({}, props),
			h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
			h("line", { x1: "12", y1: "3", x2: "12", y2: "21" }),
		);
		const ListIcon = (props) => h(Icon, Object.assign({}, props),
			h("line", { x1: "8", y1: "6", x2: "21", y2: "6" }),
			h("line", { x1: "8", y1: "12", x2: "21", y2: "12" }),
			h("line", { x1: "8", y1: "18", x2: "21", y2: "18" }),
			h("line", { x1: "3", y1: "6", x2: "3.01", y2: "6" }),
			h("line", { x1: "3", y1: "12", x2: "3.01", y2: "12" }),
			h("line", { x1: "3", y1: "18", x2: "3.01", y2: "18" }),
		);
		const StageIcon = (props) => {
			const { unstage, ...rest } = props;
			return h(Icon, Object.assign({}, rest),
				unstage ? h("path", { d: "M3 7v6h6" }) : h("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
				unstage ? h("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" }) : h("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
			);
		};
		const CaretRightIcon = (props) => h(Icon, Object.assign({}, props), h("polyline", { points: "9 18 15 12 9 6" }));
		const ChevronDownIcon = (props) => h(Icon, Object.assign({}, props), h("polyline", { points: "6 9 12 15 18 9" }));

		const call = async (path, body) => {
			const opt = body === undefined ? {} : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
			const r = await fetch(path, opt);
			return r.json();
		};

		// ---- diff helpers: begin ----
		const LANG_BY_EXT = {
			js: "js", mjs: "js", cjs: "js", jsx: "jsx", ts: "ts", tsx: "tsx",
			json: "json", html: "html", htm: "html", xml: "xml", svg: "xml",
			css: "css", scss: "scss", md: "md", markdown: "md",
			py: "py", rs: "rs", go: "go", java: "java", c: "c", h: "c",
			cpp: "cpp", hpp: "cpp", cc: "cpp", sh: "sh", bash: "sh", zsh: "sh",
			yml: "yml", yaml: "yml", toml: "toml", sql: "sql", vue: "jsx", svelte: "jsx"
		};
		const langOf = (path) => {
			const m = /\.([A-Za-z0-9]+)$/.exec(String(path || ""));
			return m ? LANG_BY_EXT[m[1].toLowerCase()] || null : null;
		};
		const JS_WORDS = "break case catch class const continue debugger default delete do else export extends false finally for from function get if import in instanceof let new null of return set static super switch this throw true try typeof undefined var void while with yield async await";
		const TS_WORDS = JS_WORDS + " interface type enum namespace declare readonly abstract implements private protected public any unknown never string number boolean";
		const LANG_SPECS = {
			js: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'", "`"], words: JS_WORDS },
			jsx: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'", "`"], words: JS_WORDS },
			ts: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'", "`"], words: TS_WORDS },
			tsx: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'", "`"], words: TS_WORDS },
			json: { line: [], block: [], strings: ['"'], words: "true false null" },
			html: { line: [], block: ["<!--", "-->"], strings: ['"', "'"], words: "" },
			xml: { line: [], block: ["<!--", "-->"], strings: ['"', "'"], words: "" },
			css: { line: [], block: ["/*", "*/"], strings: ['"', "'"], words: "important inherit initial unset" },
			scss: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'"], words: "important inherit initial unset" },
			md: { line: [], block: ["<!--", "-->"], strings: [], words: "" },
			py: { line: ["#"], block: [], strings: ["'''", '"""', "'", '"'], words: "and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield" },
			rs: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'"], words: "as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while" },
			go: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'", "`"], words: "break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var" },
			java: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'"], words: "abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while true false null" },
			c: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'"], words: "auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while" },
			cpp: { line: ["//"], block: ["/*", "*/"], strings: ['"', "'"], words: "auto break case char class const continue default delete do double else enum extern false float for friend goto if inline int long namespace new nullptr operator private protected public register return short signed sizeof static struct switch template this throw true try typedef typename union unsigned using virtual void volatile while" },
			sh: { line: ["#"], block: [], strings: ['"', "'"], words: "if then else elif fi for while do done case esac function in return local export readonly unset set shift source echo exit" },
			yml: { line: ["#"], block: [], strings: ['"', "'"], words: "true false null yes no on off" },
			toml: { line: ["#"], block: [], strings: ['"', "'", '"""'], words: "true false" },
			sql: { line: ["--"], block: ["/*", "*/"], strings: ["'", '"'], words: "select from where insert into values update delete create table index view alter drop add column primary key foreign references join inner left right full outer on as and or not null distinct group by order having limit offset union all case when then else end exists in like between is" }
		};
		/** Tokenize one diff line into [{text, cls}] for syntax highlighting. */
		function tokenizeLine(text, lang) {
			const spec = LANG_SPECS[lang];
			if (spec === void 0) return [{ text: text, cls: "plain" }];
			const out = [];
			let pos = 0;
			while (pos < text.length) {
				const rest = text.slice(pos);
				const lineComment = spec.line.length > 0 ? rest.indexOf(spec.line[0]) : -1;
				const blockStart = spec.block.length > 0 ? rest.indexOf(spec.block[0]) : -1;
				let strAt = -1;
				let strChar = "";
				for (const ch of spec.strings) {
					const at = rest.indexOf(ch);
					if (at !== -1 && (strAt === -1 || at < strAt)) { strAt = at; strChar = ch; }
				}
				const cands = [];
				if (lineComment !== -1) cands.push({ at: lineComment, kind: "line" });
				if (blockStart !== -1) cands.push({ at: blockStart, kind: "block" });
				if (strAt !== -1) cands.push({ at: strAt, kind: "string" });
				if (cands.length === 0) {
					pushTokens(out, rest, spec.words);
					break;
				}
				cands.sort((a, b) => a.at - b.at);
				const next = cands[0];
				if (next.at > 0) pushTokens(out, rest.slice(0, next.at), spec.words);
				if (next.kind === "line") {
					out.push({ text: rest.slice(next.at), cls: "comment" });
					break;
				}
				if (next.kind === "block") {
					const end = rest.indexOf(spec.block[1], next.at + spec.block[0].length);
					if (end === -1) { out.push({ text: rest.slice(next.at), cls: "comment" }); break; }
					out.push({ text: rest.slice(next.at, end + spec.block[1].length), cls: "comment" });
					pos += next.at + (end - next.at) + spec.block[1].length;
					continue;
				}
				let j = next.at + strChar.length;
				while (j < rest.length) {
					if (rest[j] === "\\") { j += 2; continue; }
					if (rest.slice(j, j + strChar.length) === strChar) break;
					j++;
				}
				const end = j < rest.length ? j + strChar.length : rest.length;
				out.push({ text: rest.slice(next.at, end), cls: "string" });
				pos += next.at + (end - next.at);
			}
			if (out.length === 0) out.push({ text: text, cls: "plain" });
			return out;
		}
		/** Push keyword/number/plain tokens for a non-comment/non-string slice. */
		function pushTokens(out, text, words) {
			const wordRe = words.length > 0 ? "\\b(?:" + words.split(" ").join("|") + ")\\b" : "";
			const re = new RegExp(wordRe + (wordRe ? "|" : "") + "\\b\\d[\\d_]*(?:\\.[\\d_]+)?(?:[eE][+-]?\\d+)?\\b", "g");
			let last = 0;
			let m;
			while ((m = re.exec(text)) !== null) {
				if (m.index > last) out.push({ text: text.slice(last, m.index), cls: "plain" });
				// \b 边界已由正则保证；按首字符区分数字与关键字
				out.push({ text: m[0], cls: /^\d/.test(m[0]) ? "number" : "keyword" });
				last = m.index + m[0].length;
			}
			if (last < text.length) out.push({ text: text.slice(last), cls: "plain" });
		}
		/** Parse unified diff text into headers + hunks (line-capped). */
		function parseUnifiedDiff(text, maxLines) {
			const headers = [];
			const hunks = [];
			const lines = String(text || "").split("\n");
			let cur = null;
			let total = 0;
			for (const ln of lines) {
				const m = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/.exec(ln);
				if (m) {
					if (total >= maxLines) { cur = null; continue; }
					cur = { oldStart: Number(m[1]), oldCount: Number(m[2] || 1), newStart: Number(m[3]), newCount: Number(m[4] || 1), lines: [] };
					hunks.push(cur);
					continue;
				}
				if (cur === null) {
					if (ln.startsWith("diff ") || ln.startsWith("index ") || ln.startsWith("---") || ln.startsWith("+++") || ln.startsWith("new file") || ln.startsWith("deleted file") || ln.startsWith("similarity") || ln.startsWith("rename")) headers.push(ln);
					continue;
				}
				if (total >= maxLines) { cur = null; continue; }
				total++;
				if (ln.startsWith("+")) cur.lines.push({ kind: "add", text: ln.slice(1) });
				else if (ln.startsWith("-")) cur.lines.push({ kind: "del", text: ln.slice(1) });
				else if (ln.startsWith("\\")) cur.lines.push({ kind: "meta", text: ln });
				else cur.lines.push({ kind: "ctx", text: ln });
			}
			return { headers: headers, hunks: hunks, truncated: total >= maxLines };
		}
		/** Align one hunk's lines into left/right pairs for side-by-side view. */
		function sideBySidePairs(hunk) {
			const pairs = [];
			let dels = [];
			let adds = [];
			const flush = () => {
				const n = Math.max(dels.length, adds.length);
				for (let i = 0; i < n; i++) {
					const left = dels[i] === undefined ? null : dels[i];
					const right = adds[i] === undefined ? null : adds[i];
					pairs.push({
						left: left,
						right: right,
						kind: left !== null && right !== null ? "mod" : (left !== null ? "del" : "add"),
					});
				}
				dels = [];
				adds = [];
			};
			for (const ln of hunk.lines) {
				if (ln.kind === "del") dels.push(ln.text);
				else if (ln.kind === "add") adds.push(ln.text);
				else {
					flush();
					pairs.push({ left: ln.text, right: ln.text, kind: ln.kind });
				}
			}
			flush();
			return pairs;
		}
		// ---- diff helpers: end ----

		const GitPanel = (props) => {
			const items = props.useWorkspaces((s) => s.items);
			const recentId = props.useWorkspaces((s) => s.recentWorkspaceId);
			const sessionsById = props.useSessions((s) => s.byId);
			const currentId = props.useSessions((s) => s.current);

			const [status, setStatus] = React.useState(null);
			const [error, setError] = React.useState(null);
			const [loading, setLoading] = React.useState(true);
			const [collapsed, setCollapsed] = React.useState(true);
			const [busy, setBusy] = React.useState(null);
			const [message, setMessage] = React.useState("");
			const [diff, setDiff] = React.useState(null);
			const [splitView, setSplitView] = React.useState(false);
			const [folded, setFolded] = React.useState({});
			const [notice, setNotice] = React.useState(null);
			const alive = React.useRef(true);
			const diffReqRef = React.useRef(0);
			const statusReqRef = React.useRef(0);

			const currentSession = currentId ? sessionsById[currentId] : undefined;
			const recentWs = items.find((w) => w.workspaceId === recentId) || items[0];
			const cwd = (currentSession && currentSession.cwd) || (recentWs ? recentWs.path : "");

			const refresh = React.useCallback(async (silent) => {
				if (!alive.current) return;
				const reqId = ++statusReqRef.current;
				if (!silent) setLoading(true);
				try {
					const res = await call("/git-component/status?cwd=" + encodeURIComponent(cwd));
					if (!alive.current || statusReqRef.current !== reqId) return;
					if (res && res.ok) {
						setStatus(res);
						setError(null);
						if (res.changes && res.changes.length === 0) {
							diffReqRef.current++;
							setDiff(null);
							setFolded({});
						}
					} else {
						setStatus(null);
						setError((res && res.error) || "无法读取 Git 状态");
					}
				} catch (err) {
					if (!alive.current || statusReqRef.current !== reqId) return;
					setStatus(null);
					setError("Git 面板调用失败：" + String((err && err.message) || err));
				} finally {
					if (alive.current && statusReqRef.current === reqId) setLoading(false);
				}
			}, [cwd]);

			React.useEffect(() => {
				alive.current = true;
				diffReqRef.current++;
				setDiff(null);
				setNotice(null);
				refresh(true);
				// 浏览器原生定时器：组件位于工厂顶层作用域，无法访问 apply 的 ctx
				// （client 侧亦无 timer 服务），故用 setInterval + cleanup 清理。
				const d = setInterval(() => refresh(true), 15000);
				return () => { alive.current = false; clearInterval(d); };
			}, [refresh]);

			React.useEffect(() => {
				const onKey = (e) => {
					if (e.key !== "Escape") return;
					if (diff) {
						diffReqRef.current++;
						setDiff(null);
						return;
					}
					const tag = document.activeElement && document.activeElement.tagName;
					if (tag !== "TEXTAREA" && tag !== "INPUT") setCollapsed(true);
				};
				window.addEventListener("keydown", onKey);
				return () => window.removeEventListener("keydown", onKey);
			}, [diff]);

			const toggleDiff = async (ch) => {
				if (diff && diff.path === ch.path) {
					if (!diff.loading) {
						diffReqRef.current++;
						setDiff(null);
					}
					return;
				}
				const reqId = ++diffReqRef.current;
				setFolded({});
				setDiff({ path: ch.path, text: null, error: null, loading: true, st: ch.state, parsed: null });
				try {
					const q = "cwd=" + encodeURIComponent(cwd) + "&path=" + encodeURIComponent(ch.path) + "&staged=" + (ch.state === "staged" ? "1" : "0") + "&untracked=" + (ch.state === "untracked" ? "1" : "0");
					const res = await call("/git-component/diff?" + q);
					if (!alive.current || diffReqRef.current !== reqId) return;
					if (res && res.ok) {
						setDiff({ path: ch.path, text: res.text, error: null, truncated: !!res.truncated, loading: false, st: ch.state, parsed: parseUnifiedDiff(res.text, 400) });
					} else {
						setDiff({ path: ch.path, text: null, error: (res && res.error) || "无法读取差异", loading: false, st: ch.state, parsed: null });
					}
				} catch (err) {
					if (!alive.current || diffReqRef.current !== reqId) return;
					setDiff({ path: ch.path, text: null, error: String((err && err.message) || err), loading: false, st: ch.state, parsed: null });
				}
			};

			const runStage = async (d) => {
				if (busy !== null || d.loading) return;
				const action = d.st === "staged" ? "unstage" : "stage";
				setBusy("stage");
				setNotice(null);
				try {
					const res = await call("/git-component/stage", { cwd: cwd, path: d.path, action: action });
					if (!alive.current) return;
					if (res && res.ok) {
						setNotice({ kind: "ok", text: (action === "unstage" ? "已取消暂存 " : "已暂存 ") + d.path });
						diffReqRef.current++;
						setDiff(null);
						setFolded({});
						refresh(true);
					} else {
						setNotice({ kind: "err", text: (res && res.error) || (action === "unstage" ? "取消暂存失败" : "暂存失败") });
					}
				} catch (err) {
					if (!alive.current) return;
					setNotice({ kind: "err", text: String((err && err.message) || err) });
				} finally {
					if (alive.current) setBusy(null);
				}
			};

			const toggleHunk = (hi) => setFolded((f) => Object.assign({}, f, { [hi]: !f[hi] }));

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
						diffReqRef.current++;
						setDiff(null);
						setFolded({});
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
				const expanded = diff && diff.path === ch.path;
				const badgeLetter = ch.x === "?" ? "?" : (ch.x !== " " ? ch.x : ch.y);
				return h("button", {
						key: ch.path,
						type: "button",
						className: "dsh-git-component-panel-row" + (open ? " open active" : ""),
						onClick: () => toggleDiff(ch),
						onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleDiff(ch); } },
						title: "查看差异",
						"aria-label": "查看差异：" + ch.path,
						"aria-expanded": expanded ? "true" : "false",
					},
					h("span", { className: "dsh-git-component-panel-badge " + cls }, badgeLetter),
					h("span", { className: "dsh-git-component-panel-path" },
						ch.oldPath ? h("span", null, h("span", { className: "dsh-git-component-panel-old" }, ch.oldPath), " → ") : null,
						ch.path,
					),
					h(CaretRightIcon, { className: "dsh-git-component-panel-caret", width: 10, height: 10 }),
				);
			};

			const renderSection = (title, list, cls) => {
				if (list.length === 0) return null;
				return h("div", { className: "dsh-git-component-panel-section" },
					h("div", { className: "dsh-git-component-panel-section-title" },
						h("span", null, title),
						h("span", { className: "dsh-git-component-panel-count" }, String(list.length)),
					),
					list.map((ch) => renderRow(ch, cls)),
				);
			};

			const renderLineTokens = (text, lang) => {
				const tokens = tokenizeLine(text, lang);
				return tokens.map((t, i) =>
					t.cls === "plain" ? t.text : h("span", { key: i, className: "dsh-git-component-panel-tok " + t.cls }, t.text),
				);
			};

			const renderHunkHead = (hk, hi, key) =>
				h("button", { key: key, type: "button", className: "dsh-git-component-panel-hunk-head", onClick: () => toggleHunk(hi), title: "折叠/展开该 hunk", "aria-expanded": folded[hi] ? "false" : "true", "aria-label": "折叠/展开 hunk @@ -" + hk.oldStart + "," + hk.oldCount + " +" + hk.newStart + "," + hk.newCount + " @@" },
					folded[hi]
						? h(CaretRightIcon, { className: "dsh-git-component-panel-hunk-caret", width: 10, height: 10 })
						: h(ChevronDownIcon, { className: "dsh-git-component-panel-hunk-caret", width: 10, height: 10 }),
					h("span", { className: "dsh-git-component-panel-hunk-label" }, "@@ -" + hk.oldStart + "," + hk.oldCount + " +" + hk.newStart + "," + hk.newCount + " @@"),
				);

			const renderUnified = (d) => {
				const parsed = d.parsed;
				const lang = langOf(d.path);
				const nodes = [];
				for (const hd of parsed.headers) nodes.push(h("span", { key: "hd" + nodes.length, className: "dsh-git-component-panel-dl meta" }, hd));
				parsed.hunks.forEach((hk, hi) => {
					nodes.push(renderHunkHead(hk, hi, "hh" + hi));
					if (folded[hi]) return;
					hk.lines.forEach((ln, i) => {
						let cls = "dsh-git-component-panel-dl";
						if (ln.kind === "add") cls += " add";
						else if (ln.kind === "del") cls += " del";
						else if (ln.kind === "meta") cls += " meta";
						const prefix = ln.kind === "add" ? "+" : ln.kind === "del" ? "-" : "";
						nodes.push(h("span", { key: "hl" + hi + "_" + i, className: cls }, prefix, renderLineTokens(ln.text, lang)));
					});
				});
				if (parsed.truncated || d.truncated) {
					nodes.push(h("span", { key: "trunc", className: "dsh-git-component-panel-dl meta" }, "… 差异过大，已截断"));
				}
				return h("div", { className: "dsh-git-component-panel-diff-pre" }, nodes);
			};

			const renderSplit = (d) => {
				const parsed = d.parsed;
				const lang = langOf(d.path);
				if (parsed.hunks.length === 0) return renderUnified(d);
				return h("div", { className: "dsh-git-component-panel-diff-split" },
					parsed.hunks.map((hk, hi) => {
						let oldNo = hk.oldStart;
						let newNo = hk.newStart;
						const pairs = sideBySidePairs(hk);
						return h("div", { key: "h" + hi, className: "dsh-git-component-panel-hunk" },
							renderHunkHead(hk, hi),
							folded[hi]
								? null
								: h("div", { className: "dsh-git-component-panel-split-cols" },
									h("div", { className: "dsh-git-component-panel-split-col" },
										pairs.map((p, i) => h("div", { key: i, className: "dsh-git-component-panel-split-line" + (p.left === null ? " empty" : " " + p.kind) },
											h("span", { className: "dsh-git-component-panel-lineno" }, p.left === null ? "" : String(oldNo++)),
											h("span", { className: "dsh-git-component-panel-linebody" }, p.left === null ? "" : renderLineTokens(p.left, lang)),
										)),
									),
									h("div", { className: "dsh-git-component-panel-split-col" },
										pairs.map((p, i) => h("div", { key: i, className: "dsh-git-component-panel-split-line" + (p.right === null ? " empty" : " " + p.kind) },
											h("span", { className: "dsh-git-component-panel-lineno" }, p.right === null ? "" : String(newNo++)),
											h("span", { className: "dsh-git-component-panel-linebody" }, p.right === null ? "" : renderLineTokens(p.right, lang)),
										)),
									),
								),
						);
					}),
				);
			};

			const renderDiff = () => {
				if (!diff) return null;
				const st = diff.st;
				const stageLabel = st === "staged" ? "取消暂存" : "暂存";
				return h("div", { className: "dsh-git-component-panel-diff" },
					h("div", { className: "dsh-git-component-panel-diff-head" },
						h("span", { className: "dsh-git-component-panel-diff-path", title: diff.path }, diff.path),
						h("button", {
							type: "button",
							className: "dsh-git-component-panel-icobtn",
							onClick: () => setSplitView((v) => !v),
							disabled: diff.loading || diff.error !== null,
							title: splitView ? "单栏视图" : "分栏对比",
							"aria-label": splitView ? "单栏视图" : "分栏对比",
						}, splitView ? h(ListIcon, { width: 12, height: 12 }) : h(SplitIcon, { width: 12, height: 12 })),
						h("button", {
							type: "button",
							className: "dsh-git-component-panel-icobtn",
							onClick: () => runStage(diff),
							disabled: busy !== null || diff.loading || diff.error !== null,
							title: stageLabel,
							"aria-label": stageLabel,
						}, st === "staged" ? h(StageIcon, { unstage: true, width: 12, height: 12 }) : h(StageIcon, { width: 12, height: 12 })),
						h("button", { type: "button", className: "dsh-git-component-panel-icobtn", onClick: () => { diffReqRef.current++; setDiff(null); }, title: "关闭差异", "aria-label": "关闭差异" }, h(CloseIcon, { width: 12, height: 12 })),
					),
					diff.loading
						? h("div", { className: "dsh-git-component-panel-empty" }, "读取差异中…")
						: diff.error
							? h("div", { className: "dsh-git-component-panel-errorbox" }, diff.error)
							: splitView ? renderSplit(diff) : renderUnified(diff),
				);
			};

			const hasDiff = diff !== null && status !== null && total > 0 && !error;
			let body;
			if (loading && !status && !error) {
				body = h("div", { className: "dsh-git-component-panel-body" }, h("div", { className: "dsh-git-component-panel-empty" }, h("div", { className: "dsh-git-component-panel-big" }, "…"), "正在读取 Git 状态"));
			} else if (error) {
				body = h("div", { className: "dsh-git-component-panel-body" },
					h("div", { className: "dsh-git-component-panel-errorbox" }, error),
					h("button", { type: "button", className: "dsh-git-component-panel-btn outline", onClick: () => refresh(false), disabled: busy !== null, style: { flex: "0 0 auto", alignSelf: "center", minWidth: "96px" } }, "重试"),
					h("div", { className: "dsh-git-component-panel-empty" }, "提示：请在侧边栏选择一个 Git 仓库所在的工作区"),
				);
			} else if (status && total === 0) {
				body = h("div", { className: "dsh-git-component-panel-body" }, h("div", { className: "dsh-git-component-panel-empty" }, h("div", { className: "dsh-git-component-panel-big" }, "✓"), "工作区干净，没有未提交的更改"));
			} else {
				const sections = [
					renderSection("已暂存", staged, "staged"),
					renderSection("未暂存", unstaged, "unstaged"),
					renderSection("未跟踪", untracked, "untracked"),
				];
				body = h("div", { className: "dsh-git-component-panel-body" + (hasDiff ? " has-diff" : "") },
					hasDiff ? h("div", { className: "dsh-git-component-panel-files" }, sections) : sections,
					renderDiff(),
				);
			}

			if (collapsed) {
				return h("div", {
						className: "dsh-git-component-panel-root collapsed",
						onClick: () => setCollapsed(false),
						onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") setCollapsed(false); },
						role: "button",
						tabIndex: 0,
						"aria-label": "展开 Git 面板",
						title: "展开 Git 面板",
				},
				h(BranchIcon, { className: "dsh-git-component-panel-tab-icon", width: 20, height: 20 }),
				total > 0 ? h("span", { className: "dsh-git-component-panel-tab-badge" }, total > 99 ? "99+" : String(total)) : null,
			);
			}

			const branchMeta = status
				? (status.ahead > 0 || status.behind > 0 ? " ↑" + status.ahead + " ↓" + status.behind : "") + (status.gone ? " (gone)" : "")
				: "";
			const branchName = status ? (status.detached ? "HEAD (游离)" : status.branch) : "—";

			return h("div", { className: "dsh-git-component-panel-root" + (hasDiff ? " has-diff" : "") },
				h("div", { className: "dsh-git-component-panel-header" },
					h("span", { className: "dsh-git-component-panel-logo", title: "Git 面板" },
						h(BranchIcon, { width: 14, height: 14 }),
					),
					status
						? h("span", { className: "dsh-git-component-panel-branch", title: status.upstream ? status.upstream : (status.detached ? "HEAD 游离状态" : "无上游分支") },
								h("span", { className: "dsh-git-component-panel-dot" + (total > 0 ? "" : " clean"), role: "img", "aria-label": total > 0 ? "有未提交更改" : "工作区干净" }),
								h("span", null, branchName + branchMeta),
							)
						: h("span", { className: "dsh-git-component-panel-branch" }, branchName),
					h("div", { style: { flex: 1 } }),
					h("button", {
						type: "button",
						className: "dsh-git-component-panel-icobtn" + (loading ? " loading" : ""),
						onClick: () => refresh(false),
						disabled: busy !== null,
						title: "刷新",
						"aria-label": "刷新",
					}, h(RefreshIcon, { width: 14, height: 14 })),
					h("button", {
						type: "button",
						className: "dsh-git-component-panel-icobtn",
						onClick: () => setCollapsed(true),
						title: "折叠",
						"aria-label": "折叠",
					}, h(CollapseIcon, { width: 14, height: 14 })),
				),
				body,
				(status !== null && total > 0)
					? h("div", { className: "dsh-git-component-panel-commit" },
							h("textarea", {
								className: "dsh-git-component-panel-textarea",
								placeholder: "提交信息（留空将用 AI 自动生成）",
								"aria-label": "提交信息",
								name: "commit-message",
								value: message,
								rows: 2,
								disabled: busy !== null,
								onChange: (e) => setMessage(e.target.value),
								onKeyDown: (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") runCommit(false); },
							}),
							h("div", { className: "dsh-git-component-panel-commit-hint" }, "提交会自动暂存所有更改（git add -A）"),
							h("div", { className: "dsh-git-component-panel-btns" },
								h("button", { type: "button", className: "dsh-git-component-panel-btn primary", onClick: () => runCommit(false), disabled: !canCommit },
									busy === "commit" ? "提交中…" : "提交"),
								h("button", { type: "button", className: "dsh-git-component-panel-btn outline", onClick: () => runCommit(true), disabled: !canCommit },
									busy === "both" ? "提交并推送中…" : "提交并推送"),
							),
							h("div", { className: "dsh-git-component-panel-footer" },
								h("button", { type: "button", className: "dsh-git-component-panel-push", onClick: runPush, disabled: busy !== null },
									busy === "push" ? "推送中…" : "推送"),
								notice
									? h("span", { className: "dsh-git-component-panel-notice " + notice.kind, title: notice.text, role: "status", "aria-live": "polite" }, notice.text)
									: h("span", { className: "dsh-git-component-panel-notice info" }, "Ctrl/⌘ + Enter 提交 · 留空 AI 生成"),
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
