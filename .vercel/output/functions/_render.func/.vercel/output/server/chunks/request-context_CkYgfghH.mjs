import { AsyncLocalStorage } from "node:async_hooks";
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/internal/escape.ts
/**
* HTML attribute escape for double-quoted attributes. `&` is escaped first
* so the subsequent replacements don't double-encode existing entities.
* Adequate for the shapes we emit server-side — `data-tina-form` payloads
* and `data-tina-island` marker paths — neither of which is parsed as
* HTML downstream.
*/
function escapeAttr(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/internal/forms-store.ts
var STORE_KEY$1 = Symbol.for("@tinacms/astro/forms-store");
var slot$1 = globalThis;
var formsStore = slot$1[STORE_KEY$1] ??= new AsyncLocalStorage();
function recordForm(form) {
	const list = formsStore.getStore();
	if (!list) return;
	const existing = list.find((entry) => entry.id === form.id);
	if (existing) {
		if (form.priority === "primary") existing.priority = "primary";
		return;
	}
	list.push(form);
}
function sortByPriority(forms) {
	return [...forms].sort((a, b) => (a.priority === "primary" ? 0 : 1) - (b.priority === "primary" ? 0 : 1));
}
function renderFormPayloadDiv(form, primary) {
	return `<div data-tina-form="${escapeAttr(JSON.stringify(form))}"${primary ? " data-tina-primary" : ""} hidden></div>`;
}
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/internal/request-context.ts
/**
* Request-scoped storage so `tina()` can read the current request without
* the caller threading `Astro.request` through every loader. The
* middleware injected by the `tina()` integration runs every request
* through `requestStore.run(...)`.
*
* Falls through to `undefined` outside a request scope (static builds,
* integration not installed) — `tina()` treats that as "no overlay,
* no edit mode," so static contexts still produce correct output.
*
* Stashed on `globalThis` via `Symbol.for(...)` so all bundle copies of
* this module share one ALS instance — esbuild inlines it into every
* entry that imports it, and per-entry copies wouldn't share state.
*/
var STORE_KEY = Symbol.for("@tinacms/astro/request-context");
var slot = globalThis;
var requestStore = slot[STORE_KEY] ??= new AsyncLocalStorage();
//#endregion
export { sortByPriority as a, renderFormPayloadDiv as i, formsStore as n, escapeAttr as o, recordForm as r, requestStore as t };
