import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { B as unescapeHTML, Bt as safeParseAsync, Cn as AstroError, Ct as isRemotePath, Dt as removeLeadingForwardSlash, E as Fragment, Et as removeBase, F as defineScriptVars, Ft as date, G as createStylesheetElementSet, I as createRenderInstruction, K as RedirectSinglePageBuiltModule, Lt as object, M as renderTemplate, N as maybeRenderHead, Nt as generateCspDigest, O as SlotString, P as addAttribute, Pt as array, Rt as string, S as spreadAttributes, T as renderComponent, U as createAstro, W as createModuleScriptElement, f as setEnvironment, jt as createKey, k as renderSlot, l as setLogger, m as findRouteToRewrite, u as createConsoleLogger, y as getDefaultRoutes, yn as UnknownContentCollectionError } from "./sequence_Uaq5IZkJ.mjs";
import { C as getPattern, D as unflatten, E as parse, P as NOOP_MIDDLEWARE_FN, _ as handlePages, a as handleMiddleware, c as peekMiddleware, f as getRouteTable, n as FetchState, t as getParts } from "./parts_BZVfn-nX.mjs";
import { a as createComponent, r as VALID_INPUT_FORMATS } from "./compiler_CJwVshyr.mjs";
import { a as sortByPriority, i as renderFormPayloadDiv, n as formsStore, o as escapeAttr, r as recordForm, t as requestStore } from "./request-context_CkYgfghH.mjs";
import { createClient } from "tinacms/dist/client";
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
var PRIME_HEADER = "X-Tina-Prime";
var MAX_ENVELOPE_BYTES = 1e6;
async function readOverlay(request, queryId) {
	const envelope = await readEnvelope(request);
	if (!envelope) return void 0;
	const value = envelope[queryId];
	return value === void 0 ? void 0 : value;
}
var envelopeCache = /* @__PURE__ */ new WeakMap();
function readEnvelope(request) {
	let cached = envelopeCache.get(request);
	if (!cached) {
		cached = parseEnvelope(request);
		envelopeCache.set(request, cached);
	}
	return cached;
}
async function parseEnvelope(request) {
	if (!(request.headers.get("content-type") ?? "").includes("application/x-tina-preview+json")) return void 0;
	if (Number(request.headers.get("content-length") ?? "0") > MAX_ENVELOPE_BYTES) return void 0;
	try {
		const text = await request.text();
		if (!text) return void 0;
		if (text.length > MAX_ENVELOPE_BYTES) return void 0;
		return JSON.parse(text);
	} catch {
		return;
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/runtime/client/idle.prebuilt.js
var idle_prebuilt_default = `(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value=="object"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};"requestIdleCallback"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event("astro:idle"));})();`;
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/runtime/client/load.prebuilt.js
var load_prebuilt_default = `(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();`;
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/runtime/client/media.prebuilt.js
var media_prebuilt_default = `(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener("change",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event("astro:media"));})();`;
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/runtime/client/only.prebuilt.js
var only_prebuilt_default = `(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();`;
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/runtime/client/visible.prebuilt.js
var visible_prebuilt_default = `(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event("astro:visible"));})();`;
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/client-directive/default.js
function getDefaultClientDirectives() {
	return /* @__PURE__ */ new Map([
		["idle", idle_prebuilt_default],
		["load", load_prebuilt_default],
		["media", media_prebuilt_default],
		["only", only_prebuilt_default],
		["visible", visible_prebuilt_default]
	]);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/config/schemas/defaults.js
var ASTRO_CONFIG_DEFAULTS = {
	root: ".",
	srcDir: "./src",
	publicDir: "./public",
	outDir: "./dist",
	cacheDir: "./node_modules/.astro",
	base: "/",
	trailingSlash: "ignore",
	build: {
		format: "directory",
		client: "./client/",
		server: "./server/",
		assets: "_astro",
		serverEntry: "entry.mjs",
		redirects: true,
		inlineStylesheets: "auto",
		concurrency: 1
	},
	image: {
		endpoint: {
			entrypoint: void 0,
			route: "/_image"
		},
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {}
		},
		dangerouslyProcessSVG: false,
		responsiveStyles: false
	},
	devToolbar: { enabled: true },
	compressHTML: "jsx",
	server: {
		host: false,
		port: 4321,
		open: false,
		allowedHosts: []
	},
	integrations: [],
	markdown: {
		syntaxHighlight: {
			type: "shiki",
			excludeLangs: ["math"]
		},
		shikiConfig: {
			langs: [],
			theme: "github-dark",
			themes: {},
			wrap: false,
			transformers: [],
			langAlias: {}
		},
		gfm: true,
		smartypants: true,
		remarkPlugins: [],
		rehypePlugins: [],
		remarkRehype: {}
	},
	vite: {},
	legacy: { collectionsBackwardsCompat: false },
	redirects: {},
	security: {
		checkOrigin: true,
		allowedDomains: [],
		csp: false,
		actionBodySizeLimit: 1048576,
		serverIslandBodySizeLimit: 1048576
	},
	env: {
		schema: {},
		validateSecrets: false
	},
	prerenderConflictBehavior: "warn",
	fetchFile: "fetch",
	experimental: {
		clientPrerender: false,
		contentIntellisense: false,
		chromeDevtoolsWorkspace: false,
		incrementalBuild: false,
		collectionStorage: "single-file"
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/core/routing/segment.js
function validateSegment(segment, file = "") {
	if (!file) file = segment;
	if (segment.includes("][")) throw new Error(`Invalid route ${file} \u2014 parameters must be separated`);
	if (countOccurrences("[", segment) !== countOccurrences("]", segment)) throw new Error(`Invalid route ${file} \u2014 brackets are unbalanced`);
	if ((/.+\[\.\.\.[^\]]+\]/.test(segment) || /\[\.\.\.[^\]]+\].+/.test(segment)) && file.endsWith(".astro")) throw new Error(`Invalid route ${file} \u2014 rest parameter must be a standalone segment`);
}
function countOccurrences(needle, haystack) {
	let count = 0;
	for (const hay of haystack) if (hay === needle) count += 1;
	return count;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/container/environment.js
async function getModuleForRoute(manifest, route) {
	for (const defaultRoute of getDefaultRoutes(manifest)) if (route.component === defaultRoute.component) return { page: () => Promise.resolve(defaultRoute.instance) };
	if (route.type === "redirect") return RedirectSinglePageBuiltModule;
	else {
		if (manifest.pageMap) {
			const importComponentInstance = manifest.pageMap.get(route.component);
			if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
			return await importComponentInstance();
		} else if (manifest.pageModule) return manifest.pageModule;
		throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
	}
}
function createContainerEnvironment({ interner, resolve, renderers, streaming }) {
	async function getComponentByRoute(_manifest, routeData) {
		const page = interner.get(routeData);
		if (page) return page.page();
		throw new Error("Couldn't find component for route " + routeData.pathname);
	}
	return {
		name: "container",
		runtimeMode: "development",
		defaultStreaming: () => streaming,
		async resolve(_manifest, specifier) {
			return resolve(specifier);
		},
		headElements(manifest, routeData) {
			const routeInfo = manifest.routes.find((route) => route.routeData === routeData);
			const links = /* @__PURE__ */ new Set();
			const scripts = /* @__PURE__ */ new Set();
			const styles = createStylesheetElementSet(routeInfo?.styles ?? []);
			for (const script of routeInfo?.scripts ?? []) if ("stage" in script) {
				if (script.stage === "head-inline") scripts.add({
					props: {},
					children: script.children
				});
			} else scripts.add(createModuleScriptElement(script));
			return {
				links,
				styles,
				scripts
			};
		},
		componentMetadata() {},
		getComponentByRoute,
		getModuleForRoute,
		async tryRewrite(manifest, payload, request) {
			const { newUrl, pathname, routeData } = findRouteToRewrite({
				payload,
				request,
				routes: manifest.routes.map((r) => r.routeData),
				trailingSlash: manifest.trailingSlash,
				buildFormat: manifest.buildFormat,
				base: manifest.base,
				outDir: manifest.outDir
			});
			return {
				componentInstance: await getComponentByRoute(manifest, routeData),
				routeData,
				newUrl,
				pathname
			};
		},
		getRenderers() {
			return renderers;
		},
		errorStrategy: "default",
		injectCspMetaTagsOnErrorPages: false,
		logRequest() {}
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/container/index.js
function createManifest(manifest, renderers, middleware, site) {
	function middlewareInstance() {
		return { onRequest: middleware ?? NOOP_MIDDLEWARE_FN };
	}
	let root;
	try {
		root = new URL(import.meta.url);
	} catch {
		root = new URL("file:///container/");
	}
	return {
		rootDir: root,
		srcDir: manifest?.srcDir ?? new URL(ASTRO_CONFIG_DEFAULTS.srcDir, root),
		buildClientDir: manifest?.buildClientDir ?? new URL(ASTRO_CONFIG_DEFAULTS.build.client, root),
		buildServerDir: manifest?.buildServerDir ?? new URL(ASTRO_CONFIG_DEFAULTS.build.server, root),
		publicDir: manifest?.publicDir ?? new URL(ASTRO_CONFIG_DEFAULTS.publicDir, root),
		outDir: manifest?.outDir ?? new URL(ASTRO_CONFIG_DEFAULTS.outDir, root),
		cacheDir: manifest?.cacheDir ?? new URL(ASTRO_CONFIG_DEFAULTS.cacheDir, root),
		trailingSlash: manifest?.trailingSlash ?? ASTRO_CONFIG_DEFAULTS.trailingSlash,
		buildFormat: manifest?.buildFormat ?? ASTRO_CONFIG_DEFAULTS.build.format,
		compressHTML: manifest?.compressHTML ?? ASTRO_CONFIG_DEFAULTS.compressHTML,
		assetsDir: manifest?.assetsDir ?? ASTRO_CONFIG_DEFAULTS.build.assets,
		serverLike: manifest?.serverLike ?? true,
		middlewareMode: manifest?.middlewareMode ?? "classic",
		assets: manifest?.assets ?? /* @__PURE__ */ new Set(),
		assetsPrefix: manifest?.assetsPrefix ?? void 0,
		entryModules: manifest?.entryModules ?? {},
		routes: manifest?.routes ?? [],
		adapterName: "",
		clientDirectives: manifest?.clientDirectives ?? getDefaultClientDirectives(),
		renderers: renderers ?? manifest?.renderers ?? [],
		base: manifest?.base ?? ASTRO_CONFIG_DEFAULTS.base,
		userAssetsBase: manifest?.userAssetsBase ?? "",
		componentMetadata: manifest?.componentMetadata ?? /* @__PURE__ */ new Map(),
		inlinedScripts: manifest?.inlinedScripts ?? /* @__PURE__ */ new Map(),
		i18n: manifest?.i18n,
		site: site ?? manifest?.site,
		checkOrigin: false,
		allowedDomains: manifest?.allowedDomains ?? [],
		actionBodySizeLimit: 1048576,
		serverIslandBodySizeLimit: 1048576,
		middleware: manifest?.middleware ?? middlewareInstance,
		key: createKey(),
		csp: manifest?.csp,
		image: manifest?.image ?? {},
		shouldInjectCspMetaTags: false,
		devToolbar: {
			enabled: false,
			latestAstroVersion: void 0,
			debugInfoOutput: "",
			placement: void 0
		},
		logLevel: "silent"
	};
}
var experimental_AstroContainer = class experimental_AstroContainer {
	/**
	* The container's fabricated manifest — the source of truth all the
	* functional-core accessors key off. The container never touches the
	* ambient manifest, so multiple containers in one process stay isolated.
	*/
	#manifest;
	/**
	* The route → module interner, shared between the environment record
	* (lookups) and the `insertRoute` writes below.
	*/
	#interner;
	/**
	* Internally used to check if the container was created with a manifest.
	* @private
	*/
	#withManifest = false;
	constructor({ streaming = false, manifest, renderers, resolve, site }) {
		const ssrManifest = createManifest(manifest, renderers, void 0, site);
		const containerRenderers = renderers ?? manifest?.renderers ?? [];
		const containerResolve = async (specifier) => {
			if (this.#withManifest) return this.#containerResolve(specifier, ssrManifest);
			else if (resolve) return resolve(specifier);
			return specifier;
		};
		const interner = /* @__PURE__ */ new WeakMap();
		setLogger(ssrManifest, createConsoleLogger({ level: "error" }));
		setEnvironment(ssrManifest, createContainerEnvironment({
			interner,
			resolve: containerResolve,
			renderers: containerRenderers,
			streaming
		}));
		getRouteTable(ssrManifest);
		this.#manifest = ssrManifest;
		this.#interner = interner;
	}
	async #containerResolve(specifier, manifest) {
		const found = manifest.entryModules[specifier];
		if (found) return new URL(found, manifest.buildClientDir).toString();
		return found;
	}
	/**
	* Creates a new instance of a container.
	*
	* @param {AstroContainerOptions=} containerOptions
	*/
	static async create(containerOptions = {}) {
		const { streaming = false, manifest, renderers = [], resolve, astroConfig } = containerOptions;
		return new experimental_AstroContainer({
			streaming,
			manifest,
			renderers,
			resolve,
			site: astroConfig?.site ?? manifest?.site
		});
	}
	/**
	* Use this function to manually add a **server** renderer to the container.
	*
	* This function is preferred when you require to use the container with a renderer in environments such as on-demand pages.
	*
	* ## Example
	*
	* ```js
	* import reactRenderer from "@astrojs/react/server.js";
	* import vueRenderer from "@astrojs/vue/server.js";
	* import customRenderer from "../renderer/customRenderer.js";
	* import { experimental_AstroContainer as AstroContainer } from "astro/container"
	*
	* const container = await AstroContainer.create();
	* container.addServerRenderer(reactRenderer);
	* container.addServerRenderer(vueRenderer);
	* container.addServerRenderer("customRenderer", customRenderer);
	* ```
	*
	* @param options {object}
	* @param options.name The name of the renderer. The name **isn't** arbitrary, and it should match the name of the package.
	* @param options.renderer The server renderer exported by integration.
	*/
	addServerRenderer(options) {
		const { renderer } = options;
		if (!renderer.check || !renderer.renderToStaticMarkup) throw new Error("The renderer you passed isn't valid. A renderer is usually an object that exposes the `check` and `renderToStaticMarkup` functions.\nUsually, the renderer is exported by a /server.js entrypoint e.g. `import renderer from '@astrojs/react/server.js'`");
		if (isNamedRenderer(renderer)) this.#manifest.renderers.push({
			name: renderer.name,
			ssr: renderer
		});
		else if ("name" in options) this.#manifest.renderers.push({
			name: options.name,
			ssr: renderer
		});
		else throw new Error("The renderer name must be provided when adding a server renderer that is not a named renderer.");
	}
	/**
	* Use this function to manually add a **client** renderer to the container.
	*
	* When rendering components that use the `client:*` directives, you need to use this function.
	*
	* ## Example
	*
	* ```js
	* import reactRenderer from "@astrojs/react/server.js";
	* import { experimental_AstroContainer as AstroContainer } from "astro/container"
	*
	* const container = await AstroContainer.create();
	* container.addServerRenderer(reactRenderer);
	* container.addClientRenderer({
	* 	name: "@astrojs/react",
	* 	entrypoint: "@astrojs/react/client.js"
	* });
	* ```
	*
	* @param options {object}
	* @param options.name The name of the renderer. The name **isn't** arbitrary, and it should match the name of the package.
	* @param options.entrypoint The entrypoint of the client renderer.
	*/
	addClientRenderer(options) {
		const { entrypoint, name } = options;
		const rendererIndex = this.#manifest.renderers.findIndex((r) => r.name === name);
		if (rendererIndex === -1) throw new Error("You tried to add the " + name + " client renderer, but its server renderer wasn't added. You must add the server renderer first. Use the `addServerRenderer` function.");
		const renderer = this.#manifest.renderers[rendererIndex];
		renderer.clientEntrypoint = entrypoint;
		this.#manifest.renderers[rendererIndex] = renderer;
	}
	static async createFromManifest(manifest) {
		const container = new experimental_AstroContainer({ manifest });
		container.#withManifest = true;
		return container;
	}
	/**
	* Associates a runtime-inserted route with its component module in the
	* interner shared with the container environment record. Snapshots the
	* already-resolved middleware synchronously via `peekMiddleware` —
	* `undefined` when `getMiddleware` has not settled yet.
	*/
	#internRoute(routeData, componentInstance) {
		this.#interner.set(routeData, {
			page() {
				return Promise.resolve(componentInstance);
			},
			onRequest: peekMiddleware(this.#manifest)
		});
	}
	#insertRoute({ path, componentInstance, params = {}, type = "page" }) {
		const pathUrl = new URL(path, "https://example.com");
		const routeData = this.#createRoute(pathUrl, params, type);
		this.#manifest.routes.push({
			routeData,
			file: "",
			links: [],
			styles: [],
			scripts: []
		});
		this.#internRoute(routeData, componentInstance);
		return routeData;
	}
	/**
	* @description
	* It renders a component and returns the result as a string.
	*
	* ## Example
	*
	* ```js
	* import Card from "../src/components/Card.astro";
	*
	* const container = await AstroContainer.create();
	* const result = await container.renderToString(Card);
	*
	* console.log(result); // it's a string
	* ```
	*
	*
	* @param {AstroComponentFactory} component The instance of the component.
	* @param {ContainerRenderOptions=} options Possible options to pass when rendering the component.
	*/
	async renderToString(component, options = {}) {
		if (options.slots) options.slots = markAllSlotsAsSlotString(options.slots);
		return await (await this.renderToResponse(component, options)).text();
	}
	/**
	* @description
	* It renders a component and returns the `Response` as result of the rendering phase.
	*
	* ## Example
	*
	* ```js
	* import Card from "../src/components/Card.astro";
	*
	* const container = await AstroContainer.create();
	* const response = await container.renderToResponse(Card);
	*
	* console.log(response.status); // it's a number
	* ```
	*
	*
	* @param {AstroComponentFactory} component The instance of the component.
	* @param {ContainerRenderOptions=} options Possible options to pass when rendering the component.
	*/
	async renderToResponse(component, options = {}) {
		const { routeType = "page", slots } = options;
		const request = options?.request ?? new Request("https://example.com/");
		const url = new URL(request.url);
		const componentInstance = routeType === "endpoint" ? component : this.#wrapComponent(component, options.params);
		const routeData = this.#insertRoute({
			path: request.url,
			componentInstance,
			params: options.params,
			type: routeType
		});
		const state = new FetchState(this.#manifest, request);
		state.routeData = routeData;
		state.pathname = url.pathname;
		state.clientAddress = "";
		state.partial = options?.partial ?? true;
		state.componentInstance = componentInstance;
		state.slots = slots ?? {};
		if (options.params) state.params = options.params;
		state.locals = options?.locals ?? {};
		if (options.props) state.initialProps = options.props;
		return handleMiddleware(state, handlePages);
	}
	/**
	* It stores an Astro **page** route. The first argument, `route`, gets associated to the `component`.
	*
	* This function can be useful when you want to render a route via `AstroContainer.renderToString`, where that
	* route eventually renders another route via `Astro.rewrite`.
	*
	* @param {string} route - The URL that will render the component.
	* @param {AstroComponentFactory} component - The component factory to be used for rendering the route.
	* @param {Record<string, string | undefined>} params - An object containing key-value pairs of route parameters.
	*/
	insertPageRoute(route, component, params) {
		const url = new URL(route, "https://example.com/");
		const routeData = this.#createRoute(url, params ?? {}, "page");
		this.#manifest.routes.push({
			routeData,
			file: "",
			links: [],
			styles: [],
			scripts: []
		});
		const componentInstance = this.#wrapComponent(component, params);
		this.#internRoute(routeData, componentInstance);
	}
	#createRoute(url, params, type) {
		const segments = removeLeadingForwardSlash(url.pathname).split("/").filter(Boolean).map((s) => {
			validateSegment(s);
			return getParts(s, url.pathname);
		});
		return {
			route: url.pathname,
			component: "",
			params: Object.keys(params),
			pattern: getPattern(segments, ASTRO_CONFIG_DEFAULTS.base, ASTRO_CONFIG_DEFAULTS.trailingSlash),
			prerender: false,
			segments,
			type,
			fallbackRoutes: [],
			isIndex: false,
			origin: "internal",
			distURL: []
		};
	}
	/**
	* If the provided component isn't a default export, the function wraps it in an object `{default: Component }` to mimic the default export.
	* @param componentFactory
	* @param params
	* @private
	*/
	#wrapComponent(componentFactory, params) {
		if (params) return {
			default: componentFactory,
			getStaticPaths() {
				return [{ params }];
			}
		};
		return { default: componentFactory };
	}
};
function isNamedRenderer(renderer) {
	return !!renderer?.name;
}
function markAllSlotsAsSlotString(slots) {
	const markedSlots = {};
	for (const slotName in slots) markedSlots[slotName] = new SlotString(slots[slotName], null);
	return markedSlots;
}
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/island-route.ts
/**
* @experimental Built on Astro's `experimental_AstroContainer`. Both APIs
* may break in any Astro minor/patch.
*/
function experimental_createIslandRoute(islands) {
	return async ({ params, request, url }) => {
		const rejection = rejectIfUnsafe(request);
		if (rejection) return rejection;
		const island = islands[params.name ?? ""];
		if (!island) return new Response(`Unknown island "${params.name}"`, { status: 404 });
		const priming = request.headers.get(PRIME_HEADER) !== null;
		try {
			const forms = [];
			const html = await requestStore.run(request, () => formsStore.run(forms, async () => {
				const data = await island.fetch(request, url.searchParams);
				return (await experimental_AstroContainer.create()).renderToString(island.component, { props: island.propsFromData(data, url.searchParams) });
			}));
			const body = (priming ? renderFormPayloads(forms) : "") + wrapIsland(html, island.wrapper, url);
			return new Response(body, { headers: {
				"Content-Type": "text/html; charset=utf-8",
				"Cache-Control": "no-store"
			} });
		} catch {
			return new Response("Island render failed", { status: 500 });
		}
	};
}
function rejectIfUnsafe(request) {
	if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
	if (!(request.headers.get("content-type") ?? "").includes("application/x-tina-preview+json")) return new Response("Not Found", { status: 404 });
	if (request.headers.get("sec-fetch-site") === "cross-site") return new Response("Forbidden", { status: 403 });
	return null;
}
function renderFormPayloads(forms) {
	return sortByPriority(forms).map((form) => renderFormPayloadDiv(form, form.priority === "primary")).join("");
}
function wrapIsland(html, wrapper, url) {
	const cls = wrapper.className ? ` class="${escapeAttr(wrapper.className)}"` : "";
	const marker = escapeAttr(`${url.pathname}${url.search}`);
	return `<${wrapper.tag}${cls} data-tina-island="${marker}">${html}</${wrapper.tag}>`;
}
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/CodeBlockNode.astro
createAstro("https://accessibletravelperu.com");
var $$CodeBlockNode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CodeBlockNode;
	const { node, components } = Astro.props;
	const Override = components.code_block;
	const value = node.value ?? node.children?.map((line) => line.children?.map((tn) => tn.text).join("") ?? "").join("\n") ?? "";
	return renderTemplate`${Override ? renderTemplate`${renderComponent($$result, "Override", Override, {
		"value": value,
		"lang": node.lang
	})}` : renderTemplate`${maybeRenderHead($$result)}<pre><code${addAttribute(node.lang ? `language-${node.lang}` : void 0, "class")}>${value}</code></pre>`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/CodeBlockNode.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/Container.astro
createAstro("https://accessibletravelperu.com");
var $$Container = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Container;
	const { node, components } = Astro.props;
	const t = node.type;
	const Override = components[t];
	const Tag = {
		p: "p",
		h1: "h1",
		h2: "h2",
		h3: "h3",
		h4: "h4",
		h5: "h5",
		h6: "h6",
		ol: "ol",
		ul: "ul",
		li: "li",
		blockquote: "blockquote",
		lic: "div"
	}[t];
	return renderTemplate`${Override ? renderTemplate`${renderComponent($$result, "Override", Override, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": node.children,
		"components": components
	})}` })}` : renderTemplate`${renderComponent($$result, "Tag", Tag, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": node.children,
		"components": components
	})}` })}`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/Container.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/sanitize.ts
/**
* Sanitizes a CMS-supplied href, returning a safe URL or the fallback.
* Blocks dangerous schemes (javascript:, data:, vbscript:) and
* protocol-relative URLs (//evil.com). Allows relative paths, http(s),
* and mailto:.
*/
function sanitizeHref(value, fallback = "#") {
	if (typeof value !== "string") return fallback;
	const trimmed = value.trim();
	if (!trimmed) return fallback;
	const lower = trimmed.toLowerCase();
	if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) return fallback;
	if (trimmed.startsWith("/") && !trimmed.startsWith("//") || trimmed.startsWith("./") || trimmed.startsWith("../") || trimmed.startsWith("#")) return trimmed;
	try {
		const url = new URL(trimmed);
		if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") return trimmed;
	} catch {
		return fallback;
	}
	return fallback;
}
/**
* Validates a CMS-supplied image src, returning the src string if safe or ''
* if it is empty, not a string, or uses a non-http(s)/relative scheme.
*/
function sanitizeImageSrc(src) {
	if (typeof src !== "string") return "";
	const trimmed = src.trim();
	if (!trimmed) return "";
	if (trimmed.startsWith("./") || trimmed.startsWith("../") || trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
	try {
		const url = new URL(trimmed);
		if (url.protocol === "http:" || url.protocol === "https:") return trimmed;
	} catch {
		return "";
	}
	return "";
}
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/ImageNode.astro
createAstro("https://accessibletravelperu.com");
var $$ImageNode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImageNode;
	const { node, components } = Astro.props;
	const Override = components.img;
	return renderTemplate`${Override ? renderTemplate`${renderComponent($$result, "Override", Override, {
		"url": node.url,
		"alt": node.alt,
		"caption": node.caption
	})}` : renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(sanitizeImageSrc(node.url), "src")}${addAttribute(node.alt ?? "", "alt")}>`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/ImageNode.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/Leaf.astro
createAstro("https://accessibletravelperu.com");
var $$Leaf = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Leaf;
	const { node } = Astro.props;
	return renderTemplate`${node.bold ? renderTemplate`${maybeRenderHead($$result)}<strong>${renderComponent($$result, "Astro.self", Astro.self, { "node": {
		...node,
		bold: false
	} })}</strong>` : node.italic ? renderTemplate`<em>${renderComponent($$result, "Astro.self", Astro.self, { "node": {
		...node,
		italic: false
	} })}</em>` : node.underline ? renderTemplate`<u>${renderComponent($$result, "Astro.self", Astro.self, { "node": {
		...node,
		underline: false
	} })}</u>` : node.strikethrough ? renderTemplate`<s>${renderComponent($$result, "Astro.self", Astro.self, { "node": {
		...node,
		strikethrough: false
	} })}</s>` : node.code ? renderTemplate`<code>${renderComponent($$result, "Astro.self", Astro.self, { "node": {
		...node,
		code: false
	} })}</code>` : node.highlight ? renderTemplate`<mark${addAttribute(node.highlightColor ? `background-color:${node.highlightColor}` : void 0, "style")}>${renderComponent($$result, "Astro.self", Astro.self, { "node": {
		...node,
		highlight: false,
		highlightColor: void 0
	} })}</mark>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${node.text}` })}`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/Leaf.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/LinkNode.astro
createAstro("https://accessibletravelperu.com");
var $$LinkNode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LinkNode;
	const { node, components } = Astro.props;
	const Override = components.a;
	return renderTemplate`${Override ? renderTemplate`${renderComponent($$result, "Override", Override, { "url": node.url }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": node.children,
		"components": components
	})}` })}` : renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(sanitizeHref(node.url), "href")}>${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": node.children,
		"components": components
	})}</a>`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/LinkNode.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/MdxTableNode.astro
createAstro("https://accessibletravelperu.com");
var $$MdxTableNode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MdxTableNode;
	const { node, components } = Astro.props;
	const props = node.props;
	const align = props.align ?? [];
	const allRows = props.tableRows ?? [];
	const header = props.firstRowHeader ? allRows.at(0) : void 0;
	const bodyRows = props.firstRowHeader ? allRows.slice(1) : allRows;
	const ThOverride = components.th;
	const TdOverride = components.td;
	const cellInline = (value) => {
		return (Array.isArray(value) ? value : value?.children ?? []).flatMap((n) => n.type === "p" ? n.children : []);
	};
	const cellStyle = (i) => `text-align:${align[i] ?? "auto"}`;
	return renderTemplate`${maybeRenderHead($$result)}<table>${header && renderTemplate`<thead><tr>${(header.tableCells ?? []).map((cell, i) => ThOverride ? renderTemplate`${renderComponent($$result, "ThOverride", ThOverride, { "align": align[i] }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": cellInline(cell.value),
		"components": components
	})}` })}` : renderTemplate`<th${addAttribute(cellStyle(i), "style")}>${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": cellInline(cell.value),
		"components": components
	})}</th>`)}</tr></thead>`}<tbody>${bodyRows.map((row) => renderTemplate`<tr>${(row?.tableCells ?? []).map((cell, i) => TdOverride ? renderTemplate`${renderComponent($$result, "TdOverride", TdOverride, { "align": align[i] }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": cellInline(cell.value),
		"components": components
	})}` })}` : renderTemplate`<td${addAttribute(cellStyle(i), "style")}>${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": cellInline(cell.value),
		"components": components
	})}</td>`)}</tr>`)}</tbody></table>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/MdxTableNode.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/MdxNode.astro
createAstro("https://accessibletravelperu.com");
var $$MdxNode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MdxNode;
	const { node, components } = Astro.props;
	const props = node.props ?? {};
	const MdxComponent = components[node.name];
	const isLegacyTable = !MdxComponent && node.name === "table";
	return renderTemplate`${MdxComponent ? renderTemplate`${renderComponent($$result, "MdxComponent", MdxComponent, { ...props })}` : isLegacyTable ? renderTemplate`${renderComponent($$result, "MdxTableNode", $$MdxTableNode, {
		"node": {
			...node,
			props
		},
		"components": components
	})}` : renderTemplate`${maybeRenderHead($$result)}<span style="display:inline-block;padding:0.25rem 0.5rem;background:#fee;color:#900;border-radius:0.25rem;font-family:monospace;font-size:0.85em;">No component provided for ${node.name}</span>`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/MdxNode.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/TableNode.astro
createAstro("https://accessibletravelperu.com");
var $$TableNode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TableNode;
	const { node, components } = Astro.props;
	const TableOverride = components.table;
	const TrOverride = components.tr;
	const TdOverride = components.td;
	const align = node.props?.align ?? [];
	const rows = node.children ?? [];
	const TABLE_STYLE = "border:1px solid #EDECF3";
	const tdStyle = (i) => `text-align:${align[i] ?? "auto"};border:1px solid #EDECF3;padding:0.25rem`;
	const cellContent = (cell) => (cell?.children ?? []).flatMap((paragraph) => paragraph?.children ?? []);
	const Table = TableOverride ?? "table";
	const tableProps = TableOverride ? { node } : { style: TABLE_STYLE };
	const Tr = TrOverride ?? "tr";
	return renderTemplate`${renderComponent($$result, "Table", Table, { ...tableProps }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<tbody>${rows.map((row) => renderTemplate`${renderComponent($$result, "Tr", Tr, {}, { "default": ($$result) => renderTemplate`${(row?.children ?? []).map((cell, i) => TdOverride ? renderTemplate`${renderComponent($$result, "TdOverride", TdOverride, { "align": align[i] }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": cellContent(cell),
		"components": components
	})}` })}` : renderTemplate`<td${addAttribute(tdStyle(i), "style")}>${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, {
		"content": cellContent(cell),
		"components": components
	})}</td>`)}` })}`)}</tbody>` })}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/TableNode.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/Node.astro
createAstro("https://accessibletravelperu.com");
var $$Node = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Node;
	const { node, components } = Astro.props;
	const t = node.type;
	const Override = components[t];
	return renderTemplate`${(/* @__PURE__ */ new Set([
		"p",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"ol",
		"ul",
		"li",
		"lic",
		"blockquote"
	])).has(t) ? renderTemplate`${renderComponent($$result, "Container", $$Container, {
		"node": node,
		"components": components
	})}` : t === "a" ? renderTemplate`${renderComponent($$result, "LinkNode", $$LinkNode, {
		"node": node,
		"components": components
	})}` : t === "img" ? renderTemplate`${renderComponent($$result, "ImageNode", $$ImageNode, {
		"node": node,
		"components": components
	})}` : t === "code_block" ? renderTemplate`${renderComponent($$result, "CodeBlockNode", $$CodeBlockNode, {
		"node": node,
		"components": components
	})}` : t === "table" ? renderTemplate`${renderComponent($$result, "TableNode", $$TableNode, {
		"node": node,
		"components": components
	})}` : t === "text" ? renderTemplate`${renderComponent($$result, "Leaf", $$Leaf, { "node": node })}` : t === "mdxJsxFlowElement" || t === "mdxJsxTextElement" ? renderTemplate`${renderComponent($$result, "MdxNode", $$MdxNode, {
		"node": node,
		"components": components
	})}` : t === "hr" ? Override ? renderTemplate`${renderComponent($$result, "Override", Override, {})}` : renderTemplate`${maybeRenderHead($$result)}<hr>` : t === "break" ? Override ? renderTemplate`${renderComponent($$result, "Override", Override, {})}` : renderTemplate`<br>` : t === "html" || t === "html_inline" ? Override ? renderTemplate`${renderComponent($$result, "Override", Override, { "value": node.value })}` : node.value : t === "invalid_markdown" ? renderTemplate`<pre>${node.value}</pre>` : null}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/Node.astro", void 0);
//#endregion
//#region node_modules/.pnpm/@tinacms+bridge@0.3.1/node_modules/@tinacms/bridge/dist/metadata.js
var SYSTEM_KEYS = /* @__PURE__ */ new Set([
	"__typename",
	"_sys",
	"_internalSys",
	"_values",
	"_internalValues",
	"_content_source",
	"_tina_metadata"
]);
var addMetadata = (id, obj, path = []) => {
	if (obj === null) return obj;
	if (isScalarOrUndefined(obj)) return obj;
	if (obj instanceof String) return obj.valueOf();
	if (Array.isArray(obj)) return obj.map((item, index) => addMetadata(id, item, [...path, index]));
	const next = {};
	for (const [key, value] of Object.entries(obj)) if (SYSTEM_KEYS.has(key)) next[key] = value;
	else next[key] = addMetadata(id, value, [...path, key]);
	if (next && typeof next === "object" && "type" in next && next.type === "root") return next;
	return {
		...next,
		_content_source: {
			queryId: id,
			path
		}
	};
};
function isScalarOrUndefined(value) {
	const type = typeof value;
	if (type === "string") return true;
	if (type === "number") return true;
	if (type === "boolean") return true;
	if (type === "undefined") return true;
	if (value == null) return true;
	if (value instanceof String) return true;
	if (value instanceof Number) return true;
	if (value instanceof Boolean) return true;
	return false;
}
var hashFromQuery = (input) => {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.charCodeAt(i);
		hash = (hash << 5) - hash + char & 4294967295;
	}
	return Math.abs(hash).toString(36);
};
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/data.ts
async function requestWithMetadata(source, options) {
	let result = null;
	try {
		result = await source ?? null;
	} catch (error) {
		console.warn("[@tinacms/astro] client query failed", error);
	}
	const query = result?.query ?? "";
	const variables = result?.variables ?? {};
	const id = hashFromQuery(JSON.stringify({
		query,
		variables
	}));
	const data = result?.data ?? {};
	const request = requestStore.getStore();
	let resolvedData = data;
	if (request) {
		const overlay = await readOverlay(request, id);
		if (overlay !== void 0) resolvedData = overlay;
	}
	const enriched = {
		data: addMetadata(id, resolvedData),
		query,
		variables,
		id
	};
	recordForm({
		id,
		query,
		variables,
		data: enriched.data,
		priority: options?.priority
	});
	return enriched;
}
//#endregion
//#region node_modules/.pnpm/@tinacms+bridge@0.3.1/node_modules/@tinacms/bridge/dist/tina-field.js
var tinaField = (object, property, index) => {
	const contentSource = object == null ? void 0 : object._content_source;
	if (!contentSource) return "";
	const { queryId, path } = contentSource;
	if (!property) return `${queryId}---${path.join(".")}`;
	return `${queryId}---${(typeof index === "number" ? [
		...path,
		property,
		index
	] : [...path, property]).join(".")}`;
};
//#endregion
//#region node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/TinaMarkdown.astro
createAstro("https://accessibletravelperu.com");
var $$TinaMarkdown = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TinaMarkdown;
	const { content, components = {} } = Astro.props;
	const nodes = !content ? [] : Array.isArray(content) ? content : content.children ?? [];
	return renderTemplate`${nodes.map((node) => renderTemplate`${renderComponent($$result, "Node", $$Node, {
		"node": node,
		"components": components
	})}`)}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/node_modules/.pnpm/@tinacms+astro@0.6.1_astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@em_5d8f0a11aa7c13becd104d5829e463b5/node_modules/@tinacms/astro/src/TinaMarkdown.astro", void 0);
//#endregion
//#region src/components/tina/PostBodyBlog.astro
createAstro("https://accessibletravelperu.com");
var $$PostBodyBlog = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PostBodyBlog;
	const { data } = Astro.props;
	return renderTemplate`${data && renderTemplate`${maybeRenderHead($$result)}<article class="flex flex-col w-full   max-w-4xl py-12 mx-auto"><!-- Hero Image --><figure class="mb-12 "><img${addAttribute(data.image ?? "/images/gato.jpg", "src")}${addAttribute(`Imagen destacada de ${data.title}`, "alt")} class="w-full  aspect-video object-cover rounded-lg"${addAttribute(tinaField(data, "image"), "data-tina-field")}></figure><!-- Header del Post --><header class="mb-12 pb-8  border-b border-gray-200"><h1 class="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight"${addAttribute(tinaField(data, "title"), "data-tina-field")}>${data.title}</h1><div class="flex flex-wrap items-center gap-4 text-sm text-gray-500"><time${addAttribute(data.date, "datetime")} class="flex items-center gap-2"${addAttribute(tinaField(data, "date"), "data-tina-field")}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>${data.date ? new Date(data.date).toLocaleDateString("es-PE", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}) : ""}</time><span class="flex items-center gap-2"${addAttribute(tinaField(data, "author"), "data-tina-field")}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>${data.author}</span></div>${data.description && renderTemplate`<p class="text-lg text-gray-600 mt-6 leading-relaxed"${addAttribute(tinaField(data, "description"), "data-tina-field")}>${data.description}</p>`}</header><div${addAttribute("markdown-content", "class")}${addAttribute(tinaField(data, "body"), "data-tina-field")}>${renderComponent($$result, "TinaMarkdown", $$TinaMarkdown, { "content": data.body })}</div></article>`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/tina/PostBodyBlog.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/assets/runtime.js
function createSvgComponent({ meta, attributes, children, styles }) {
	const hasStyles = styles.length > 0;
	const Component = createComponent({
		async factory(result, props) {
			const normalizedProps = normalizeProps(attributes, props);
			if (hasStyles && result.cspDestination) for (const style of styles) {
				const hash = await generateCspDigest(style, result.cspAlgorithm);
				result._metadata.extraStyleHashes.push(hash);
			}
			return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
		},
		propagation: hasStyles ? "self" : "none"
	});
	Object.defineProperty(Component, "toJSON", {
		value: () => meta,
		enumerable: false
	});
	return Object.assign(Component, meta);
}
var ATTRS_TO_DROP = [
	"xmlns",
	"xmlns:xlink",
	"version"
];
var DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
	for (const attr of ATTRS_TO_DROP) delete attributes[attr];
	return attributes;
}
function normalizeProps(attributes, props) {
	return dropAttributes({
		...DEFAULT_ATTRS,
		...attributes,
		...props
	});
}
var CONTENT_IMAGE_FLAG = "astroContentImageFlag";
var DATA_STORE_VIRTUAL_ID = "astro:data-layer-content";
"" + DATA_STORE_VIRTUAL_ID;
var IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
`${DATA_STORE_VIRTUAL_ID}`;
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/assets/utils/resolveImports.js
function imageSrcToImportId(imageSrc, filePath) {
	imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
	if (isRemotePath(imageSrc)) return;
	const ext = imageSrc.split(".").at(-1)?.toLowerCase();
	if (!ext || !VALID_INPUT_FORMATS.includes(ext)) return;
	const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
	if (filePath) params.set("importer", filePath);
	return `${imageSrc}?${params.toString()}`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/content/data-store-source.js
var InMemorySource = class {
	#store;
	constructor(store) {
		this.#store = store;
	}
	hasCollection(collection) {
		return this.#store.hasCollection(collection);
	}
	get(collection, key) {
		return this.#store.get(collection, key);
	}
	entries(collection) {
		return this.#store.entries(collection);
	}
	values(collection) {
		return this.#store.values(collection);
	}
	keys(collection) {
		return this.#store.keys(collection);
	}
	has(collection, key) {
		return this.#store.has(collection, key);
	}
	collections() {
		return this.#store.collections();
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/content/data-store.js
var ChunkedCollectionParser = class {
	#entries = /* @__PURE__ */ new Map();
	#remainder = "";
	add(part) {
		const records = (this.#remainder + part).split("\n");
		this.#remainder = records.pop();
		for (const record of records) {
			const parsed = parse(record);
			if (!Array.isArray(parsed) || parsed.length !== 2 || typeof parsed[0] !== "string") throw new Error("Invalid chunked data store entry");
			this.#entries.set(parsed[0], parsed[1]);
		}
	}
	finish() {
		if (this.#remainder) throw new Error("Invalid chunked data store entry");
		return this.#entries;
	}
};
var ImmutableDataStore = class ImmutableDataStore {
	_collections = /* @__PURE__ */ new Map();
	constructor() {
		this._collections = /* @__PURE__ */ new Map();
	}
	get(collectionName, key) {
		return this._collections.get(collectionName)?.get(String(key));
	}
	entries(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).entries()];
	}
	values(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).values()];
	}
	keys(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).keys()];
	}
	has(collectionName, key) {
		const collection = this._collections.get(collectionName);
		if (collection) return collection.has(String(key));
		return false;
	}
	hasCollection(collectionName) {
		return this._collections.has(collectionName);
	}
	collections() {
		return this._collections;
	}
	/**
	* Rebuilds a collections map from a chunked-store manifest whose part file
	* names have already been swapped for their contents.
	*
	* Each collection maps to a list of parts. A part is either a raw string
	* (when the store is loaded from disk) or an ESM namespace from a virtual
	* chunk import (`{ default: string }`, when emitted at runtime). Each part
	* contains independently serialized entry records. This is the inverse of
	* {@link import('./data-store-writer.js').ChunkedWriter} and stays free of
	* Node built-ins so it can run at runtime.
	*/
	static manifestToMap(manifest) {
		const collections = /* @__PURE__ */ new Map();
		for (const [collectionName, parts] of Object.entries(manifest)) {
			const parser = new ChunkedCollectionParser();
			for (const part of parts) parser.add(typeof part === "string" ? part : part.default);
			collections.set(collectionName, parser.finish());
		}
		return collections;
	}
	/**
	* Attempts to load a DataStore from the virtual module.
	* This only works in Vite.
	*/
	static async fromModule() {
		try {
			const data = await import("./_astro_data-layer-content_CKXQ-oey.mjs");
			if (data.default instanceof Map) return ImmutableDataStore.fromMap(data.default);
			if (Array.isArray(data.default)) {
				const map2 = unflatten(data.default);
				return ImmutableDataStore.fromMap(map2);
			}
			const map = ImmutableDataStore.manifestToMap(data.default);
			return ImmutableDataStore.fromMap(map);
		} catch {}
		return new ImmutableDataStore();
	}
	static async fromMap(data) {
		const store = new ImmutableDataStore();
		store._collections = data;
		return store;
	}
};
function dataStoreSingleton() {
	let instance = void 0;
	return {
		get: async () => {
			if (!instance) instance = ImmutableDataStore.fromModule().then((store) => new InMemorySource(store));
			return instance;
		},
		set: (store) => {
			instance = new InMemorySource(store);
		}
	};
}
var globalDataStore = dataStoreSingleton();
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/content/loaders/errors.js
function formatZodError(error) {
	return error.issues.map((issue) => `  **${issue.path.join(".")}**: ${issue.message}`);
}
var LiveCollectionError = class LiveCollectionError extends Error {
	collection;
	message;
	cause;
	constructor(collection, message, cause) {
		super(message);
		this.collection = collection;
		this.message = message;
		this.cause = cause;
		this.name = "LiveCollectionError";
		if (cause?.stack) this.stack = cause.stack;
	}
	static is(error) {
		return error instanceof LiveCollectionError;
	}
};
var LiveEntryNotFoundError = class extends LiveCollectionError {
	constructor(collection, entryFilter) {
		super(collection, `Entry ${collection} \u2192 ${typeof entryFilter === "string" ? entryFilter : JSON.stringify(entryFilter)} was not found.`);
		this.name = "LiveEntryNotFoundError";
	}
	static is(error) {
		return error?.name === "LiveEntryNotFoundError";
	}
};
var LiveCollectionValidationError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${collection} \u2192 ${entryId}** data does not match the collection schema.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionValidationError";
	}
	static is(error) {
		return error?.name === "LiveCollectionValidationError";
	}
};
var LiveCollectionCacheHintError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${String(collection)}${entryId ? ` \u2192 ${String(entryId)}` : ""}** returned an invalid cache hint.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionCacheHintError";
	}
	static is(error) {
		return error?.name === "LiveCollectionCacheHintError";
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@astrojs+markdown-remark@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@_e6b0bc7102ad10341928659bc6e5a417/node_modules/astro/dist/content/runtime.js
var cacheHintSchema = object({
	tags: array(string()).optional(),
	lastModified: date().optional()
});
async function parseLiveEntry(entry, schema, collection) {
	try {
		const parsed = await safeParseAsync(schema, entry.data);
		if (!parsed.success) return { error: new LiveCollectionValidationError(collection, entry.id, parsed.error) };
		if (entry.cacheHint) {
			const cacheHint = cacheHintSchema.safeParse(entry.cacheHint);
			if (!cacheHint.success) return { error: new LiveCollectionCacheHintError(collection, entry.id, cacheHint.error) };
			entry.cacheHint = cacheHint.data;
		}
		return { entry: {
			...entry,
			data: parsed.data
		} };
	} catch (error) {
		return { error: new LiveCollectionError(collection, `Unexpected error parsing entry ${entry.id} in collection ${collection}`, error) };
	}
}
function createGetCollection({ liveCollections }) {
	return async function getCollection(collection, filter) {
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
		});
		const hasFilter = typeof filter === "function";
		const store = await globalDataStore.get();
		if (await store.hasCollection(collection)) {
			const { default: imageAssetMap } = await import("./content-assets_BNW1matP.mjs");
			const result = [];
			for (const rawEntry of await store.values(collection)) {
				const data = resolveEntryData(rawEntry, imageAssetMap);
				let entry = {
					...rawEntry,
					data,
					collection
				};
				if (hasFilter && !filter(entry)) continue;
				result.push(entry);
			}
			return result;
		} else {
			console.warn(`The collection ${JSON.stringify(collection)} does not exist or is empty. Please check your content config file for errors.`);
			return [];
		}
	};
}
function createGetEntry({ liveCollections }) {
	return async function getEntry(collectionOrLookupObject, lookup) {
		let collection, lookupId;
		if (typeof collectionOrLookupObject === "string") {
			collection = collectionOrLookupObject;
			if (!lookup) throw new AstroError({
				...UnknownContentCollectionError,
				message: "`getEntry()` requires an entry identifier as the second argument."
			});
			lookupId = lookup;
		} else {
			collection = collectionOrLookupObject.collection;
			lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
		}
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
		});
		if (typeof lookupId === "object") throw new AstroError({
			...UnknownContentCollectionError,
			message: `The entry identifier must be a string. Received object.`
		});
		const store = await globalDataStore.get();
		if (await store.hasCollection(collection)) {
			const entry = await store.get(collection, lookupId);
			if (!entry) {
				console.warn(`Entry ${collection} → ${lookupId} was not found.`);
				return;
			}
			const { default: imageAssetMap } = await import("./content-assets_BNW1matP.mjs");
			const data = resolveEntryData(entry, imageAssetMap);
			const result = {
				...entry,
				data,
				collection
			};
			warnForPropertyAccess(result.data, "slug", `[content] Attempted to access deprecated property on "${collection}" entry.
The "slug" property is no longer automatically added to entries. Please use the "id" property instead.`);
			warnForPropertyAccess(result, "render", `[content] Invalid attempt to access "render()" method on "${collection}" entry.
To render an entry, use "render(entry)" from "astro:content".`);
			return result;
		}
	};
}
function warnForPropertyAccess(entry, prop, message) {
	if (!(prop in entry)) {
		let _value = void 0;
		Object.defineProperty(entry, prop, {
			get() {
				if (_value === void 0) console.error(message);
				return _value;
			},
			set(v) {
				_value = v;
			},
			enumerable: false
		});
	}
}
function createGetLiveCollection({ liveCollections }) {
	return async function getLiveCollection(collection, filter) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveCollection() to load regular content collections.`) };
		try {
			const context = {
				filter,
				collection
			};
			const response = await liveCollections[collection].loader?.loadCollection?.(context);
			if (response && "error" in response) return { error: response.error };
			const { schema } = liveCollections[collection];
			let processedEntries = response.entries;
			if (schema) {
				const entryResults = await Promise.all(response.entries.map((entry) => parseLiveEntry(entry, schema, collection)));
				for (const result of entryResults) if (result.error) return { error: result.error };
				processedEntries = entryResults.map((result) => result.entry);
			}
			let cacheHint = response.cacheHint;
			if (cacheHint) {
				const cacheHintResult = cacheHintSchema.safeParse(cacheHint);
				if (!cacheHintResult.success) return { error: new LiveCollectionCacheHintError(collection, void 0, cacheHintResult.error) };
				cacheHint = cacheHintResult.data;
			}
			if (processedEntries.length > 0) {
				const entryTags = /* @__PURE__ */ new Set();
				let latestModified;
				for (const entry of processedEntries) if (entry.cacheHint) {
					if (entry.cacheHint.tags) entry.cacheHint.tags.forEach((tag) => entryTags.add(tag));
					if (entry.cacheHint.lastModified instanceof Date) {
						if (latestModified === void 0 || entry.cacheHint.lastModified > latestModified) latestModified = entry.cacheHint.lastModified;
					}
				}
				if (entryTags.size > 0 || latestModified || cacheHint) {
					const mergedCacheHint = {};
					if (cacheHint?.tags || entryTags.size > 0) mergedCacheHint.tags = [.../* @__PURE__ */ new Set([...cacheHint?.tags || [], ...entryTags])];
					if (cacheHint?.lastModified && latestModified) mergedCacheHint.lastModified = cacheHint.lastModified > latestModified ? cacheHint.lastModified : latestModified;
					else if (cacheHint?.lastModified || latestModified) mergedCacheHint.lastModified = cacheHint?.lastModified ?? latestModified;
					cacheHint = mergedCacheHint;
				}
			}
			return {
				entries: processedEntries,
				cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading collection ${collection}${error instanceof Error ? `: ${error.message}` : ""}`, error) };
		}
	};
}
function createGetLiveEntry({ liveCollections }) {
	return async function getLiveEntry(collection, lookup) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveEntry() to load regular content collections.`) };
		try {
			const lookupObject = {
				filter: typeof lookup === "string" ? { id: lookup } : lookup,
				collection
			};
			let entry = await liveCollections[collection].loader?.loadEntry?.(lookupObject);
			if (entry && "error" in entry) return { error: entry.error };
			if (!entry) return { error: new LiveEntryNotFoundError(collection, lookup) };
			const { schema } = liveCollections[collection];
			if (schema) {
				const result = await parseLiveEntry(entry, schema, collection);
				if (result.error) return { error: result.error };
				entry = result.entry;
			}
			return {
				entry,
				cacheHint: entry.cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading entry ${collection} → ${typeof lookup === "string" ? lookup : JSON.stringify(lookup)}`, error) };
		}
	};
}
function resolveImageAtPath(src, fileName, imageAssetMap) {
	const id = imageSrcToImportId(src, fileName);
	if (!id) return;
	const imported = imageAssetMap?.get(id);
	if (!imported) return;
	if (imported.__svgData) {
		const { __svgData: svgData, ...meta } = imported;
		return createSvgComponent({
			meta,
			...svgData
		});
	}
	return imported;
}
function setAtPathCopying(target, path, value) {
	if (path.length === 0) return target;
	const [key, ...rest] = path;
	const copy = Array.isArray(target) ? target.slice() : { ...target };
	copy[key] = rest.length === 0 ? value : setAtPathCopying(copy[key], rest, value);
	return copy;
}
function updateImageReferencesInData(data, fileName, imageAssetMap, imageImports) {
	if (!imageImports?.length) return data;
	let result = data;
	for (const path of imageImports) {
		let src = result;
		for (const key of path) src = src?.[key];
		if (typeof src !== "string") continue;
		const resolved = resolveImageAtPath(src, fileName, imageAssetMap);
		if (resolved !== void 0) result = setAtPathCopying(result, path, resolved);
	}
	return result;
}
function resolveEntryData(entry, imageAssetMap) {
	return updateImageReferencesInData(entry.data, entry.filePath, imageAssetMap, entry.imageImports);
}
//#endregion
//#region \0astro:content
var liveCollections = {};
var getCollection = createGetCollection({ liveCollections });
var getEntry = createGetEntry({ liveCollections });
createGetLiveCollection({ liveCollections });
createGetLiveEntry({ liveCollections });
var en_default = {
	title: "Accessible Travel Peru | Inclusive Tours for People with Disabilities",
	description: "Discover Peru without limits with Accessible Travel Peru. We specialize in inclusive tourism for people with mobility disabilities, offering accessible hotels, adapted routes, specialized equipment, and expert guides. Explore Machu Picchu, Cusco, and Lake Titicaca with safety, comfort, and personalized support.",
	talkAboutTrip: "Shall we talk about your trip?",
	leaveEmail: "Leave us your email and we’ll contact you to tell you all about Peru.",
	whatsYourName: "What’s your name?",
	enterEmail: "Enter your email",
	tripType: "Tell us: what type of trip are you looking for? Adventure, relaxation, culture...?",
	contactMe: "I want to be contacted",
	writeUsDirectly: "Or write to us directly via:",
	includes: [
		"Adapted Hotels",
		"Accessible Routes",
		"Specialized Equipment",
		"Official Tour Guides",
		"Support Staff",
		"Train Tickets & Entrances",
		"Domestic flights",
		"Climatic Events & Warnings"
	],
	servicios: [
		"Accessible Tours",
		"Custom Itineraries",
		"Transportation Services",
		"Accessible Accommodations",
		"Travel Consultation"
	],
	header: {
		"Home": "Home",
		"AllToursPeru": "All Tours Peru",
		"GroupTours": "Group Tours",
		"Blog": "Blog",
		"AboutUs": "About Us",
		"children": {
			"ContactUs": "Contact Us",
			"TermsAndConditions": "Terms and Conditions",
			"AboutUs": "About Us"
		}
	},
	detalles: [
		"Double room.",
		"Expertly crafted accessible tours designed for seamless travel and the ultimate visitor experience.",
		"All offer-based services (tours, equipment).",
		"Bilingual local tour guides (Spanish / English).",
		"Dedicated support staff available at all times and a qualified nurse for first-aid assistance.",
		"Tickets and access to Machu Picchu + round trip train tickets.",
		"Includes all domestic round-trip flights within Peru.",
		"Maybe... you like heavy raining in the tour."
	],
	heroGroupUltimaOportunidad: "Last chance!",
	heroGroupCierraEn: "The event closes in:",
	heroGroupTiempoLimitado: "Limited time",
	heroGroupDisponibleHasta: "Available until:",
	heroGroupPreparado: "Book Now and get ready for the experience with 10% off!",
	heroGroupComienzaEn: "Starts in:",
	heroGroupNoTeLoPierdas: "Don't miss it!",
	heroGroupFinalizaEn: "Ends in:",
	heroGroupCuentaRegresiva: "Active countdown",
	heroGroupTerminaPronto: "Ends soon:",
	heroGroupAgotado: "Sold out",
	heroGroupTodosAgotados: "This tour is sold out",
	heroGroupSigueRevisando: "New dates coming soon",
	heroGroupTodosAgotadosHero: "All group tours are currently sold out",
	heroGroupSigueRevisandoHero: "Don't worry! Check our individual tours or contact us for custom experiences. New dates coming soon!",
	whatsappCtaDefaultTitle: "Contact us on WhatsApp",
	whatsappCtaDefaultMessage: "Get instant answers to your questions",
	whatsappCtaDefaultButton: "Chat with us",
	whatsappCtaUrgentTitle: "Need help now?",
	whatsappCtaUrgentMessage: "Our team is ready to assist you immediately",
	whatsappCtaUrgentButton: "Contact us now",
	whatsappCtaBookingTitle: "Ready to book?",
	whatsappCtaBookingMessage: "Let us help you plan your perfect trip",
	whatsappCtaBookingButton: "Book via WhatsApp",
	whatsappCtaEmailButton: "Send email to me",
	titleDinamico: "TOUR, TRAVEL AND ADVENTURE CAMP",
	subtitleDinamico: "Welcome to Accessible Travel Peru! We are a travel agency specialized in accessible, reliable, and professional tourism. We offer unique experiences across Peru.",
	botonDinamico1: "Group Tour",
	botonDinamico2: "About Us",
	cantidadClientesHeroHome: "Over 5,000 clients worldwide",
	aniosExperienciaHeroHome: "10 years of experience",
	subtituloHeroHome: "Discover Peru without limits",
	tituloHeroHome: "A great adventure awaits you. Traveling is a right, not a privilege.",
	itemsHeroHome: [{
		"tituloHeroHome": "Custom accessible travels",
		"textoHeroHome": "We create personalized itineraries according to your interests, needs, and pace—because true luxury is choosing how to live your adventure."
	}, {
		"tituloHeroHome": "Reliable and committed guides",
		"textoHeroHome": "Travel with professionals passionate about inclusion and ready to support you every step of the way."
	}],
	botonHeroHome: "LEARN MORE ABOUT US",
	autorHeroHome: {
		"nombreHeroHome": "Francisco",
		"cargoHeroHome": "CEO and Founder",
		"mensajeHeroHome": "Explore beautiful and barrier-free destinations throughout Peru."
	},
	servicesActividades: [
		{
			"title": "Transfers from the airport",
			"icon": "carrito",
			"link": "#",
			"activo": true
		},
		{
			"title": "Full-day excursions",
			"icon": "guia",
			"link": "#"
		},
		{
			"title": "Multi-day excursions",
			"icon": "montanas",
			"link": "#"
		},
		{
			"title": "Custom trips",
			"icon": "corbata",
			"link": "#"
		},
		{
			"title": "Off-road tours",
			"icon": "4x4",
			"link": "#"
		}
	],
	tituloActividades: "Services",
	tituloRecomendado: "Recommended Destinations",
	tituloMiembros: "Proud members of",
	tituloPublicaciones: "New publications",
	subtituloPublicaciones: "Explore the world",
	tituloComentarios: "What does our passenger say?",
	subtituloComentarios: "Explore the world",
	descripcionAccessible: "Accessible Travel Peru is a travel agency specialized in inclusive tourism for people with disabilities, connecting adventure with accessibility throughout Peru.",
	botonModal: "Contact us",
	footerServicios: "Our Services",
	footerSocios: "Our Partners",
	footerRedes: "Connect with us",
	contactoDireccion: "Address line",
	contactoNumero: "Phone number",
	contactoCorreo: "Email address",
	formularioTitulo: "Fill out the form",
	formDescripcion: "Do not hesitate to contact us at Accessible Travel Peru for any inquiry or to start planning your accessible adventure in Peru! Our dedicated team is here to help you every step of the way.",
	formularioDescripcion: "Your email address will not be published. Required fields are marked with *",
	formularioNombre: "Your name*",
	formularioCorreo: "Email address *",
	formularioMensaje: "Enter your message here",
	formularioBoton: "Get in touch",
	cardDestinoBoton: "Read more",
	cardDestinoRecomendado: "Recommended",
	infoBotonDescripcion: "Description",
	infoBotonPlanificacion: "Tour Planning",
	infoRecomendado: "Recommended",
	infoReseñas: "Reviews",
	infoHuespedes: "Max. People",
	infoDias: "Days",
	infoTravelDay: "Day",
	infoDescripcion: "Description",
	infoIncluye: "Includes",
	infoNoIncluye: "Not Included",
	infoPaquetes: "Available packages",
	infoComplementos: "Available add-ons",
	infoPrecio: "Price",
	infoDeposito: "Deposit",
	infoReserva: "Book now",
	asideTotal: "Total",
	asideProceso: "Check the itinerary on WeTravel",
	asideDescripcionProceso: "You will be redirected to WeTravel, a secure platform to review your itinerary.",
	asideConfianza: "Book with confidence",
	asideList: {
		"atencionCliente": "Customer service available 24/7",
		"seleccionActividades": "Tours and activities carefully selected",
		"seguroIncluido": "Free travel insurance included",
		"garantiaPrecio": "Best price guarantee without complications"
	},
	asidePago: "You can pay with",
	asideBlogSub: "Inclusive Travel Agency",
	asideBlogDescripcion: "Specialized in accessible tourism for people with disabilities. We connect adventure and accessibility throughout Peru.",
	opcionLenguaje: "Select Language",
	aboutTitle: "Accessible Travel Peru",
	aboutSubtitle: "Your gateway to inclusive adventures",
	aboutDescription: "Welcome to Accessible Travel Peru, your trusted specialist in accessible tourism. Our dedicated team is committed to making the wonders of Peru accessible to everyone, offering personalized tours and services tailored to individual needs. With years of experience and a passion for inclusion, we guarantee that every traveler's dreams come true.",
	aboutTagline: "Experience Peru without barriers: where every journey is accessible, inclusive, and unforgettable.",
	heroGroupDescuento: "10",
	heroGroupDescripcion: "Discover great accessible deals across Peru",
	heroGroupUrgencia: "Hurry up!",
	heroGroupTerminaEn: "The offer ends in:",
	heroGroupUnidades: [
		"DAYS",
		"HOURS",
		"MINUTES",
		"SECONDS"
	],
	heroGroupIncluyeTitulo: "What does it include?",
	aboutCantidadClientes: "2,000+ Clients worldwide",
	aboutAniosExperiencia: "10 Years of experience",
	shared: "Share via",
	toastCopiado: "Link copied!",
	toastErrorCopiar: "Could not copy",
	toastInstagram: "Link copied. Open Instagram and paste it in your story"
};
var es_default = {
	title: "Accessible Travel Peru | Viajes inclusivos para personas con discapacidad",
	description: "Descubre el Perú sin barreras con Accessible Travel Peru. Somos especialistas en turismo inclusivo para personas con discapacidades motrices, ofreciendo hoteles accesibles, rutas adaptadas, equipamiento especializado y guías expertos. Explora Machu Picchu, Cusco y el Lago Titicaca con seguridad, comodidad y asistencia personalizada.",
	talkAboutTrip: "¿Hablamos de tu viaje?",
	leaveEmail: "Déjanos tu email y te contactamos para contarte todo sobre el Perú.",
	whatsYourName: "¿Cómo te llamas?",
	enterEmail: "Ingresa tu email",
	tripType: "Cuéntanos: ¿qué tipo de viaje buscas? ¿aventura, relax, cultura...?",
	contactMe: "Quiero que me contacten",
	writeUsDirectly: "O escríbenos directamente por:",
	includes: [
		"Hoteles adaptados",
		"Rutas accesibles",
		"Equipamiento especializado",
		"Guías turísticos oficiales",
		"Personal de apoyo",
		"Boletos de tren y entradas",
		"Vuelos nacionales",
		"Eventos climáticos y advertencias"
	],
	servicios: [
		"Tours accesibles",
		"Itinerarios personalizados",
		"Servicios de transporte",
		"Alojamientos accesibles",
		"Consultoría de viajes"
	],
	header: {
		"Home": "Inicio",
		"AllToursPeru": "Todos los Tours Perú",
		"GroupTours": "Tours en Grupo",
		"Blog": "Blog",
		"AboutUs": "Sobre Nosotros",
		"children": {
			"ContactUs": "Contáctanos",
			"TermsAndConditions": "Términos y condiciones",
			"AboutUs": "Sobre Nosotros"
		}
	},
	detalles: [
		"Habitación doble.",
		"Tours accesibles diseñados con experiencia para un viaje sin contratiempos y la mejor experiencia del visitante.",
		"Todos los servicios incluidos en la oferta (tours, equipamiento).",
		"Guías turísticos locales bilingües (español / inglés).",
		"Personal de apoyo disponible en todo momento y una enfermera calificada para asistencia de primeros auxilios.",
		"Entradas y acceso a Machu Picchu + boletos de tren de ida y vuelta.",
		"Incluye todos los vuelos nacionales de ida y vuelta dentro del Perú.",
		"Tal vez... disfrutes de fuertes lluvias durante el tour."
	],
	heroGroupUltimaOportunidad: "¡Última oportunidad!",
	heroGroupCierraEn: "El evento cierra en:",
	heroGroupTiempoLimitado: "Tiempo limitado",
	heroGroupDisponibleHasta: "Disponible hasta:",
	heroGroupPreparado: "Reserva ahora y prepárate para la experiencia con un 10% de descuento.",
	heroGroupComienzaEn: "Comienza en:",
	heroGroupNoTeLoPierdas: "¡No te lo pierdas!",
	heroGroupFinalizaEn: "Finaliza en:",
	heroGroupCuentaRegresiva: "Cuenta regresiva activa",
	heroGroupTerminaPronto: "Termina pronto:",
	heroGroupAgotado: "Agotado",
	heroGroupTodosAgotados: "Este tour está agotado",
	heroGroupSigueRevisando: "Próximas fechas disponibles pronto",
	heroGroupTodosAgotadosHero: "Todos los tours grupales están agotados",
	heroGroupSigueRevisandoHero: "¡No te preocupes! Revisa nuestros tours individuales o contáctanos para experiencias personalizadas. ¡Nuevas fechas pronto!",
	whatsappCtaDefaultTitle: "Contáctanos por WhatsApp",
	whatsappCtaDefaultMessage: "Obtén respuestas instantáneas a tus preguntas",
	whatsappCtaDefaultButton: "Chatea con nosotros",
	whatsappCtaUrgentTitle: "¿Necesitas ayuda ahora?",
	whatsappCtaUrgentMessage: "Nuestro equipo está listo para asistirte inmediatamente",
	whatsappCtaUrgentButton: "Contáctanos ahora",
	whatsappCtaBookingTitle: "¿Listo para reservar?",
	whatsappCtaBookingMessage: "Déjanos ayudarte a planificar tu viaje perfecto",
	whatsappCtaBookingButton: "Reserva por WhatsApp",
	whatsappCtaEmailButton: "Envíame un correo",
	heroGroupEventoHoy: "¡Es hoy!",
	heroGroupQuedaPoco: "Queda poco tiempo:",
	titleDinamico: "TOUR, VIAJES Y CAMPAMENTO DE AVENTURA",
	subtitleDinamico: "¡Bienvenido a Accessible Travel Peru! Somos una agencia de viajes especializada en turismo accesible, confiable y profesional. Ofrecemos experiencias únicas por Perú.",
	botonDinamico1: "Tour en Grupo",
	botonDinamico2: "Sobre Nosotros",
	cantidadClientesHeroHome: "Más de 5,000 clientes en todo el mundo",
	aniosExperienciaHeroHome: "10 años de experiencia",
	subtituloHeroHome: "Descubre Perú sin límites",
	tituloHeroHome: "Una gran aventura te espera. Viajar es un derecho, no un privilegio.",
	itemsHeroHome: [{
		"tituloHeroHome": "Viajes accesibles a medida",
		"textoHeroHome": "Creamos itinerarios personalizados según tus intereses, necesidades y ritmo—porque el verdadero lujo es elegir cómo vivir tu aventura."
	}, {
		"tituloHeroHome": "Guías confiables y comprometidos",
		"textoHeroHome": "Viaja con profesionales apasionados por la inclusión y listos para apoyarte en cada paso del camino."
	}],
	botonHeroHome: "CONOCE MÁS SOBRE NOSOTROS",
	autorHeroHome: {
		"nombreHeroHome": "Francisco",
		"cargoHeroHome": "CEO y Fundador",
		"mensajeHeroHome": "Explora destinos hermosos y sin barreras en todo el Perú."
	},
	servicesActividades: [
		{
			"title": "Traslados desde el aeropuerto",
			"icon": "carrito",
			"link": "#",
			"activo": true
		},
		{
			"title": "Excursiones de día completo",
			"icon": "guia",
			"link": "#"
		},
		{
			"title": "Excursiones de varios días",
			"icon": "montanas",
			"link": "#"
		},
		{
			"title": "Viajes a medida",
			"icon": "corbata",
			"link": "#"
		},
		{
			"title": "Tours fuera de ruta",
			"icon": "4x4",
			"link": "#"
		}
	],
	tituloActividades: "Servicios",
	tituloRecomendado: "Destinos Recomendados",
	tituloMiembros: "Orgullosos miembros de",
	tituloPublicaciones: "Nuevas publicaciones",
	subtituloPublicaciones: "Explora el mundo",
	tituloComentarios: "¿Qué dice nuestro pasajero?",
	subtituloComentarios: "Explora el mundo",
	descripcionAccessible: "Accessible Travel Peru es una agencia de viajes especializada en turismo inclusivo para personas con discapacidad, que conecta la aventura con la accesibilidad en todo el Perú.",
	botonModal: "Contactanos",
	footerServicios: "Nuestros Servicios",
	footerSocios: "Nuestros Socios",
	footerRedes: "Conéctese con nosotros",
	contactoDireccion: "Línea de dirección",
	contactoNumero: "Número de teléfono",
	contactoCorreo: "Dirección de correo",
	formularioTitulo: "Rellene el formulario",
	formDescripcion: "¡No dude en comunicarse con nosotros en Accessible Travel Perú para cualquier consulta o para comenzar a planificar su aventura accesible en Perú! Nuestro equipo dedicado está aquí para ayudarlo en cada paso del camino.",
	formularioDescripcion: "Tu dirección de correo electrónico no será publicada. Los campos obligatorios están marcados con *",
	formularioNombre: "Te llamas*",
	formularioCorreo: "Dirección de correo electrónico *",
	formularioMensaje: "Ingrese su mensaje aquí",
	formularioBoton: "Pongase en contacto",
	cardDestinoBoton: "Leer mas",
	cardDestinoRecomendado: "Recomendado",
	infoBotonDescripcion: "Descripcion",
	infoBotonPlanificacion: "Planificacion de Tour",
	infoRecomendado: "Recomendado",
	infoReseñas: "Reseñas",
	infoHuespedes: "Máx. Personas",
	infoDias: "Dias",
	infoTravelDay: "Dia",
	infoDescripcion: "Descripcion",
	infoIncluye: "Incluye",
	infoNoIncluye: "No Incluye",
	infoPaquetes: "Paquetes disponibles",
	infoComplementos: "Complementos disponibles",
	infoPrecio: "Precio",
	infoDeposito: "Depósito",
	infoReserva: "Reserva ahora",
	asideTotal: "Total",
	asideProceso: "Verifica el itinerario en WeTravel",
	asideDescripcionProceso: "Serás dirigido a WeTravel, una plataforma segura donde podrás consultar tu itinerario.",
	asideConfianza: "Reserva con confianza",
	asideList: {
		"atencionCliente": "Atención al cliente disponible 24/7",
		"seleccionActividades": "Tours y actividades seleccionados cuidadosamente",
		"seguroIncluido": "Seguro de viaje gratuito incluido",
		"garantiaPrecio": "Garantía de mejor precio sin complicaciones"
	},
	asidePago: "Puedes pagar con",
	asideBlogSub: "Agencia de Viajes Inclusiva",
	asideBlogDescripcion: "Especializados en turismo accesible para personas con discapacidad. Conectamos aventura y accesibilidad en todo el Perú.",
	opcionLenguaje: "Selecciona Lenguaje",
	aboutTitle: "Viajes Accesibles Perú",
	aboutSubtitle: "Tu puerta a aventuras inclusivas",
	aboutDescription: "Bienvenido a Viajes Accesibles Perú, tu especialista de confianza en turismo accesible. Nuestro equipo dedicado está comprometido con hacer que las maravillas del Perú sean accesibles para todos, ofreciendo tours personalizados y servicios adaptados a las necesidades individuales. Con años de experiencia y una pasión por la inclusión, garantizamos que los sueños de cada viajero se hagan realidad.",
	aboutTagline: "Vive el Perú sin barreras: donde cada viaje es accesible, inclusivo e inolvidable.",
	heroGroupDescuento: "10",
	heroGroupDescripcion: "Descubre grandes ofertas accesibles en todo el Perú",
	heroGroupUrgencia: "¡Apresúrate!",
	heroGroupTerminaEn: "La oferta termina en:",
	heroGroupUnidades: [
		"DÍAS",
		"HORAS",
		"MINUTOS",
		"SEGUNDOS"
	],
	heroGroupIncluyeTitulo: "¿Qué incluye?",
	aboutCantidadClientes: "2,000+ Clientes en todo el mundo",
	aboutAniosExperiencia: "10 Años de experiencia",
	shared: "Comparte por",
	toastCopiado: "¡Enlace copiado!",
	toastErrorCopiar: "No se pudo copiar",
	toastInstagram: "Enlace copiado. Abrí Instagram y pegalo en tu historia"
};
//#endregion
//#region src/utils/getLocaleData.ts
/**
* Resuelve el JSON de idioma correcto según el locale activo.
* Importa ambos JSON estáticamente y elige con ternario (evita import() dinámico).
*
* @param locale - Astro.currentLocale ("en" | "es" | undefined)
* @returns { lang, lenguaje } - lang es el string del locale, lenguaje es el JSON
*/
function getLocaleData(locale) {
	const lang = locale ?? "en";
	return {
		lang,
		lenguaje: lang === "es" ? es_default : en_default
	};
}
//#endregion
//#region src/components/section/HeroHome.astro
createAstro("https://accessibletravelperu.com");
var $$HeroHome = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeroHome;
	const { currentLocale } = Astro;
	const { lenguaje: lenguajeProp, siteConfig: siteConfigProp } = Astro.props;
	const { lenguaje } = lenguajeProp ? { lenguaje: lenguajeProp } : getLocaleData(currentLocale);
	const siteConfig = siteConfigProp ?? (await getCollection("siteConfig"))[0]?.data;
	const heroVideoUrl = siteConfig?.heroVideoUrl;
	const authorImage = siteConfig?.authorImage;
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-12 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8"><div class="relative w-full items-center justify-center h-[70svh] max-w-4xl max-h-100 flex"><iframe id="youtube-player" class="w-full h-[60svh] max-h-100 lg:max-w-5xl rounded-2xl"${addAttribute(heroVideoUrl, "src")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen${addAttribute(tinaField(siteConfig, "heroVideoUrl"), "data-tina-field")}></iframe></div><div><p class="text-azul-travel font-semibold text-sm mb-2">${lenguaje.subtituloHeroHome}</p><h2 class="text-3xl font-extrabold text-gray-900 leading-tight mb-4">${lenguaje.tituloHeroHome}</h2><div class="grid grid-cols-2 gap-4 mb-4">${lenguaje.itemsHeroHome.map((item) => renderTemplate`<div class="flex flex-col  items-start gap-3"><h4 class="text-base font-semibold text-gray-800">${item.tituloHeroHome}</h4><p class="text-sm text-gray-600">${item.textoHeroHome}</p></div>`)}</div><div class="flex justify-between items-center gap-4"><a${addAttribute(`/${currentLocale}/aboutUs`, "href")} class="bg-azul-travel text-center hover:scale-105 active:scale-105 duration-300 text-balance w-50 text-white px-5 py-3 rounded-full font-semibold text-sm shadow hover:bg-azul-travel-hover">${lenguaje.botonHeroHome}</a><div class="flex items-center gap-4"><img${addAttribute(authorImage, "src")}${addAttribute(lenguaje.autorHeroHome.nombreHeroHome, "alt")} class="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async"${addAttribute(tinaField(siteConfig, "authorImage"), "data-tina-field")}><div><p class="font-semibold text-gray-800 text-sm">${lenguaje.autorHeroHome.nombreHeroHome}</p><p class="text-xs text-azul-travel">${lenguaje.autorHeroHome.cargoHeroHome}</p><p class="text-xs text-gray-500 italic">${lenguaje.autorHeroHome.mensajeHeroHome}</p></div></div></div></div></section>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/HeroHome.astro", void 0);
//#endregion
//#region src/components/svg/FlechaCorta.astro
createAstro("https://accessibletravelperu.com");
var $$FlechaCorta = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FlechaCorta;
	const { style } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`h-4 w-4 ${style}`, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/FlechaCorta.astro", void 0);
//#endregion
//#region src/components/section/PortadaDinamica.astro
createAstro("https://accessibletravelperu.com");
var $$PortadaDinamica = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PortadaDinamica;
	const { banners: bannersProp, bannersData } = Astro.props;
	const banners = bannersProp ?? bannersData?.banners?.map((b) => ({
		src: b.src,
		alt: b.alt?.es ?? b.alt?.en ?? "",
		title: b.title?.es ?? b.title?.en ?? ""
	})) ?? [];
	return renderTemplate`${renderComponent($$result, "slider-portada", "slider-portada", { "class": "block bg-white relative mx-auto w-full h-[50svh] sm:h-[60svh] md:h-[70svh] min-h-100 max-h-150 overflow-hidden group" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<button id="prev-btn" class="absolute active:scale-95 hover:scale-105 duration-300 left-1 top-1/2 -translate-y-1/2 z-20 bg-white/30 rounded-full p-2 shadow hover:bg-white active:bg-white transition" aria-label="Previous banner">${renderComponent($$result, "FlechaCorta", $$FlechaCorta, { "style": "rotate-90" })}</button><div class="relative w-full h-full" id="slider-container">${banners.map((banner, index) => renderTemplate`<div${addAttribute(`banner-slide absolute inset-0 transition-opacity duration-700 ease-in-out ${index === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`, "class")}${addAttribute(index, "data-index")}><div class="absolute inset-0 flex justify-start items-center bg-black/20 px-12 z-10"><h1 class="max-w-xs sm:max-w-sm text-4xl sm:text-5xl transition-all duration-500 md:text-5xl lg:text-6xl lg:max-w-xl font-bold text-white drop-shadow-lg"${addAttribute(bannersData?.banners?.[index] ? tinaField(bannersData.banners[index], "title") : void 0, "data-tina-field")}>${banner.title}</h1></div><img${addAttribute(banner.src, "src")}${addAttribute(banner.alt, "alt")} class="w-full h-full object-cover"${addAttribute(index === 0 ? "eager" : "lazy", "loading")}${addAttribute(index === 0 ? "high" : "auto", "fetchpriority")}${addAttribute(bannersData?.banners?.[index] ? tinaField(bannersData.banners[index], "src") : void 0, "data-tina-field")}></div>`)}</div><button id="next-btn" class="absolute active:scale-95 hover:scale-105 duration-300 right-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 text-center rounded-full p-2 shadow hover:bg-white active:bg-white transition" aria-label="Next banner">${renderComponent($$result, "FlechaCorta", $$FlechaCorta, { "style": "-rotate-90" })}</button>` })}${renderScript($$result, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/PortadaDinamica.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/PortadaDinamica.astro", void 0);
//#endregion
//#region src/components/svg/Clip.astro
createAstro("https://accessibletravelperu.com");
var $$Clip = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Clip;
	const { style } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(style, "class")} viewBox="0 0 26 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"></path><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Clip.astro", void 0);
//#endregion
//#region src/components/constructor/HeaderNav.astro
createAstro("https://accessibletravelperu.com");
var $$HeaderNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeaderNav;
	const { data, menuData, currentLocale = "en", style } = Astro.props;
	const visibleItems = data?.filter((item) => item.visible) ?? [];
	const originalItems = menuData?.items ?? [];
	function findOriginal(key) {
		return originalItems.find((oi) => oi.key === key);
	}
	function findOriginalChild(parentKey, childKey) {
		return findOriginal(parentKey)?.children?.find((oc) => oc.key === childKey);
	}
	return renderTemplate`${maybeRenderHead($$result)}<nav id="nav-links"${addAttribute(` w-full translate-x-200 md:translate-x-0  [@media(max-width:767px)]:fixed top-14 md:top-24 lg:top-0 right-0 justify-center items-center  ${style}  md:flex `, "class")}><ul id="menu-principal" class="flex flex-col border-b sm:border-b-0 border-gray-300 py-4 md:py-1 md:flex-row px-4 mx-auto bg-white justify-center gap-8 md:gap-2 lg:gap-8 text-sm text-gray-700">${visibleItems.map((item) => {
		const original = findOriginal(item.key);
		return item.children ? renderTemplate`<li class="group relative">${item.label !== "Tour Destination" ? renderTemplate`<div class="escuchar flex"><button class="hover:text-blue-600"${addAttribute(tinaField(original, `labels.${currentLocale}`), "data-tina-field")}>${item.label}</button><button class="p-1 md:p-0 items-center -rotate-90 hover:text-blue-600 focus focus:rotate-0">${renderComponent($$result, "FlechaCorta", $$FlechaCorta, {})}</button></div>` : renderTemplate`<div class="escuchar flex"><a class="hover:text-blue-600"${addAttribute(`/${currentLocale}${item.href}`, "href")}${addAttribute(`LinkPage ${item.href}`, "title")}${addAttribute(tinaField(original, `labels.${currentLocale}`), "data-tina-field")}>${item.label}</a><button class="p-1 md:p-0 border-0 -rotate-90 hover:text-blue-600 focus focus:rotate-0">${renderComponent($$result, "FlechaCorta", $$FlechaCorta, {})}</button></div>`}<ul class="md:absolute mt-0.5 duration-300 left-0 md:w-50 hidden group-focus:block group-hover:block bg-white shadow-lg border rounded z-10">${item.children.filter((child) => child.visible).map((child) => {
			const originalChild = findOriginalChild(item.key, child.key);
			return renderTemplate`<li><a${addAttribute(`/${currentLocale}${child.href}`, "href")} class="block px-4 py-2 hover:bg-gray-100"${addAttribute(`LinkPage ${child.href}`, "title")}${addAttribute(tinaField(originalChild, `labels.${currentLocale}`), "data-tina-field")}>${child.label}</a></li>`;
		})}</ul></li>` : renderTemplate`<li><a${addAttribute(`/${currentLocale}${item.href}`, "href")} class="hover:text-blue-600"${addAttribute(`LinkPage ${item.href}`, "title")}${addAttribute(tinaField(original, `labels.${currentLocale}`), "data-tina-field")}>${item.label}</a></li>`;
	})}</ul></nav>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/constructor/HeaderNav.astro", void 0);
//#endregion
//#region src/components/svg/Earth.astro
createAstro("https://accessibletravelperu.com");
var $$Earth = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Earth;
	const { style } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${addAttribute(style, "class")}><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path><circle cx="12" cy="12" r="10"></circle></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Earth.astro", void 0);
//#endregion
//#region src/components/svg/Tiktok.astro
createAstro("https://accessibletravelperu.com");
var $$Tiktok = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tiktok;
	const { style } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg fill="none" width="24" height="24" stroke="currentColor"${addAttribute(`${style}  `, "class")} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>tiktok</title><path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Tiktok.astro", void 0);
//#endregion
//#region src/components/svg/Youtube.astro
createAstro("https://accessibletravelperu.com");
var $$Youtube = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Youtube;
	const { style } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`${style} `, "class")} stroke="currentColor" width="24" height="24" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>youtube</title><path d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.070 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.070-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Youtube.astro", void 0);
//#endregion
//#region src/components/Header.astro
createAstro("https://accessibletravelperu.com");
var $$Header = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const { lenguaje: lenguajeProp, siteConfig: siteConfigProp, menuData: menuDataProp } = Astro.props;
	const { lenguaje, lang: currentLocale } = lenguajeProp ? {
		lenguaje: lenguajeProp,
		lang: Astro.currentLocale ?? "en"
	} : getLocaleData(Astro.currentLocale);
	const empresaInfo = siteConfigProp ?? (await getCollection("siteConfig"))[0]?.data;
	const currentPath = Astro.url.pathname.replace(/^\/[a-z]{2}(\/)?/, "/");
	const menuData = menuDataProp ?? (await getCollection("headerMenu"))[0]?.data;
	const headerMenuItems = menuData?.items?.filter((item) => item.visible).map((item) => ({
		...item,
		label: item.labels[currentLocale],
		children: item.children?.filter((child) => child.visible).map((child) => ({
			...child,
			label: child.labels[currentLocale]
		}))
	})) || [];
	return renderTemplate`${maybeRenderHead($$result)}<header class="bg-white fixed flex flex-col z-30 md:h-23 w-full shadow-md"><section class="hidden md:flex w-full h-8 bg-gray-200 text-gray-700 text-xs"><div class="max-w-7xl mx-auto w-full px-4 flex justify-between items-center"><!-- Información de contacto --><ul class="flex items-center space-x-4"><li class="flex items-center"><svg class="w-3 h-3 mr-1 text-azul-travel" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><a${addAttribute(`mailto:${empresaInfo.correo}`, "href")} class="hover:text-azul-travel"${addAttribute(tinaField(empresaInfo, "correo"), "data-tina-field")}>${empresaInfo.correo}</a></li>${empresaInfo.telefonos.map((telefono, index) => renderTemplate`<li class="flex items-center"><svg class="w-3 h-3 mr-1 text-azul-travel" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><a${addAttribute(`${telefono.url}`, "href")} target="_blank" rel="noopener noreferrer" class="hover:text-azul-travel"${addAttribute(tinaField(empresaInfo, `telefonos.${index}.numero`), "data-tina-field")}>${telefono.numero} ${telefono.pais}</a></li>`)}<li class="flex items-center"><svg class="w-3 h-3 mr-1 text-azul-travel" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><a${addAttribute(`${empresaInfo.direccionHeader.url}`, "href")} target="_blank" rel="noopener noreferrer" class="hover:text-azul-travel"${addAttribute(tinaField(empresaInfo, "direccionHeader.texto"), "data-tina-field")}>${empresaInfo.direccionHeader.texto} ${empresaInfo.direccionHeader.pais}</a></li></ul><!-- Redes sociales --><div class="flex items-center text-black space-x-3">${empresaInfo.redes.map((red, index) => renderTemplate`<a target="_blank"${addAttribute(red.url, "href")} class="flex items-center relative hover:text-azul-travel transition-colors"${addAttribute(tinaField(empresaInfo, `redes.${index}.url`), "data-tina-field")}>${red.icono === "facebook" && renderTemplate`<svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"></path></svg>`}${red.icono === "tiktok" && renderTemplate`${renderComponent($$result, "Tiktok", $$Tiktok, { "style": "w-4 h-4 hover:fill-azul-travel fill-black" })}`}${red.icono === "youtube" && renderTemplate`${renderComponent($$result, "Youtube", $$Youtube, { "style": "w-4 h-4 hover:fill-azul-travel fill-black" })}`}${red.icono === "instagram" && renderTemplate`<svg class=" w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>`}${red.icono === "whatsapp" && renderTemplate`<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg><span class="absolute -top-2 -right-1.5">${red.pais}</span>`}</a>`)}</div></div></section><div class="flex justify-between h-15 w-full"><a${addAttribute(`/${currentLocale}/`, "href")} class="flex ml-4 py-2 items-center"><img src="/images/logos/LOGOATPsinfondo.webp" alt="Logo" class="h-auto w-38 md:w-32" loading="lazy" decoding="async"></a><!-- Contenedor central --><div class="flex w-full items-center justify-around"><!-- Navegación -->${renderComponent($$result, "HeaderNav", $$HeaderNav, {
		"data": headerMenuItems,
		"menuData": menuData,
		"currentLocale": currentLocale,
		"style": " "
	})}<!-- Idioma --><div class="flex items-center gap-1 mx-1">${renderComponent($$result, "Earth", $$Earth, { "style": "w-5 h-5" })}<select id="language" name="language" class="appearance-none border px-4 py-1 border-gray-300 rounded text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500" onchange="window.location.href = this.value"><option${addAttribute(`/en${currentPath}`, "value")}${addAttribute(currentLocale === "en", "selected")}>English</option><option${addAttribute(`/es${currentPath}`, "value")}${addAttribute(currentLocale === "es", "selected")}>Español</option></select></div><button id="openMenu" class="md:hidden flex items-center justify-center w-10 h-10 bg-gray-200 rounded hover:bg-gray-300 transition"><svg class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"></path></svg></button></div><!-- Cuadro azul --><div id="openModalBtn" class="bg-blue-600 w-20 h-full overflow-hidden justify-center flex items-center cursor-pointer text-white">${renderComponent($$result, "Clip", $$Clip, { "style": " w-10   h-10 text-center -rotate-45 animate-bounce " })}</div></div></header><script>
  function initHeader() {
    const navLinks = document.getElementById("nav-links");
    const openMenuBtn = document.getElementById("openMenu");
    const menu = document.getElementById("menu-principal");

    if (!navLinks || !openMenuBtn || !menu) return;

    // Remover listeners anteriores
    openMenuBtn.removeEventListener("click", handleOpenMenu);
    menu.removeEventListener("click", handleSubMenu);
    document.removeEventListener("click", handleOutsideClick);

    // Agregar nuevos listeners
    openMenuBtn.addEventListener("click", handleOpenMenu);
    menu.addEventListener("click", handleSubMenu);
    document.addEventListener("click", handleOutsideClick);
  }

  function handleOpenMenu(e) {
    e.stopPropagation();
    const navLinks = document.getElementById("nav-links");
    navLinks?.classList.toggle("translate-x-200");
  }

  function handleSubMenu(e) {
    const btn = e.target.closest(".escuchar");
    if (!btn) return;

    e.stopPropagation();
    const subMenu = btn.nextElementSibling;
    const menu = document.getElementById("menu-principal");

    // Cierra todos los submenús visibles
    menu?.querySelectorAll(".escuchar + ul").forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("flex-col");
    });

    // Abre solo el submenú actual
    if (subMenu && !subMenu.classList.contains("flex-col")) {
      subMenu.classList.remove("hidden");
      subMenu.classList.add("flex-col");
    }
  }

  function handleOutsideClick(e) {
    const navLinks = document.getElementById("nav-links");
    const openMenuBtn = document.getElementById("openMenu");
    const menu = document.getElementById("menu-principal");

    const isOutsideNav = !navLinks?.contains(e.target);
    const isOutsideButton = !openMenuBtn?.contains(e.target);
    const isOutsideMenu = !menu?.contains(e.target);

    // Cerrar menú móvil si está abierto
    if (
      isOutsideNav &&
      isOutsideButton &&
      !navLinks?.classList.contains("translate-x-200")
    ) {
      navLinks?.classList.add("translate-x-200");
    }

    // Cerrar submenús si se hace clic fuera
    if (isOutsideMenu) {
      menu?.querySelectorAll(".escuchar + ul").forEach((el) => {
        el.classList.add("hidden");
        el.classList.remove("flex-col");
      });
    }
  }

  // Inicializar
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeader);
  } else {
    initHeader();
  }

  // Re-inicializar cuando TinaCMS actualice el DOM
  const headerObserver = new MutationObserver(() => {
    initHeader();
  });
  headerObserver.observe(document.body, { childList: true, subtree: true });
<\/script>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Header.astro", void 0);
//#endregion
//#region src/components/svg/EmailIcon.astro
createAstro("https://accessibletravelperu.com");
var $$EmailIcon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmailIcon;
	const { class: className = "", height = "24", width = "24" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(className, "class")}${addAttribute(height, "height")}${addAttribute(width, "width")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/EmailIcon.astro", void 0);
//#endregion
//#region src/components/svg/PhoneIcon.astro
createAstro("https://accessibletravelperu.com");
var $$PhoneIcon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PhoneIcon;
	const { class: className = "", height = "24", width = "24" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(className, "class")}${addAttribute(height, "height")}${addAttribute(width, "width")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/PhoneIcon.astro", void 0);
//#endregion
//#region src/components/svg/LocationIcon.astro
createAstro("https://accessibletravelperu.com");
var $$LocationIcon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LocationIcon;
	const { class: className = "w-5", height = "24", width = "24" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(className, "class")}${addAttribute(height, "height")}${addAttribute(width, "width")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/LocationIcon.astro", void 0);
//#endregion
//#region src/components/ui/FooterSection.astro
createAstro("https://accessibletravelperu.com");
var $$FooterSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FooterSection;
	const { title, listClass = "space-y-2 text-sm" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section><h3 class="font-semibold text-lg mb-4">${title}</h3><ul${addAttribute(listClass, "class")}>${renderSlot($$result, $$slots["default"])}</ul></section>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/FooterSection.astro", void 0);
//#endregion
//#region src/components/Footer.astro
createAstro("https://accessibletravelperu.com");
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const { lenguaje: lenguajeProp, siteConfig: siteConfigProp, galleryLogosData: galleryLogosProp } = Astro.props;
	const { lenguaje } = lenguajeProp ? { lenguaje: lenguajeProp } : getLocaleData(Astro.currentLocale);
	const footerLegal = { copyright: `Copyright © ${(/* @__PURE__ */ new Date()).getFullYear()} by Accessible Travel Peru. All Rights Reserved` };
	const empresaInfo = siteConfigProp ?? (await getEntry("siteConfig", "site")).data;
	const galleryLogos = galleryLogosProp?.galleryLogos ?? (await getEntry("galleryLogos", "gallery-logos")).data.galleryLogos;
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-[url('/images/footers.webp')] relative sm:bg-no-repeat bg-current sm:bg-cover w-full text-white py-12 px-6"><div class="absolute inset-0 bg-blue-950/80"></div><div class="max-w-7xl z-10 relative mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"><!-- Logo + Descripción + Contacto --><section><img src="/images/logos/LOGOCIRCULO.webp" title="Logo Accesible travel"${addAttribute(empresaInfo.nombre, "alt")} loading="lazy" decoding="async" class="w-full mx-auto rounded-full max-w-[150px] h-auto mb-4"${spreadAttributes(tinaField(empresaInfo, "nombre"))}><p class="text-sm mb-4">${lenguaje.descripcionAccessible}</p><ul class="text-sm space-y-2"><li class="flex items-center gap-2">${renderComponent($$result, "EmailIcon", $$EmailIcon, { "class": "text-azul-travel min-w-6" })}<a${addAttribute(`mailto:${empresaInfo.correo}`, "href")} class="hover:text-azul-travel font-semibold text-gray-300"${addAttribute(tinaField(empresaInfo, "correo"), "data-tina-field")}>${empresaInfo.correo}</a></li>${empresaInfo.telefonos.map((telefono, index) => renderTemplate`<li class="flex items-center gap-2"${addAttribute(tinaField(empresaInfo, `telefonos.${index}.numero`), "data-tina-field")}>${renderComponent($$result, "PhoneIcon", $$PhoneIcon, { "class": "text-azul-travel" })}<a${addAttribute(telefono.url, "href")} target="_blank" rel="noopener noreferrer" class="hover:text-azul-travel font-semibold text-gray-300"${addAttribute(tinaField(empresaInfo, `telefonos.${index}.url`), "data-tina-field")}>${telefono.numero} ${telefono.pais}</a></li>`)}<li class="flex items-center gap-2">${renderComponent($$result, "LocationIcon", $$LocationIcon, { "class": "text-azul-travel mt-1 flex-shrink-0" })}<span class="font-semibold text-gray-300"${addAttribute(tinaField(empresaInfo, "direccion"), "data-tina-field")}>${empresaInfo.direccion}</span></li></ul></section><!-- Servicios -->${renderComponent($$result, "FooterSection", $$FooterSection, { "title": lenguaje.footerServicios }, { "default": ($$result) => renderTemplate`${lenguaje.servicios.map((item) => renderTemplate`<li><p class="font-semibold text-gray-300">${item}</p></li>`)}` })}<!-- Galería de logos --><section><h3 class="font-semibold text-lg mb-4">${lenguaje.footerSocios}</h3><div class="grid grid-cols-2 gap-2">${galleryLogos.map((logo) => renderTemplate`<img${addAttribute(logo.src, "src")}${addAttribute(logo.alt, "alt")}${addAttribute(logo.alt, "title")} loading="lazy" decoding="async" class="w-full filter duration-300 grayscale hover:grayscale-0 hover:scale-105 h-auto md:h-20 object-contain bg-white p-2 rounded">`)}</div></section><!-- Redes sociales -->${renderComponent($$result, "FooterSection", $$FooterSection, {
		"title": lenguaje.footerRedes,
		"listClass": "space-y-3 text-sm"
	}, { "default": ($$result) => renderTemplate`${empresaInfo.redes.map((red, index) => renderTemplate`<li class="flex items-center gap-2"${addAttribute(tinaField(empresaInfo, `redes.${index}.url`), "data-tina-field")}>${red.icono === "facebook" && renderTemplate`<svg class="text-azul-travel w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>`}${red.icono === "tiktok" && renderTemplate`${renderComponent($$result, "Tiktok", $$Tiktok, { "style": "w-5 h-5 fill-azul-travel text-azul-travel" })}`}${red.icono === "youtube" && renderTemplate`${renderComponent($$result, "Youtube", $$Youtube, { "style": "w-5 h-5 fill-azul-travel text-azul-travel" })}`}${red.icono === "instagram" && renderTemplate`<svg class="text-azul-travel w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>`}${red.icono === "whatsapp" && renderTemplate`<svg class="text-azul-travel w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`}<a${addAttribute(red.url, "href")} title="red social" target="_blank" class="hover:text-azul-travel break-all font-semibold text-gray-300"${addAttribute(tinaField(empresaInfo, `redes.${index}.url`), "data-tina-field")}>${red.handle}</a></li>`)}` })}</div><!-- Footer inferior --><div class="border-t relative z-10 border-gray-700 pt-6 flex flex-col justify-between items-center text-sm text-gray-400"><p class="mx-auto">${footerLegal.copyright}</p><p class="">Desarrollado por<a href="https://wa.me/51924932128?text=Hola,%20quiero%20más%20información" target="_blank" rel="noopener noreferrer" class="hover:text-azul-travel hover:underline">Pedro Alejandro</a></p></div></footer>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/Footer.astro", void 0);
//#endregion
//#region src/components/constructor/Acordeon.astro
createAstro("https://accessibletravelperu.com");
var $$Acordeon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Acordeon;
	const { data, lenguaje } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="max-w-xs py-12  md:max-w-3xl mx-auto md:px-4 "><div class="space-y-4" id="acordeon">${data.itinerary.map((dias, index) => renderTemplate`<details class=" w-200 relative max-w-xs sm:max-w-md md:max-w-xl lg:max-w-md xl:max-w-2xl rounded group"${addAttribute(index, "data-acordeon")}><summary class="cursor-pointer gap-2 md:gap-8 delay-300 duration-300 select-none   bg-white hover:bg-gray-200 flex  items-center"><span class="z-1 max-w-14 min-w-14 font-semibold text-center py-3 text-white text-2xl bg-azul-travel p-4"${addAttribute(tinaField(dias, "day"), "data-tina-field")}>${index + 1}</span><h2 class="font-semibold  text-black text-lg"${addAttribute(tinaField(dias, "title"), "data-tina-field")}>${`${dias.time ? " " : lenguaje.infoTravelDay} ${dias.time ?? dias.day}: ${dias.title}`}</h2></summary><div class="absolute bottom-0 left-7 border-l-2 border-dashed border-qillary-aqua h-full w-1"></div><div class=" pl-10 pr-4  py-4 space-y-3 text-gray-700"><p class=""${addAttribute(tinaField(dias, "description"), "data-tina-field")}>${dias.description}</p></div></details>`)}</div></section><script>
  document.addEventListener("DOMContentLoaded", () => {
    const acordeon = document.getElementById("acordeon");
    const items = acordeon.querySelectorAll("details");

    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item) {
              other.removeAttribute("open");
            }
          });
        }
      });
    });
  });
<\/script>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/constructor/Acordeon.astro", void 0);
//#endregion
//#region src/components/section/Certificaciones.astro
createAstro("https://accessibletravelperu.com");
var $$Certificaciones = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Certificaciones;
	const { galleryLogosData: galleryLogosDataProp, bandera, base, style } = Astro.props;
	let galleryLogosData = galleryLogosDataProp;
	if (!galleryLogosData) try {
		galleryLogosData = (await getEntry("galleryLogos", "gallery-logos"))?.data;
	} catch {
		galleryLogosData = {};
	}
	const images = galleryLogosData?.galleryLogos ?? [];
	let defaultCols = "grid-cols-3";
	if (images.length <= 2) defaultCols = "grid-cols-2";
	else if (images.length <= 4) defaultCols = "grid-cols-4";
	else if (images.length <= 6) defaultCols = "grid-cols-5";
	else if (images.length <= 6) defaultCols = "grid-cols-6";
	else defaultCols = "grid-cols-7";
	const styles = `grid ${defaultCols} px-4 py-4 gap-6`;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(` py-6 bg-white ${base} `, "class")}><div${addAttribute(`${styles}  ${style}    place-items-center `, "class")}>${images.map((img, index) => renderTemplate`<img${addAttribute(img.src, "src")}${addAttribute(img.alt, "alt")}${addAttribute(img.alt, "title")}${addAttribute(`w-full xl:w-30 h-auto ${bandera ? "max-w-35" : ""}  hover:scale-105 duration-300 filter grayscale hover:filter-none object-cover group-hover:opacity-90 transition`, "class")} loading="lazy" decoding="async"${addAttribute(tinaField(galleryLogosData, `galleryLogos.${index}.src`), "data-tina-field")}>`)}</div></section>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Certificaciones.astro", void 0);
//#endregion
//#region src/components/section/Pago.astro
createAstro("https://accessibletravelperu.com");
var $$Pago = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pago;
	const { paymentLogosData: paymentLogosDataProp, style = "grid grid-cols-4 px-4 py-4 gap-6", base } = Astro.props;
	let paymentLogosData = paymentLogosDataProp;
	if (!paymentLogosData) try {
		paymentLogosData = (await getCollection("banners"))[0]?.data?.paymentLogos ?? [];
	} catch {
		paymentLogosData = [];
	}
	const paymentLogos = paymentLogosData ?? [];
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(` py-6 bg-white ${base} `, "class")}><div${addAttribute(`${style}    place-items-center `, "class")}>${paymentLogos.map((img) => renderTemplate`<img${addAttribute(img.src, "src")}${addAttribute(img.alt.en, "alt")}${addAttribute(img.titleLink, "title")} class="w-full xl:w-30 h-auto  object-cover group-hover:opacity-90 transition" loading="lazy" decoding="async">`)}</div></section>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Pago.astro", void 0);
//#endregion
//#region src/components/svg/Whatsapp.astro
createAstro("https://accessibletravelperu.com");
var $$Whatsapp = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Whatsapp;
	const { style, height, width } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`${style}`, "class")}${addAttribute(height, "height")}${addAttribute(width, "width")} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M1023.941 765.153c0 5.606-.171 17.766-.508 27.159-.824 22.982-2.646 52.639-5.401 66.151-4.141 20.306-10.392 39.472-18.542 55.425-9.643 18.871-21.943 35.775-36.559 50.364-14.584 14.56-31.472 26.812-50.315 36.416-16.036 8.172-35.322 14.426-55.744 18.549-13.378 2.701-42.812 4.488-65.648 5.3-9.402.336-21.564.505-27.15.505l-504.226-.081c-5.607 0-17.765-.172-27.158-.509-22.983-.824-52.639-2.646-66.152-5.4-20.306-4.142-39.473-10.392-55.425-18.542-18.872-9.644-35.775-21.944-50.364-36.56-14.56-14.584-26.812-31.471-36.415-50.314-8.174-16.037-14.428-35.323-18.551-55.744-2.7-13.378-4.487-42.812-5.3-65.649-.334-9.401-.503-21.563-.503-27.148l.08-504.228c0-5.607.171-17.766.508-27.159.825-22.983 2.646-52.639 5.401-66.151 4.141-20.306 10.391-39.473 18.542-55.426C34.154 93.24 46.455 76.336 61.07 61.747c14.584-14.559 31.472-26.812 50.315-36.416 16.037-8.172 35.324-14.426 55.745-18.549 13.377-2.701 42.812-4.488 65.648-5.3 9.402-.335 21.565-.504 27.149-.504l504.227.081c5.608 0 17.766.171 27.159.508 22.983.825 52.638 2.646 66.152 5.401 20.305 4.141 39.472 10.391 55.425 18.542 18.871 9.643 35.774 21.944 50.363 36.559 14.559 14.584 26.812 31.471 36.415 50.315 8.174 16.037 14.428 35.323 18.551 55.744 2.7 13.378 4.486 42.812 5.3 65.649.335 9.402.504 21.564.504 27.15l-.082 504.226z"></path></defs><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="512.001" y1=".978" x2="512.001" y2="1025.023"><stop offset="0" stop-color="#61fd7d"></stop><stop offset="1" stop-color="#2bb826"></stop></linearGradient><use xlink:href="#a" overflow="visible" fill="url(#b)"></use><g><path fill="#FFF" d="M783.302 243.246c-69.329-69.387-161.529-107.619-259.763-107.658-202.402 0-367.133 164.668-367.214 367.072-.026 64.699 16.883 127.854 49.017 183.522l-52.096 190.229 194.665-51.047c53.636 29.244 114.022 44.656 175.482 44.682h.151c202.382 0 367.128-164.688 367.21-367.094.039-98.087-38.121-190.319-107.452-259.706zM523.544 808.047h-.125c-54.767-.021-108.483-14.729-155.344-42.529l-11.146-6.612-115.517 30.293 30.834-112.592-7.259-11.544c-30.552-48.579-46.688-104.729-46.664-162.379.066-168.229 136.985-305.096 305.339-305.096 81.521.031 158.154 31.811 215.779 89.482s89.342 134.332 89.312 215.859c-.066 168.243-136.984 305.118-305.209 305.118zm167.415-228.515c-9.177-4.591-54.286-26.782-62.697-29.843-8.41-3.062-14.526-4.592-20.645 4.592-6.115 9.182-23.699 29.843-29.053 35.964-5.352 6.122-10.704 6.888-19.879 2.296-9.176-4.591-38.74-14.277-73.786-45.526-27.275-24.319-45.691-54.359-51.043-63.543-5.352-9.183-.569-14.146 4.024-18.72 4.127-4.109 9.175-10.713 13.763-16.069 4.587-5.355 6.117-9.183 9.175-15.304 3.059-6.122 1.529-11.479-.765-16.07-2.293-4.591-20.644-49.739-28.29-68.104-7.447-17.886-15.013-15.466-20.645-15.747-5.346-.266-11.469-.322-17.585-.322s-16.057 2.295-24.467 11.478-32.113 31.374-32.113 76.521c0 45.147 32.877 88.764 37.465 94.885 4.588 6.122 64.699 98.771 156.741 138.502 21.892 9.45 38.982 15.094 52.308 19.322 21.98 6.979 41.982 5.995 57.793 3.634 17.628-2.633 54.284-22.189 61.932-43.615 7.646-21.427 7.646-39.791 5.352-43.617-2.294-3.826-8.41-6.122-17.585-10.714z"></path></g></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Whatsapp.astro", void 0);
//#endregion
//#region src/components/ui/FormAside.astro
createAstro("https://accessibletravelperu.com");
var $$FormAside = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FormAside;
	const { style = " lg:space-y-3 lg:flex-col", enlaces = " ", lenguaje, siteConfig: siteConfigProp } = Astro.props;
	let siteConfig = siteConfigProp;
	if (!siteConfig) try {
		siteConfig = (await getEntry("siteConfig", "site"))?.data;
	} catch {
		siteConfig = {};
	}
	const empresaInfo = siteConfig || {};
	return renderTemplate`${maybeRenderHead($$result)}<div id="variant-3" class="variant-form col-span-2 border border-gray-200"><div class="bg-white p-5"><div class="mb-6 text-center"><h3 class="text-lg font-semibold text-gray-900 mb-2">${lenguaje.talkAboutTrip}</h3><p class="text-sm text-gray-600 leading-relaxed">${lenguaje.leaveEmail}</p></div><form class="space-y-3 formAside"><div${addAttribute(`${style} gap-3 sm:flex-row  lg:gap-0 flex flex-col `, "class")}><input type="text" id="name" name="name"${addAttribute(lenguaje.whatsYourName, "placeholder")} class="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm input-focus" required><input type="email" id="email" name="email"${addAttribute(lenguaje.enterEmail, "placeholder")} class="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm input-focus" required></div><div><textarea${addAttribute(lenguaje.tripType, "placeholder")} rows="4" id="message" name="message" class="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm input-focus resize-none"></textarea></div><input type="submit"${addAttribute(lenguaje.contactMe, "value")} class="bg-azul-travel btn-submit cursor-pointer submit-btn active:scale-95 duration-300 w-full hover:bg-azul-travel-hover active:bg-azul-travel-hover bg-gray-900 text-white py-3 rounded-sm text-sm font-medium"><p id="form-status" class="text-sm text-green-600 hidden">Message sent successfully!</p></form><div class="pt-2 flex flex-col border-t border-gray-200 mt-4"><p class="text-xs text-gray-500 text-center mb-3">${lenguaje.writeUsDirectly}</p><div${addAttribute(`${enlaces} flex flex-col justify-items-center  sm:flex-row lg:flex-col mx-auto w-42 sm:gap-4 sm:w-full sm:justify-center lg:w-42  justify-start gap-2`, "class")}>${empresaInfo.telefonos.map((tel, index) => renderTemplate`<a${addAttribute(tel.url, "href")} class="flex  items-center justify-start gap-2 text-sm text-gray-800 hover:text-azul-travel-hover">${renderComponent($$result, "Whatsapp", $$Whatsapp, { "style": "w-5" })}WhatsApp ${tel.pais === "🇵🇪" ? "Perú" : "USA"}${" "}<span>${tel.pais}</span></a>`)}</div></div></div></div>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/FormAside.astro", void 0);
//#endregion
//#region src/components/ui/AsideTravel.astro
createAstro("https://accessibletravelperu.com");
var $$AsideTravel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AsideTravel;
	const { data, lenguaje, siteConfig, galleryLogosData, paymentLogosData } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="flex md:sticky md:top-24 flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col w-full h-full gap-4 space-y-4 rounded-2xl py-12 px-4 lg:max-w-xs"><div class="px-4 py-4 max-w-100 mx-auto max-h-45 bg-gray-100 flex flex-col border space-y-2 border-gray-200"><!--  <p class="flex justify-between text-sm">
      {lenguaje.asideTotal} <span class="text-azul-travel text-lg"
        >{data.packages[0].price}</span
      >
    </p> --><!-- href="#wetravel_package_listing" --><a${addAttribute(data.links.book, "href")} target="_blank" class="w-auto text-white text-center px-4 py-2 bg-gray-900 hover:bg-azul-travel active:scale-95 active:bg-azul-travel hover:scale-105 duration-300 rounded-sm"${addAttribute(tinaField(data.links, "book"), "data-tina-field")}>${lenguaje.asideProceso}</a><p class="mt-2 text-sm text-gray-600 text-center" role="note" aria-live="polite">${lenguaje.asideDescripcionProceso}</p></div><section aria-labelledby="confidence-heading" class="booking-confidence hidden md:block lg:hidden p-4 bg-gray-100"><h2 id="confidence-heading " class="py-2 px-4 border-l-4 rounded font-semibold border-azul-travel">${lenguaje.asideConfianza}</h2><ul class="flex flex-col gap-2 list-disc p-4 text-sm text-gray-700" role="list"><li class="flex items-center list-item gap-2"><span>${lenguaje.asideList.atencionCliente}</span></li><li class="flex items-center list-item gap-2"><span>${lenguaje.asideList.seleccionActividades}</span></li><li class="flex items-center list-item gap-2"><span>${lenguaje.asideList.garantiaPrecio}</span></li></ul></section>${renderComponent($$result, "FormAside", $$FormAside, {
		"lenguaje": lenguaje,
		"siteConfig": siteConfig
	})}<section aria-labelledby="confidence-heading" class="booking-confidence md:hidden lg:block p-4 bg-gray-100"><h2 id="confidence-heading " class="py-2 px-4 border-l-4 rounded font-semibold border-azul-travel">${lenguaje.asideConfianza}</h2><ul class="flex flex-col gap-2 list-disc p-4 text-sm text-gray-700" role="list"><li class="flex items-center list-item gap-2"><span>${lenguaje.asideList.atencionCliente}</span></li><li class="flex items-center list-item gap-2"><span>${lenguaje.asideList.seleccionActividades}</span></li><li class="flex items-center list-item gap-2"><span>${lenguaje.asideList.garantiaPrecio}</span></li></ul></section><section class="p-4 col-span-2 lg:col-span-1"><h2 class="font-semibold">${lenguaje.tituloMiembros}</h2>${renderComponent($$result, "Certificaciones", $$Certificaciones, {
		"base": " md:col-span-2 md:px-8 lg:col-span-1",
		"style": "grid lg:grid-cols-2! gap-4",
		"galleryLogosData": galleryLogosData
	})}</section><section class="p-4 col-span-2 lg:col-span-1"><h2 class="font-semibold">${lenguaje.asidePago}</h2>${renderComponent($$result, "Pago", $$Pago, {
		"base": "md:col-span-2 md:px-8 lg:col-span-1",
		"style": "grid grid-cols-4 lg:grid-cols-2 gap-4",
		"paymentLogosData": paymentLogosData
	})}</section></section>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/AsideTravel.astro", void 0);
//#endregion
//#region src/components/section/GaleriaModal.astro
createAstro("https://accessibletravelperu.com");
var $$GaleriaModal = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GaleriaModal;
	const { images } = Astro.props;
	const validImages = images && Array.isArray(images) ? images : [];
	const optimizeUrl = (url, width) => {
		if (!url) return "";
		if (typeof url === "string" && url.includes("filestackapi.com") && url.includes("resize=")) return url.replace(/width:\d+/, `width:${width}`);
		return url;
	};
	return renderTemplate`${validImages.length > 0 && renderTemplate`${renderComponent($$result, "galeria-modal", "galeria-modal", {
		"class": "block w-full",
		...tinaField({ images: validImages }, "images")
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col lg:flex-row gap-4 justify-around w-full">${validImages.slice(0, 4).map((img, index) => {
		let isVisible = true;
		if (validImages.length > 1 && index === 0) isVisible = false;
		let classes = "gallery-image object-cover rounded-xl cursor-pointer hover:opacity-90 transition duration-300 shadow-sm hover:shadow-md ";
		let thumbWidth = 500;
		if (!isVisible) classes += "hidden";
		else if (validImages.length === 1) {
			classes += "w-full h-52 lg:h-[60svh] max-h-100";
			thumbWidth = 800;
		} else if (index === 1) {
			classes += "w-full lg:w-3/7 h-52 lg:h-[60svh] max-h-100 lg:max-w-sm xl:max-w-3/7";
			thumbWidth = 800;
		} else classes += "w-full lg:w-2/7 h-52 lg:h-[60svh] max-h-100 lg:max-w-xs xl:max-w-2/7";
		const originalUrl = img.link || img.src || img;
		const thumbnailUrl = optimizeUrl(originalUrl, thumbWidth);
		return renderTemplate`<img${addAttribute(thumbnailUrl, "src")}${addAttribute(originalUrl, "data-highres")}${addAttribute(img.alt || `Tour image ${index + 1}`, "alt")}${addAttribute(classes, "class")}${addAttribute(index, "data-index")}${addAttribute(tinaField(img, "link"), "data-tina-field")}${addAttribute(index === 0 ? "eager" : "lazy", "loading")}${addAttribute(index === 0 ? "high" : "auto", "fetchpriority")} decoding="async">`;
	})}</div><dialog id="image-modal" class="bg-black/95 backdrop-blur-md fixed inset-0 w-full h-full max-w-none max-h-none m-0 p-0 !z-[99999] opacity-0 transition-opacity duration-300 open:opacity-100 open:flex flex-col justify-center items-center overflow-hidden"><button id="close-modal" class="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-red-400 p-2 z-[60] transition-colors rounded-full bg-white/10 hover:bg-white/20" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><div class="relative w-full h-full flex justify-center items-center px-0 md:px-16" id="modal-content-area"><button id="prev-modal-btn" class="absolute left-2 md:left-8 text-white hover:text-gray-300 p-3 z-[60] transition-transform active:scale-90 rounded-full bg-black/50 hover:bg-black/80" aria-label="Previous image"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><img id="modal-image" src="" alt="Modal Tour Image" class="w-auto max-w-[95vw] h-auto max-h-[90vh] object-contain select-none shadow-2xl rounded-sm transition-transform duration-300 scale-95"><button id="next-modal-btn" class="absolute right-2 md:right-8 text-white hover:text-gray-300 p-3 z-[60] transition-transform active:scale-90 rounded-full bg-black/50 hover:bg-black/80" aria-label="Next image"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button></div><div class="absolute bottom-6 text-white text-sm font-medium tracking-widest bg-black/50 px-4 py-1.5 rounded-full" id="modal-counter">1 / ${validImages.length}</div></dialog>` })}${renderScript($$result, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/GaleriaModal.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/GaleriaModal.astro", void 0);
//#endregion
//#region src/components/svg/Calendario.astro
createAstro("https://accessibletravelperu.com");
var $$Calendario = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Calendario;
	const { style } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${addAttribute(`  ${style}`, "class")}><path d="M16 14v2.2l1.6 1"></path><path d="M16 2v4"></path><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path><path d="M3 10h5"></path><path d="M8 2v4"></path><circle cx="16" cy="16" r="6"></circle></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Calendario.astro", void 0);
//#endregion
//#region src/components/svg/Persona.astro
createAstro("https://accessibletravelperu.com");
var $$Persona = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Persona;
	const { style } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${addAttribute(`  ${style}`, "class")}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Persona.astro", void 0);
//#endregion
//#region src/components/ui/WhatsappCta.astro
createAstro("https://accessibletravelperu.com");
var $$WhatsappCta = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WhatsappCta;
	const { lenguaje, variant = "default", siteConfig: siteConfigProp } = Astro.props;
	let siteConfig = siteConfigProp;
	if (!siteConfig) try {
		siteConfig = (await getEntry("siteConfig", "site"))?.data;
	} catch {
		siteConfig = {};
	}
	const accessibleTravel = siteConfig || {};
	const variants = {
		default: {
			title: lenguaje.whatsappCtaDefaultTitle || "Contact us on WhatsApp",
			message: lenguaje.whatsappCtaDefaultMessage || "Get instant answers to your questions",
			buttonText: lenguaje.whatsappCtaDefaultButton || "Chat with us"
		},
		urgent: {
			title: lenguaje.whatsappCtaUrgentTitle || "Need help now?",
			message: lenguaje.whatsappCtaUrgentMessage || "Our team is ready to assist you immediately",
			buttonText: lenguaje.whatsappCtaUrgentButton || "Contact us now"
		},
		booking: {
			title: lenguaje.whatsappCtaBookingTitle || "Ready to book?",
			message: lenguaje.whatsappCtaBookingMessage || "Let us help you plan your perfect trip",
			buttonText: lenguaje.whatsappCtaBookingButton || "Book via WhatsApp"
		}
	};
	const currentVariant = variants[variant] || variants.default;
	const whatsappContacts = accessibleTravel.contactos.filter((c) => c.tipo === "whatsapp");
	const emailUrl = `mailto:${accessibleTravel.correo}`;
	return renderTemplate`${maybeRenderHead($$result)}<div class="bg-white my-4 border md:mx-4 border-gray-200 rounded-sm px-4 py-4 hover:border-gray-300 transition-colors"><div class="flex items-start gap-3"><div class="w-full grid gris-col-1 md:grid-cols-3 justify-between items-center"><div class="w-full"><h3 class="text-lg flex items-center gap-2 font-medium text-gray-900 mb-1">${renderComponent($$result, "Calendario", $$Calendario, {
		"height": "34",
		"width": "34"
	})}${currentVariant.title}</h3><p class="text-sm pl-8 text-gray-500 mb-4 leading-relaxed">${currentVariant.message}</p></div><div class="col-span-2 grid grid-cols-1 md:grid-cols-2 w-full justify-around items-center gap-2">${whatsappContacts.map((contact) => {
		const url = `https://wa.me/${contact.numero.replace(/\s/g, "").replace("+", "")}?text=${encodeURIComponent(contact.mensaje || "Hello! I'm interested in this tour.")}`;
		return renderTemplate`<a class="flex items-center cursor-pointer select-none active:scale-95 transition-transform duration-500 border border-gray-300 rounded-sm hover:bg-azul-travel text-gray-700 hover:border-transparent hover:text-white px-4 py-2 justify-center flex-wrap gap-2"${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer">${renderComponent($$result, "Whatsapp", $$Whatsapp, {
			"height": "28",
			"width": "28"
		})}${currentVariant.buttonText}<span class="text-3xl">${contact.pais}</span></a>`;
	})}<a class="flex items-center md:col-span-2 cursor-pointer select-none active:scale-95 transition-transform duration-500 border border-gray-300 rounded-sm hover:bg-azul-travel text-gray-700 hover:border-transparent hover:text-white px-4 py-2 justify-center flex-wrap gap-2"${addAttribute(emailUrl, "href")}>${renderComponent($$result, "EmailIcon", $$EmailIcon, {
		"height": "28",
		"width": "28"
	})}${lenguaje.whatsappCtaEmailButton || "Send email to us"}</a></div></div></div></div>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/WhatsappCta.astro", void 0);
//#endregion
//#region src/components/icons/SharedIcon.astro
createAstro("https://accessibletravelperu.com");
var $$SharedIcon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SharedIcon;
	const { class: className, id } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(id, "id")} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${addAttribute(className, "class")}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/icons/SharedIcon.astro", void 0);
//#endregion
//#region src/components/svg/Facebook.astro
createAstro("https://accessibletravelperu.com");
var $$Facebook = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Facebook;
	const { style, width = "19", height = "19" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"${addAttribute(width, "width")}${addAttribute(height, "height")}${addAttribute(`hover:text-blue-400 ${style}`, "class")} fill="currentColor" aria-label="Facebook icon" role="img"><path d="M279.14 288l14.22-92.66h-88.91V127.41c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.14 44.38-121.14 124.72v70.62H22.89V288h81.33v224h100.2V288z"></path></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Facebook.astro", void 0);
//#endregion
//#region src/components/svg/Instagram.astro
createAstro("https://accessibletravelperu.com");
var $$Instagram = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Instagram;
	const { style, size = 24 } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="url(#instagramGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${addAttribute(style, "class")}><defs><linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f9ce34"></stop><stop offset="50%" stop-color="#ee2a7b"></stop><stop offset="100%" stop-color="#6228d7"></stop></linearGradient></defs><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/svg/Instagram.astro", void 0);
//#endregion
//#region src/components/ui/ShareButtons.astro
createAstro("https://accessibletravelperu.com");
var $$ShareButtons = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShareButtons;
	const { lenguaje, bandera = true, siteConfig: siteConfigProp } = Astro.props;
	let siteConfig = siteConfigProp;
	if (!siteConfig) try {
		siteConfig = (await getEntry("siteConfig", "site"))?.data;
	} catch {
		siteConfig = {};
	}
	const siteName = siteConfig?.nombre || "Accessible Travel Peru";
	const toastTexts = {
		success: lenguaje.toastCopiado,
		error: lenguaje.toastErrorCopiar,
		instagram: lenguaje.toastInstagram
	};
	return renderTemplate`${bandera ? renderTemplate`${maybeRenderHead($$result)}<div class="flex gap-3 items-center overflow-hidden"><p class="flex justify-between items-center gap-4"><span class="text-gray-700 font-bold">${lenguaje.shared}</span><button type="button" data-copy-link aria-label="Copiar enlace" class="text-azul-travel duration-300 h-8 w-8 md:w-7 md:h-7 hover:opacity-70 active:scale-90">${renderComponent($$result, "SharedIconAstroComponent", $$SharedIcon, { "class": "h-full w-full pointer-events-none" })}</button></p><a data-share="whatsapp" href="#" target="_blank" rel="noopener noreferrer" class=" rounded  text-white text-sm  transition">${renderComponent($$result, "Whatsapp", $$Whatsapp, {
		"class": "",
		"height": "38",
		"width": "38"
	})}</a><a data-share="facebook" href="#" target="_blank" rel="noopener noreferrer" class="p-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition">${renderComponent($$result, "Facebook", $$Facebook, {
		"height": "22",
		"width": "22"
	})}</a><button type="button" data-share="instagram" class=" rounded bg-white text-white text-sm hover:opacity-80 transition">${renderComponent($$result, "Instagram", $$Instagram, { "size": 34 })}</button></div>` : renderTemplate`<div class="fixed right-16  md:right-24 flex flex-col items-end bottom-6 w-30 space-y-2 z-50"><div id="share-buttons" data-share-buttons class="hidden opacity-0 -translate-x-5 pointer-events-none transition-all duration-300 flex flex-col gap-2 mt-2"><a data-share="whatsapp" href="#" target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded bg-green-500 text-white text-sm hover:bg-green-600 transition">WhatsApp</a><a data-share="facebook" href="#" target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition">Facebook</a><button type="button" data-share="instagram" class="px-3 py-2 rounded bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 text-white text-sm hover:opacity-80 transition">Instagram</button></div><button type="button" data-share-toggle aria-expanded="false" aria-controls="share-buttons" class="focus:outline-none p-2.5  bg-azul-travel duration-300 hover:scale-95 active:scale-95 rounded-full">${renderComponent($$result, "SharedIconAstroComponent", $$SharedIcon, { "class": "text-white duration-300 h-8 w-8  " })}</button></div>`}<script>(function(){${defineScriptVars({
		siteName,
		toastTexts
	})}
  function initShare() {
    const currentUrl = window.location.href;
    const text = \`\${siteName} \${currentUrl}\`;

    document.querySelectorAll('[data-share="whatsapp"]').forEach((el) => {
      el.href = \`https://wa.me/?text=\${encodeURIComponent(text)}\`;
    });

    document.querySelectorAll('[data-share="facebook"]').forEach((el) => {
      el.href = \`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(currentUrl)}\`;
    });

    document.querySelectorAll('[data-share="instagram"]').forEach((el) => {
      el.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(currentUrl);
          showToast(toastTexts.instagram);
        } catch {
          showToast(toastTexts.error);
        }
      });
    });

    const toggle = document.querySelector("[data-share-toggle]");
    const buttons = document.querySelector("[data-share-buttons]");
    if (toggle && buttons) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        if (!expanded) {
          buttons.classList.remove("hidden", "pointer-events-none");
          requestAnimationFrame(() => {
            buttons.classList.remove("opacity-0", "-translate-x-5");
            buttons.classList.add("opacity-100", "translate-x-0");
          });
          toggle.setAttribute("aria-expanded", "true");
        } else {
          buttons.classList.remove("opacity-100", "translate-x-0");
          buttons.classList.add("opacity-0", "-translate-x-5", "pointer-events-none");
          toggle.setAttribute("aria-expanded", "false");
          setTimeout(() => buttons.classList.add("hidden"), 300);
        }
      });
    }

    document.querySelector("[data-copy-link]")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(currentUrl);
        showToast(toastTexts.success);
      } catch {
        showToast(toastTexts.error);
      }
    });
  }

  function showToast(msg) {
    document.querySelector(".toast-share")?.remove();
    const t = Object.assign(document.createElement("div"), {
      className: "toast-share",
      textContent: msg,
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 2000);
  }

  initShare();
})();<\/script>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/ui/ShareButtons.astro", void 0);
//#endregion
//#region src/components/section/Infotravel.astro
createAstro("https://accessibletravelperu.com");
var $$Infotravel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Infotravel;
	const { color = "1666F4", text = "Book Now", showReviews = true, env = "https://www.wetravel.com", data, lenguaje: lenguajeProp, siteConfig, galleryLogosData, paymentLogosData } = Astro.props;
	const lenguaje = lenguajeProp ?? getLocaleData(Astro.currentLocale).lenguaje;
	const uid = "67260";
	const uuid = data.links?.book?.match(/-(\d+)\/?$/)?.[1] || "";
	return renderTemplate`${maybeRenderHead($$result)}<section class="bg-white py-6 relative px-4 mx-auto"><div class="absolute -top-12 md:left-20 px-2 mb-8 flex justify-center gap-2 rounded-t-xl bg-white pt-2 min-w-40 max-w-100 w-auto"><button id="tab-info" class="tab-btn px-6 bg-white py-3 font-semibold rounded-lg hover:bg-azul-travel active:text-white active:bg-azul-travel hover:text-white duration-300 active:scale-95 transition text-black" data-tab="info">${lenguaje.infoBotonDescripcion}</button>${data.itinerary && data.itinerary.length > 0 && renderTemplate`<button id="tab-plan" class="tab-btn px-6 bg-white py-3 font-semibold rounded-lg transition text-black active:text-white active:bg-azul-travel hover:bg-azul-travel active:scale-95 hover:text-white duration-300" data-tab="plan">${lenguaje.infoBotonPlanificacion}</button>`}</div><div class="flex flex-col lg:flex-row justify-between overflow-hidden gap-6"><section id="tab-content-info" class="block w-full"><div class="flex md:px-4 flex-col md:flex-row w-full justify-between animate-on-scroll fade-up delay-100"><div class="flex items-center gap-2 md:gap-4 text-sm text-gray-500 mb-4 flex-wrap">${data.recomendado ? renderTemplate`<span class="w-auto z-10 bg-azul-travel text-white text-xs font-semibold px-3 py-1 rounded mb-2"${spreadAttributes(tinaField(data, "recomendado"))}>${lenguaje.infoRecomendado}</span>` : renderTemplate`<span></span>`}<h1 class="text-3xl w-full font-bold text-gray-900"${addAttribute(tinaField(data, "title"), "data-tina-field")}>${data.title}</h1><p class="flex items-center gap-2"${addAttribute(tinaField(data, "duration"), "data-tina-field")}>${renderComponent($$result, "Calendario", $$Calendario, { "style": "w-4 h-4" })}${data.duration}${lenguaje.infoDias}</p><p class="flex items-center gap-2"${addAttribute(tinaField(data, "groupSize"), "data-tina-field")}>${renderComponent($$result, "Persona", $$Persona, { "style": "w-4 h-4" })}${lenguaje.infoHuespedes}: ${data.groupSize}</p><p class="flex items-center gap-2"${addAttribute(tinaField(data, "location"), "data-tina-field")}>${renderComponent($$result, "LocationIcon", $$LocationIcon, {
		"width": "16",
		"height": "16",
		"class": "w-4 h-4"
	})}${data.location}</p></div><div class="flex mb-4 lg:flex-col-reverse  max-w-md justify-between lg:justify-center gap-4 lg:gap-0 items-center text-center w-full"><!--
        
          <p
            class="text-yellow-500 flex lg:flex-col gap-4 justify-center items-center text-xl"
          >
            {"★".repeat(data.rating)}{"☆".repeat(5 - data.rating)}
            <span class="text-gray-500 text-xs"
              >({data.reseñas} {lenguaje.infoReseñas})</span
            >
          </p>
 -->${renderComponent($$result, "ShareButtonsAstroComponent", $$ShareButtons, {
		"lenguaje": lenguaje,
		"siteConfig": siteConfig
	})}</div></div><div class="animate-on-scroll fade-up delay-200">${renderComponent($$result, "GaleriaModal", $$GaleriaModal, { "images": data.images })}</div><div class="animate-on-scroll fade-up delay-300">${renderComponent($$result, "WhatsappCta", $$WhatsappCta, {
		"lenguaje": lenguaje,
		"variant": "booking",
		"siteConfig": siteConfig
	})}</div><div class="flex flex-col lg:flex-row gap-4 flex-1 w-full mt-4"><section class="py-12 max-w-2xl px-4 bg-white mx-auto space-y-10 animate-on-scroll fade-right delay-200"><h2 class="text-lg font-semibold mb-2">${lenguaje.infoDescripcion}:</h2><p class="py-4"${addAttribute(tinaField(data, "description"), "data-tina-field")}>${data.description}</p>${Array.isArray(data?.includes) && data.includes.length > 0 && renderTemplate`<div class="animate-on-scroll fade-up"><h2 class="text-lg font-semibold  mb-2">${lenguaje.infoIncluye}:</h2><ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">${data.includes.map((item, index) => renderTemplate`<li class="text-sm  "${addAttribute(tinaField(data, `includes.${index}`), "data-tina-field")}><span class="text-green-700">✔</span> ${item}</li>`)}</ul></div>`}${Array.isArray(data?.excludes) && data.excludes.length > 0 && renderTemplate`<div class="animate-on-scroll fade-up"><h2 class="text-lg font-semibold  mb-2">${lenguaje.infoNoIncluye}:</h2><ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">${data.excludes.map((item, index) => renderTemplate`<li class="text-sm "${addAttribute(tinaField(data, `excludes.${index}`), "data-tina-field")}><span class="text-red-600">x</span> ${item}</li>`)}</ul></div>`}<h2 class="text-lg font-semibold mb-2 animate-on-scroll fade-up">${lenguaje.infoPaquetes}</h2><div><div id="wetravel_package_listing"${addAttribute(uid, "data-uid")}${addAttribute(uuid, "data-uuid")}${addAttribute(color, "data-color")}${addAttribute(lenguaje.infoReserva, "data-text")}${addAttribute(showReviews, "data-showreviews")}${addAttribute(env, "data-env")} class="w-full h-full flex justify-center scroll-mt-40 my-8 animate-on-scroll fade-up"><!-- El iframe se insertará aquí --></div>${data.addOns && data.addOns.length > 0 && renderTemplate`<section aria-labelledby="add-ons-heading" class="mt-4 animate-on-scroll fade-up"><h2 id="add-ons-heading" class="text-xl font-semibold text-black mb-4">${lenguaje.infoComplementos}</h2><ul role="list">${data.addOns.map((addon, index) => renderTemplate`<li class="border-b border-gray-200 py-4"${addAttribute(tinaField(data, `addOns.${index}.name`), "data-tina-field")}><h3 class="flex justify-between text-lg font-semibold text-gray-800">${addon.name}<span class="text-sm font-medium text-azul-travel mt-2"${addAttribute(tinaField(data, `addOns.${index}.price`), "data-tina-field")}>${addon.price}</span></h3><p class="text-sm text-gray-600 mt-1"${addAttribute(tinaField(data, `addOns.${index}.description`), "data-tina-field")}>${addon.description}</p></li>`)}</ul></section>`}</div><!-- 
          <ReviewList />
          <Recomendaciones />
          --></section><div class="animate-on-scroll fade-left delay-300 w-full lg:w-auto">${renderComponent($$result, "AsideTravel", $$AsideTravel, {
		"lenguaje": lenguaje,
		"data": data,
		"siteConfig": siteConfig,
		"galleryLogosData": galleryLogosData,
		"paymentLogosData": paymentLogosData
	})}</div></div></section><section id="tab-content-plan" class="text-gray-700 flex flex-col lg:flex-row hidden w-full animate-on-scroll fade-up"${spreadAttributes(tinaField(data, "itinerary"))}>${renderComponent($$result, "Acordeon", $$Acordeon, {
		"data": data,
		"lenguaje": lenguaje
	})}<div class="animate-on-scroll fade-left w-full lg:w-auto mt-4 lg:mt-0 lg:ml-6">${renderComponent($$result, "AsideTravel", $$AsideTravel, {
		"lenguaje": lenguaje,
		"data": data,
		"siteConfig": siteConfig,
		"galleryLogosData": galleryLogosData,
		"paymentLogosData": paymentLogosData
	})}</div></section></div><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"><\/script><script type="text/javascript">
    emailjs.init("E6459n1o-mTYoqA3b");
  <\/script><script>
    // Selecciona todos los formularios con clase "formAside"
    document.querySelectorAll(".formAside").forEach((form) => {
      // Selecciona el botón dentro de cada formulario
      const btn = form.querySelector(".btn-submit");

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        btn.value = "Sending...";

        const serviceID = "service_3iya7ah";
        const templateID = "template_zbmrdgd";

        emailjs.sendForm(serviceID, templateID, this).then(
          () => {
            btn.value = "Send Email";
            alert("Sent!");
          },
          (err) => {
            btn.value = "Send Email";
            alert(JSON.stringify(err));
          },
        );
      });
    });
  <\/script><script>
    // Función para inicializar tabs
    function initTabs() {
      const tabs = document.querySelectorAll(".tab-btn");
      const contents = {
        info: document.getElementById("tab-content-info"),
        plan: document.getElementById("tab-content-plan"),
      };

      if (!tabs.length || !contents.info || !contents.plan) return;

      tabs.forEach((tab) => {
        // Remover listeners anteriores para evitar duplicados
        tab.removeEventListener("click", handleTabClick);
        tab.addEventListener("click", handleTabClick);
      });

      // default active tab
      const tabInfo = document.getElementById("tab-info");
      if (tabInfo) {
        tabInfo.classList.add("text-[-azul-travel]", "border-[-azul-travel]");
      }
    }

    function handleTabClick(e) {
      const tab = e.currentTarget;
      const tabs = document.querySelectorAll(".tab-btn");
      const contents = {
        info: document.getElementById("tab-content-info"),
        plan: document.getElementById("tab-content-plan"),
      };

      // reset all
      tabs.forEach((t) => {
        t.classList.remove("text-[-azul-travel]", "border-[-azul-travel]");
        t.classList.add("text-gray-500", "border-transparent");
      });
      Object.values(contents).forEach((c) => c?.classList.add("hidden"));

      // activate clicked
      const selected = tab.dataset.tab;
      tab.classList.remove("text-gray-500", "border-transparent");
      tab.classList.add("text-[-azul-travel]", "border-[-azul-travel]");
      contents[selected]?.classList.remove("hidden");
    }

    // Inicializar en carga inicial
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initTabs);
    } else {
      initTabs();
    }

    // Re-inicializar cuando TinaCMS actualice el DOM
    const observer = new MutationObserver(() => {
      initTabs();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  <\/script></section>${renderScript($$result, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Infotravel.astro?astro&type=script&index=0&lang.ts")}${renderComponent($$result, "ShareButtonsAstroComponent", $$ShareButtons, {
		"bandera": false,
		"lenguaje": lenguaje,
		"siteConfig": siteConfig
	})}`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/section/Infotravel.astro", void 0);
//#endregion
//#region src/components/islands/Page404Body.astro
createAstro("https://accessibletravelperu.com");
var $$Page404Body = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Page404Body;
	const { data, lang = "en" } = Astro.props;
	const t = (field) => field?.[lang] || field?.en || "";
	return renderTemplate`${maybeRenderHead($$result)}<section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">${data.imagenFondo && renderTemplate`<div class="absolute inset-0 z-0"${spreadAttributes(tinaField(data, "imagenFondo"))}><img${addAttribute(data.imagenFondo, "src")} alt="" class="w-full h-full object-cover opacity-20"></div>`}<div class="text-center px-4 max-w-lg relative z-10"><h1 class="text-9xl font-bold text-blue-600 mb-4 drop-shadow-lg">404</h1><h2 class="text-3xl font-semibold text-gray-900 mb-4"${spreadAttributes(tinaField(data, "titulo"))}>${t(data.titulo)}</h2><p class="text-lg text-gray-600 mb-8"${spreadAttributes(tinaField(data, "descripcion"))}>${t(data.descripcion)}</p><div class="flex flex-col sm:flex-row gap-4 justify-center mb-8"><a${addAttribute(lang === "es" ? "/es/" : "/en/", "href")} class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"${spreadAttributes(tinaField(data, "botonInicio"))}>${t(data.botonInicio)}</a><a${addAttribute(lang === "es" ? "/es/blog/" : "/en/blog/", "href")} class="inline-block border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"${spreadAttributes(tinaField(data, "botonBlog"))}>${t(data.botonBlog)}</a></div>${data.enlacesRapidos && data.enlacesRapidos.length > 0 && renderTemplate`<div class="border-t border-gray-200 pt-6"${spreadAttributes(tinaField(data, "enlacesRapidos"))}><p class="text-sm text-gray-500 mb-3">${lang === "es" ? "O quizás buscas:" : "Or maybe you're looking for:"}</p><div class="flex flex-wrap justify-center gap-3">${data.enlacesRapidos.map((enlace, index) => renderTemplate`<a${addAttribute(lang === "es" ? enlace.urlEs : enlace.url, "href")} class="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"${addAttribute(tinaField(data, `enlacesRapidos.${index}.texto`), "data-tina-field")}>${t(enlace.texto)}</a>`)}</div></div>`}${data.mensajeContacto && renderTemplate`<p class="mt-8 text-sm text-gray-500"${spreadAttributes(tinaField(data, "mensajeContacto"))}>${t(data.mensajeContacto)}</p>`}</div></section>`;
}, "/Users/alejandro/Desktop/trabajo/AccessibleTravel/src/components/islands/Page404Body.astro", void 0);
//#endregion
//#region tina/__generated__/types.js
function gql(strings, ...args) {
	let str = "";
	strings.forEach((string, i) => {
		str += string + (args[i] || "");
	});
	return str;
}
var SiteConfigPartsFragmentDoc = gql`
    fragment SiteConfigParts on SiteConfig {
  __typename
  nombre
  descripcion
  correo
  uid
  heroVideoUrl
  authorImage
  contactos {
    __typename
    tipo
    pais
    numero
    tooltipText
    mensaje
    title
    url
    valor
  }
  telefonos {
    __typename
    pais
    numero
    url
  }
  direccion
  direccionHeader {
    __typename
    pais
    texto
    url
  }
  redes {
    __typename
    tipo
    icono
    url
    handle
    pais
  }
}
    `;
var GalleryLogosPartsFragmentDoc = gql`
    fragment GalleryLogosParts on GalleryLogos {
  __typename
  galleryLogos {
    __typename
    src
    alt
  }
}
    `;
var BannersPartsFragmentDoc = gql`
    fragment BannersParts on Banners {
  __typename
  banners {
    __typename
    src
    alt {
      __typename
      en
      es
    }
    title {
      __typename
      en
      es
    }
  }
  paymentLogos {
    __typename
    src
    alt {
      __typename
      en
      es
    }
    titleLink
  }
}
    `;
var HeroGroupPartsFragmentDoc = gql`
    fragment HeroGroupParts on HeroGroup {
  __typename
  discountPercent
  heroVideoUrl
  descriptionEn
  descriptionEs
  includesTitleEn
  includesTitleEs
  includesEn {
    __typename
    itemEn
    detailEn
  }
  includesEs {
    __typename
    itemEs
    detailEs
  }
}
    `;
var HeaderMenuPartsFragmentDoc = gql`
    fragment HeaderMenuParts on HeaderMenu {
  __typename
  items {
    __typename
    key
    labels {
      __typename
      en
      es
    }
    href
    coverImage
    visible
    children {
      __typename
      key
      labels {
        __typename
        en
        es
      }
      href
      coverImage
      visible
    }
  }
}
    `;
var BlogEsPartsFragmentDoc = gql`
    fragment BlogEsParts on BlogEs {
  __typename
  title
  description
  image
  date
  author
  body
}
    `;
var BlogEnPartsFragmentDoc = gql`
    fragment BlogEnParts on BlogEn {
  __typename
  title
  description
  image
  date
  author
  body
}
    `;
var ToursGrupalesEsPartsFragmentDoc = gql`
    fragment ToursGrupalesEsParts on ToursGrupalesEs {
  __typename
  title
  titleLink
  operator
  duration
  location
  groupSize
  rating
  reviews
  recomendado
  siempreFecha
  agotado
  description
  slogan
  contact
  highlights
  includes
  excludes
  packages {
    __typename
    name
    capacity
    price
    deposit
    description
  }
  addOns {
    __typename
    name
    price
    description
  }
  itinerary {
    __typename
    day
    title
    description
  }
  images {
    __typename
    link
    alt
    title
  }
  links {
    __typename
    book
    brochure
    inquire
  }
  startDate
  endDate
}
    `;
var ToursGrupalesEnPartsFragmentDoc = gql`
    fragment ToursGrupalesEnParts on ToursGrupalesEn {
  __typename
  title
  titleLink
  operator
  duration
  location
  groupSize
  rating
  reviews
  recomendado
  siempreFecha
  agotado
  description
  slogan
  contact
  highlights
  includes
  excludes
  packages {
    __typename
    name
    capacity
    price
    deposit
    description
  }
  addOns {
    __typename
    name
    price
    description
  }
  itinerary {
    __typename
    day
    title
    description
  }
  images {
    __typename
    link
    alt
    title
  }
  links {
    __typename
    book
    brochure
    inquire
  }
  startDate
  endDate
}
    `;
var ToursGlobalesEsPartsFragmentDoc = gql`
    fragment ToursGlobalesEsParts on ToursGlobalesEs {
  __typename
  title
  titleLink
  operator
  duration
  location
  groupSize
  rating
  reviews
  recomendado
  siempreFecha
  agotado
  description
  slogan
  contact
  highlights
  includes
  excludes
  packages {
    __typename
    name
    capacity
    price
    deposit
    description
  }
  addOns {
    __typename
    name
    price
    description
  }
  itinerary {
    __typename
    day
    title
    description
  }
  images {
    __typename
    link
    alt
    title
  }
  links {
    __typename
    book
    brochure
    inquire
  }
}
    `;
var ToursGlobalesEnPartsFragmentDoc = gql`
    fragment ToursGlobalesEnParts on ToursGlobalesEn {
  __typename
  title
  titleLink
  operator
  duration
  location
  groupSize
  rating
  reviews
  recomendado
  siempreFecha
  agotado
  description
  slogan
  contact
  highlights
  includes
  excludes
  packages {
    __typename
    name
    capacity
    price
    deposit
    description
  }
  addOns {
    __typename
    name
    price
    description
  }
  itinerary {
    __typename
    day
    title
    description
  }
  images {
    __typename
    link
    alt
    title
  }
  links {
    __typename
    book
    brochure
    inquire
  }
}
    `;
var Page404PartsFragmentDoc = gql`
    fragment Page404Parts on Page404 {
  __typename
  titulo {
    __typename
    en
    es
  }
  descripcion {
    __typename
    en
    es
  }
  botonInicio {
    __typename
    en
    es
  }
  botonBlog {
    __typename
    en
    es
  }
  enlacesRapidos {
    __typename
    texto {
      __typename
      en
      es
    }
    url
    urlEs
  }
  imagenFondo
  mensajeContacto {
    __typename
    en
    es
  }
}
    `;
var SiteConfigDocument = gql`
    query siteConfig($relativePath: String!) {
  siteConfig(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteConfigParts
  }
}
    ${SiteConfigPartsFragmentDoc}`;
var SiteConfigConnectionDocument = gql`
    query siteConfigConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteConfigFilter) {
  siteConfigConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteConfigParts
      }
    }
  }
}
    ${SiteConfigPartsFragmentDoc}`;
var GalleryLogosDocument = gql`
    query galleryLogos($relativePath: String!) {
  galleryLogos(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GalleryLogosParts
  }
}
    ${GalleryLogosPartsFragmentDoc}`;
var GalleryLogosConnectionDocument = gql`
    query galleryLogosConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GalleryLogosFilter) {
  galleryLogosConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GalleryLogosParts
      }
    }
  }
}
    ${GalleryLogosPartsFragmentDoc}`;
var BannersDocument = gql`
    query banners($relativePath: String!) {
  banners(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BannersParts
  }
}
    ${BannersPartsFragmentDoc}`;
var BannersConnectionDocument = gql`
    query bannersConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BannersFilter) {
  bannersConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BannersParts
      }
    }
  }
}
    ${BannersPartsFragmentDoc}`;
var HeroGroupDocument = gql`
    query heroGroup($relativePath: String!) {
  heroGroup(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HeroGroupParts
  }
}
    ${HeroGroupPartsFragmentDoc}`;
var HeroGroupConnectionDocument = gql`
    query heroGroupConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HeroGroupFilter) {
  heroGroupConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HeroGroupParts
      }
    }
  }
}
    ${HeroGroupPartsFragmentDoc}`;
var HeaderMenuDocument = gql`
    query headerMenu($relativePath: String!) {
  headerMenu(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HeaderMenuParts
  }
}
    ${HeaderMenuPartsFragmentDoc}`;
var HeaderMenuConnectionDocument = gql`
    query headerMenuConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HeaderMenuFilter) {
  headerMenuConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HeaderMenuParts
      }
    }
  }
}
    ${HeaderMenuPartsFragmentDoc}`;
var BlogEsDocument = gql`
    query blogEs($relativePath: String!) {
  blogEs(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BlogEsParts
  }
}
    ${BlogEsPartsFragmentDoc}`;
var BlogEsConnectionDocument = gql`
    query blogEsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BlogEsFilter) {
  blogEsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BlogEsParts
      }
    }
  }
}
    ${BlogEsPartsFragmentDoc}`;
var BlogEnDocument = gql`
    query blogEn($relativePath: String!) {
  blogEn(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BlogEnParts
  }
}
    ${BlogEnPartsFragmentDoc}`;
var BlogEnConnectionDocument = gql`
    query blogEnConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BlogEnFilter) {
  blogEnConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BlogEnParts
      }
    }
  }
}
    ${BlogEnPartsFragmentDoc}`;
var ToursGrupalesEsDocument = gql`
    query toursGrupalesEs($relativePath: String!) {
  toursGrupalesEs(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ToursGrupalesEsParts
  }
}
    ${ToursGrupalesEsPartsFragmentDoc}`;
var ToursGrupalesEsConnectionDocument = gql`
    query toursGrupalesEsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ToursGrupalesEsFilter) {
  toursGrupalesEsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ToursGrupalesEsParts
      }
    }
  }
}
    ${ToursGrupalesEsPartsFragmentDoc}`;
var ToursGrupalesEnDocument = gql`
    query toursGrupalesEn($relativePath: String!) {
  toursGrupalesEn(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ToursGrupalesEnParts
  }
}
    ${ToursGrupalesEnPartsFragmentDoc}`;
var ToursGrupalesEnConnectionDocument = gql`
    query toursGrupalesEnConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ToursGrupalesEnFilter) {
  toursGrupalesEnConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ToursGrupalesEnParts
      }
    }
  }
}
    ${ToursGrupalesEnPartsFragmentDoc}`;
var ToursGlobalesEsDocument = gql`
    query toursGlobalesEs($relativePath: String!) {
  toursGlobalesEs(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ToursGlobalesEsParts
  }
}
    ${ToursGlobalesEsPartsFragmentDoc}`;
var ToursGlobalesEsConnectionDocument = gql`
    query toursGlobalesEsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ToursGlobalesEsFilter) {
  toursGlobalesEsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ToursGlobalesEsParts
      }
    }
  }
}
    ${ToursGlobalesEsPartsFragmentDoc}`;
var ToursGlobalesEnDocument = gql`
    query toursGlobalesEn($relativePath: String!) {
  toursGlobalesEn(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ToursGlobalesEnParts
  }
}
    ${ToursGlobalesEnPartsFragmentDoc}`;
var ToursGlobalesEnConnectionDocument = gql`
    query toursGlobalesEnConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ToursGlobalesEnFilter) {
  toursGlobalesEnConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ToursGlobalesEnParts
      }
    }
  }
}
    ${ToursGlobalesEnPartsFragmentDoc}`;
var Page404Document = gql`
    query page404($relativePath: String!) {
  page404(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...Page404Parts
  }
}
    ${Page404PartsFragmentDoc}`;
var Page404ConnectionDocument = gql`
    query page404Connection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: Page404Filter) {
  page404Connection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...Page404Parts
      }
    }
  }
}
    ${Page404PartsFragmentDoc}`;
function getSdk(requester) {
	return {
		siteConfig(variables, options) {
			return requester(SiteConfigDocument, variables, options);
		},
		siteConfigConnection(variables, options) {
			return requester(SiteConfigConnectionDocument, variables, options);
		},
		galleryLogos(variables, options) {
			return requester(GalleryLogosDocument, variables, options);
		},
		galleryLogosConnection(variables, options) {
			return requester(GalleryLogosConnectionDocument, variables, options);
		},
		banners(variables, options) {
			return requester(BannersDocument, variables, options);
		},
		bannersConnection(variables, options) {
			return requester(BannersConnectionDocument, variables, options);
		},
		heroGroup(variables, options) {
			return requester(HeroGroupDocument, variables, options);
		},
		heroGroupConnection(variables, options) {
			return requester(HeroGroupConnectionDocument, variables, options);
		},
		headerMenu(variables, options) {
			return requester(HeaderMenuDocument, variables, options);
		},
		headerMenuConnection(variables, options) {
			return requester(HeaderMenuConnectionDocument, variables, options);
		},
		blogEs(variables, options) {
			return requester(BlogEsDocument, variables, options);
		},
		blogEsConnection(variables, options) {
			return requester(BlogEsConnectionDocument, variables, options);
		},
		blogEn(variables, options) {
			return requester(BlogEnDocument, variables, options);
		},
		blogEnConnection(variables, options) {
			return requester(BlogEnConnectionDocument, variables, options);
		},
		toursGrupalesEs(variables, options) {
			return requester(ToursGrupalesEsDocument, variables, options);
		},
		toursGrupalesEsConnection(variables, options) {
			return requester(ToursGrupalesEsConnectionDocument, variables, options);
		},
		toursGrupalesEn(variables, options) {
			return requester(ToursGrupalesEnDocument, variables, options);
		},
		toursGrupalesEnConnection(variables, options) {
			return requester(ToursGrupalesEnConnectionDocument, variables, options);
		},
		toursGlobalesEs(variables, options) {
			return requester(ToursGlobalesEsDocument, variables, options);
		},
		toursGlobalesEsConnection(variables, options) {
			return requester(ToursGlobalesEsConnectionDocument, variables, options);
		},
		toursGlobalesEn(variables, options) {
			return requester(ToursGlobalesEnDocument, variables, options);
		},
		toursGlobalesEnConnection(variables, options) {
			return requester(ToursGlobalesEnConnectionDocument, variables, options);
		},
		page404(variables, options) {
			return requester(Page404Document, variables, options);
		},
		page404Connection(variables, options) {
			return requester(Page404ConnectionDocument, variables, options);
		}
	};
}
var generateRequester = (client) => {
	const requester = async (doc, vars, options) => {
		let url = client.apiUrl;
		if (options?.branch) {
			const index = client.apiUrl.lastIndexOf("/");
			url = client.apiUrl.substring(0, index + 1) + options.branch;
		}
		const data = await client.request({
			query: doc,
			variables: vars,
			url
		}, options);
		return {
			data: data?.data,
			errors: data?.errors,
			query: doc,
			variables: vars || {}
		};
	};
	return requester;
};
var queries = (client) => {
	return getSdk(generateRequester(client));
};
//#endregion
//#region tina/__generated__/client.ts
var client = createClient({
	cacheDir: "/Users/alejandro/Desktop/trabajo/AccessibleTravel/tina/__generated__/.cache/1789658566836",
	url: process.env.TINA_LOCAL_URL || "https://content.tinajs.io/2.4/content/39450e72-b40d-4307-a06c-3eb66fef5598/github/main",
	token: "588473295a53bec8d592c240c6769be9bcc5b0f1",
	queries
});
//#endregion
//#region src/lib/tina/data.ts
var getBlogPostEs = (relativePath) => requestWithMetadata(client.queries.blogEs({ relativePath }), { priority: "primary" });
var getBlogPostEn = (relativePath) => requestWithMetadata(client.queries.blogEn({ relativePath }), { priority: "primary" });
var getConfig = () => requestWithMetadata(client.queries.siteConfig({ relativePath: "site.json" }));
var getMenuData = () => requestWithMetadata(client.queries.headerMenu({ relativePath: "menu.json" }));
var getGalleryLogos = () => requestWithMetadata(client.queries.galleryLogos({ relativePath: "gallery-logos.json" }));
var getBanners = () => requestWithMetadata(client.queries.banners({ relativePath: "banners.json" }));
var getTourGlobalesEs = (relativePath) => requestWithMetadata(client.queries.toursGlobalesEs({ relativePath }), { priority: "primary" });
var getTourGlobalesEn = (relativePath) => requestWithMetadata(client.queries.toursGlobalesEn({ relativePath }), { priority: "primary" });
var getTourGrupalesEs = (relativePath) => requestWithMetadata(client.queries.toursGrupalesEs({ relativePath }), { priority: "primary" });
var getTourGrupalesEn = (relativePath) => requestWithMetadata(client.queries.toursGrupalesEn({ relativePath }), { priority: "primary" });
var getPage404 = () => requestWithMetadata(client.queries.page404({ relativePath: "404.json" }));
//#endregion
//#region src/lib/tina/islands.ts
function _heroHome() {
	return $$HeroHome;
}
function _portadaDinamica() {
	return $$PortadaDinamica;
}
function _header() {
	return $$Header;
}
function _footer() {
	return $$Footer;
}
function _postBodyBlog() {
	return $$PostBodyBlog;
}
function _infotravel() {
	return $$Infotravel;
}
function _page404Body() {
	return $$Page404Body;
}
var islands = {
	blogEs: {
		fetch: (_request, params) => getBlogPostEs(params.get("relativePath") ?? ""),
		get component() {
			return _postBodyBlog();
		},
		wrapper: { tag: "article" },
		propsFromData: (data) => ({ data: data.data?.blogEs })
	},
	blogEn: {
		fetch: (_request, params) => getBlogPostEn(params.get("relativePath") ?? ""),
		get component() {
			return _postBodyBlog();
		},
		wrapper: { tag: "article" },
		propsFromData: (data) => ({ data: data.data?.blogEn })
	},
	heroHome: {
		fetch: (_request, params) => getConfig(),
		get component() {
			return _heroHome();
		},
		wrapper: { tag: "section" },
		propsFromData: (data) => ({ siteConfig: data.data?.siteConfig })
	},
	banners: {
		fetch: (_request, params) => getBanners(),
		get component() {
			return _portadaDinamica();
		},
		wrapper: { tag: "div" },
		propsFromData: (data) => ({ bannersData: data.data?.banners })
	},
	header: {
		fetch: async (_request, params) => {
			const [configData, menuData] = await Promise.all([getConfig(), getMenuData()]);
			return {
				configData,
				menuData
			};
		},
		get component() {
			return _header();
		},
		wrapper: { tag: "header" },
		propsFromData: (data) => ({
			siteConfig: data.configData.data?.siteConfig,
			menuData: data.menuData.data?.headerMenu
		})
	},
	footer: {
		fetch: (_request, params) => getConfig(),
		get component() {
			return _footer();
		},
		wrapper: { tag: "footer" },
		propsFromData: (data) => ({ siteConfig: data.data?.siteConfig })
	},
	toursGlobalesEs: {
		fetch: async (_request, params) => {
			const [tourData, configData, galleryData, bannersData] = await Promise.all([
				getTourGlobalesEs(params.get("relativePath") ?? ""),
				getConfig(),
				getGalleryLogos(),
				getBanners()
			]);
			return {
				tourData,
				configData,
				galleryData,
				bannersData
			};
		},
		get component() {
			return _infotravel();
		},
		wrapper: { tag: "section" },
		propsFromData: (data) => ({
			data: data.tourData.data?.toursGlobalesEs,
			lenguaje: getLocaleData("es").lenguaje,
			siteConfig: data.configData.data?.siteConfig,
			galleryLogosData: data.galleryData.data?.galleryLogos,
			paymentLogosData: data.bannersData.data?.banners?.paymentLogos ?? []
		})
	},
	toursGlobalesEn: {
		fetch: async (_request, params) => {
			const [tourData, configData, galleryData, bannersData] = await Promise.all([
				getTourGlobalesEn(params.get("relativePath") ?? ""),
				getConfig(),
				getGalleryLogos(),
				getBanners()
			]);
			return {
				tourData,
				configData,
				galleryData,
				bannersData
			};
		},
		get component() {
			return _infotravel();
		},
		wrapper: { tag: "section" },
		propsFromData: (data) => ({
			data: data.tourData.data?.toursGlobalesEn,
			lenguaje: getLocaleData("en").lenguaje,
			siteConfig: data.configData.data?.siteConfig,
			galleryLogosData: data.galleryData.data?.galleryLogos,
			paymentLogosData: data.bannersData.data?.banners?.paymentLogos ?? []
		})
	},
	toursGrupalesEs: {
		fetch: async (_request, params) => {
			const [tourData, configData, galleryData, bannersData] = await Promise.all([
				getTourGrupalesEs(params.get("relativePath") ?? ""),
				getConfig(),
				getGalleryLogos(),
				getBanners()
			]);
			return {
				tourData,
				configData,
				galleryData,
				bannersData
			};
		},
		get component() {
			return _infotravel();
		},
		wrapper: { tag: "section" },
		propsFromData: (data) => ({
			data: data.tourData.data?.toursGrupalesEs,
			lenguaje: getLocaleData("es").lenguaje,
			siteConfig: data.configData.data?.siteConfig,
			galleryLogosData: data.galleryData.data?.galleryLogos,
			paymentLogosData: data.bannersData.data?.banners?.paymentLogos ?? []
		})
	},
	toursGrupalesEn: {
		fetch: async (_request, params) => {
			const [tourData, configData, galleryData, bannersData] = await Promise.all([
				getTourGrupalesEn(params.get("relativePath") ?? ""),
				getConfig(),
				getGalleryLogos(),
				getBanners()
			]);
			return {
				tourData,
				configData,
				galleryData,
				bannersData
			};
		},
		get component() {
			return _infotravel();
		},
		wrapper: { tag: "section" },
		propsFromData: (data) => ({
			data: data.tourData.data?.toursGrupalesEn,
			lenguaje: getLocaleData("en").lenguaje,
			siteConfig: data.configData.data?.siteConfig,
			galleryLogosData: data.galleryData.data?.galleryLogos,
			paymentLogosData: data.bannersData.data?.banners?.paymentLogos ?? []
		})
	},
	page404: {
		fetch: (_request, _params) => getPage404(),
		get component() {
			return _page404Body();
		},
		wrapper: { tag: "div" },
		propsFromData: (data) => ({ data: data.data?.page404 })
	}
};
//#endregion
//#region src/pages/tina-island/[name].ts
var _name__exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	prerender: () => false
});
var ALL = experimental_createIslandRoute(islands);
//#endregion
//#region \0virtual:astro:page:src/pages/tina-island/[name]@_@ts
var page = () => _name__exports;
//#endregion
export { page };
