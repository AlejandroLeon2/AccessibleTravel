import { t as sequence } from "./chunks/sequence_Uaq5IZkJ.mjs";
import { a as sortByPriority, i as renderFormPayloadDiv, n as formsStore, t as requestStore } from "./chunks/request-context_CkYgfghH.mjs";
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/internal/admin-origin.ts
function adminOrigins() {
	const raw = Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": "https://accessibletravelperu.com",
		"SSR": true
	}, {})?.PUBLIC_TINA_ADMIN_ORIGIN;
	if (!raw) return null;
	const origins = raw.split(",").map((s) => s.trim()).filter(Boolean);
	return origins.length > 0 ? origins : null;
}
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/is-edit-mode.ts
/**
* Server-side check: is this request being rendered inside the TinaCMS
* admin iframe?
*
* Resolves true when any of the following hold:
*   1. `?tina-edit=1` — explicit signal added by the admin's router for
*      deep-link previews.
*   2. `Sec-Fetch-Dest: iframe` AND a same-origin Referer under
*      `/admin/` — covers the first request after the admin sets
*      `iframe.src` to a preview URL.
*   3. `Sec-Fetch-Dest: iframe` AND a `__tina_edit=1` cookie — covers
*      in-iframe link clicks, where the Referer is the previous preview
*      page rather than `/admin/`. The middleware sets the cookie on
*      every edit-mode response so the session sticks for the iframe's
*      lifetime.
*
* Direct browser visits set `Sec-Fetch-Dest: document` for top-level
* navigations, so a stale cookie left behind in someone's browser can
* never trip edit mode outside an iframe — production HTML is byte-
* identical to a Tina-free Astro app for end users.
*/
var EDIT_COOKIE = "__tina_edit";
/**
* Set-Cookie header value the middleware writes on every edit-mode
* response. Refreshing on each response keeps long editing sessions
* sticky and short Max-Age limits the blast radius if a cookie lingers.
* The `Sec-Fetch-Dest: iframe` gate in `isEditMode` blocks the cookie
* from triggering edit mode on top-level visits.
*/
var EDIT_COOKIE_HEADER = `${EDIT_COOKIE}=1; Path=/; SameSite=Strict; Max-Age=3600`;
function isEditMode(request) {
	const url = new URL(request.url);
	if (url.searchParams.get("tina-edit") === "1") return true;
	if (request.headers.get("Sec-Fetch-Dest") !== "iframe") return false;
	const referer = request.headers.get("Referer");
	if (referer) try {
		const refererUrl = new URL(referer);
		if (refererUrl.origin === url.origin && refererUrl.pathname.startsWith("/admin/")) return true;
	} catch {}
	return readCookie(request, EDIT_COOKIE) === "1";
}
function readCookie(request, name) {
	const header = request.headers.get("Cookie");
	if (!header) return null;
	for (const pair of header.split(";")) {
		const eq = pair.indexOf("=");
		if (eq === -1) continue;
		if (pair.slice(0, eq).trim() === name) return pair.slice(eq + 1).trim();
	}
	return null;
}
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/middleware.ts
var HEAD_CLOSE = "</head>";
var onRequest$1 = (context, next) => {
	if (context.isPrerendered) {
		context.locals.tinaEdit = false;
		return next();
	}
	const editing = isEditMode(context.request);
	context.locals.tinaEdit = editing;
	const forms = [];
	return requestStore.run(context.request, () => formsStore.run(forms, async () => {
		const response = await next();
		return editing ? injectEditMode(response, forms) : response;
	}));
};
async function injectEditMode(response, forms) {
	const init = editModeInit(response);
	if (!(response.headers.get("content-type") ?? "").includes("text/html")) return new Response(response.body, init);
	const html = await response.text();
	const headEnd = html.indexOf(HEAD_CLOSE);
	if (headEnd === -1) return new Response(html, init);
	const injection = renderInjection(forms);
	return new Response(html.slice(0, headEnd) + injection + html.slice(headEnd), init);
}
function editModeInit(response) {
	const headers = new Headers(response.headers);
	headers.delete("content-length");
	headers.append("Set-Cookie", EDIT_COOKIE_HEADER);
	return {
		status: response.status,
		statusText: response.statusText,
		headers
	};
}
function renderInjection(forms) {
	return sortByPriority(forms).map((form, i) => renderFormPayloadDiv(form, i === 0)).join("") + bridgeScript();
}
function bridgeScript() {
	const origins = adminOrigins();
	return `<script type="module">import{init,refreshForms}from"/admin/bridge.js";init(${origins ? `{adminOrigin:${JSON.stringify(origins)}}` : ""});document.addEventListener("astro:page-load",refreshForms);<\/script>`;
}
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
