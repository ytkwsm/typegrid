//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = /* @__PURE__ */ t({
	aria: () => c,
	attr: () => s,
	color: () => p,
	consoleCss: () => o,
	debug: () => r,
	elem: () => m,
	lib: () => a,
	msg: () => i,
	num: () => f,
	sizes: () => d,
	style: () => l,
	styleBase: () => u
}), r = { count: { resize: 0 } }, i = {
	get: { notfound: "Cannot find typegrid.json. Please put it in the same directory as typegrid.js." },
	attention: { deviceDecision: "Current typegrid.js does not support user agent judgment." },
	err: { deviceDicision: "Please set \"@media\" or \"userAgent\" to general.deviceDecision of typegrid.json." }
}, a = {
	name: "typegrid.js",
	prefix: "tg_",
	json: {
		file: "typegrid.json",
		storage: "typegrid_json"
	}
}, o = {
	red: "color:#f00;",
	green: "color:#0f0;",
	blue: "color:#00f;"
}, s = { svg: {
	ns: "http://www.w3.org/2000/svg",
	width: 100
} }, c = {
	presen: "role='presentation'",
	hidden: "aria-hidden='true'"
}, l = {
	mode: "horizontal-tb",
	pointerEvents: "pointer-events: none;"
}, u = "\n#tg_all {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 99900;\n    width: 100%;\n    max-width: 100%;\n    height: auto;\n    min-height: 100%;\n    overflow: hidden;\n    font-feature-settings: \"palt\";\n    pointer-events: none;\n}\n#tg_originForWidth {\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    width: calc(100vw - 100%);\n    height: 1px;\n    opacity: 0;\n}\n#tg_wrapper {\n    pointer-events: none;\n}\n#tg_ruler {\n    width: 100%;\n    min-width: 100%;\n}\n#tg_ruler, #tg_setting, #tg_gui {\n    pointer-events: auto;\n}\n", d = {
	test: 280,
	char: 16,
	gutter: 2
}, f = {
	grid: 1,
	unit: 1,
	guide: 1,
	char: 1
}, p = { grid: "#cccccc" }, m = { wrapper: { html: [
	"<div id='tg_wrapper'>",
	"<svg id='tg_grid'>",
	"<g id='tg_base'><g id='tg_base__body'></g></g>",
	"<g id='tg_unit'><g id='tg_unit__body'></g></g>",
	"<g id='tg_sizes'><g id='tg_sizes__body'></g></g>",
	"<g id='tg_chars'><g id='tg_chars__body'></g></g>",
	"<g id='tg_layout'><g id='tg_layout__body'></g></g>",
	"<g id='tg_row'><g id='tg_row__body'></g></g>",
	"<g id='tg_rhythm'><g id='tg_rhythm__body'></g></g>",
	"</svg>",
	"</div>",
	"<div id='tg_ruler'><div id='tg_ruler__body'></div></div>",
	"<div id='tg_settings'></div>",
	"<div id='tg_gui'><div id='tg_gui__body'></div></div>"
].join("") } }, h = /* @__PURE__ */ t({
	buildMediaQueries: () => I,
	calcScrollbarWidth: () => _,
	checkBrowserHeight: () => v,
	checkWindowSize: () => P,
	convertComputedFontSize: () => T,
	convertHex: () => w,
	decisionColumnSizeType: () => O,
	decisionGutterSideType: () => D,
	getElementTagStyle: () => C,
	getJSON: () => g,
	getStyles: () => E,
	height: () => x,
	insertStyleElem: () => j,
	keyBinds: () => F,
	listenMediaQueries: () => N,
	reset: () => A,
	setSvgSizes: () => k,
	setWrapperHeight: () => y,
	ua: () => S,
	width: () => b,
	wrapper: () => M
});
function g(e) {
	return n[e];
}
function _() {
	let e = document.createElement("div");
	e.style.visibility = "hidden", e.style.overflow = "scroll", document.body.appendChild(e);
	let t = e.offsetWidth - e.clientWidth;
	return document.body.removeChild(e), t;
}
function v() {
	return Math.max(window.innerHeight, document.documentElement.clientHeight) < Math.max(document.body.scrollHeight, document.body.clientHeight);
}
function y() {
	let e = document.getElementById("tg_wrapper");
	e && (e.style.height = `${x()}px`);
}
function b() {
	return window.innerWidth || document.documentElement.clientWidth || 0;
}
function x() {
	return Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.offsetHeight, document.body.clientHeight, document.body.scrollHeight);
}
function S() {
	let e = navigator.userAgent;
	e.indexOf("iPhone") > 0 || e.indexOf("Android") > 0 && e.indexOf("Mobile") > 0 ? console.info("[typegrid] UA: mobile detected") : e.indexOf("iPad") > 0 || e.indexOf("Android") > 0 ? console.info("[typegrid] UA: tablet detected") : console.info("[typegrid] UA: desktop detected");
}
function C(e) {
	let t = document.getElementsByTagName(e).item(0);
	if (!t) throw Error(`[typegrid] Element <${e}> not found.`);
	return window.getComputedStyle(t);
}
function w(e) {
	let t = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*([.\d]+)?\)/.exec(e);
	return t ? [
		1,
		2,
		3
	].map((e) => Number(t[e]).toString(16).padStart(2, "0")).join("") : "";
}
function T(e, t) {
	if (e === "computed") {
		let e = C(t);
		return parseFloat(e.fontSize);
	}
	return e;
}
function E(e) {
	let t = C(e);
	console.info(`[typegrid] <${e}> styles —`, `font-size: ${t.fontSize};`, `line-height: ${t.lineHeight};`, `color: #${w(t.color)};`);
}
function D(e, t) {
	return e === "auto" ? 0 : e * t;
}
function O(e, t, n, r, i, a) {
	let o = n - i;
	return t === "fluid" ? o / r - a : e * t - a;
}
function k(e, t, n) {
	let r = document.getElementById(e);
	r && (r.setAttribute("width", String(t)), r.setAttribute("height", String(n)), r.setAttribute("viewBox", `0 0 ${t} ${n}`));
}
function A(e) {
	e.replaceChildren();
}
function j(e) {
	let t = document.createElement("style"), n = document.getElementById("tg_all");
	n && (t.setAttribute("id", "tg_style"), t.textContent = e, n.appendChild(t));
}
function M(e, t) {
	let n = document.createElement("div"), r = document.body;
	n.setAttribute("id", "tg_all"), n.setAttribute("role", "presentation"), n.setAttribute("aria-hidden", "true"), r.appendChild(n), n.innerHTML = e;
}
function N(e, t, n) {
	let r = e.user.media.contents.breakPoints.width.min, i = e.user.media.devices, a = e.user.general.unit.breakPoints, o = -1, s = [], c = (e) => {
		o = e, console.info(`[typegrid] media query matched: ${i[o]} (index: ${o})`), n(o);
	}, l = (e) => {
		if (e.matches) {
			let t = e.typegridIndex;
			if (t !== void 0 && !isNaN(t) && o !== t) return t;
		}
		return -1;
	}, u = (e) => {
		let t = e.target;
		if (!t) return;
		let n = l(t);
		n > -1 && c(n);
	};
	return r.forEach((t, n, r) => {
		let i = r[n + 1], o = [`screen and (min-width: ${t}${a})`];
		i !== void 0 && o.push(`and (max-width: ${i - 1}${a})`);
		let c = window.matchMedia(o.join(" "));
		if (c.typegridIndex = n, c.addEventListener("change", u), s.push(c), c.matches) {
			let t = l(c);
			t > -1 && (e.currentMedia = e.getJsonValues(t));
		}
	}), function() {
		s.forEach((e) => {
			e.removeEventListener("change", u);
		});
	};
}
function P(e, t, n) {
	let r = -1, i = new ResizeObserver(() => {
		r === -1 && (r = requestAnimationFrame(() => {
			e.debug.count.resize += 1, n(), r = -1;
		}));
	});
	return i.observe(document.documentElement), function() {
		r !== -1 && cancelAnimationFrame(r), i.disconnect();
	};
}
function F(e, t) {
	let n = e.visibility, r = e.fixed, i = document.getElementById("tg_all");
	if (!i) return () => {};
	let a = (e) => {
		e.key === "g" && (n = !n, i.style.display = n ? "block" : "none"), e.key === "p" && (r = !r, i.style.position = r ? "fixed" : "absolute");
	};
	return document.body.addEventListener("keydown", a), function() {
		document.body.removeEventListener("keydown", a);
	};
}
function I(e, t, n) {
	return t.map((e, r) => r === 0 ? `screen and (max-width: ${t[r + 1] - 1}${n})` : r === t.length - 1 ? `screen and (min-width: ${e}${n})` : `screen and (min-width: ${e}${n}) and (max-width: ${t[r + 1] - 1}${n})`);
}
//#endregion
//#region src/snippet.ts
function L() {
	if (document.currentScript) return document.currentScript.src;
	let e = document.getElementsByTagName("script"), t = e[e.length - 1];
	return t?.src ? t.src : "";
}
//#endregion
//#region src/user.ts
async function R(e) {
	let t = L(), n = (t.includes("typegrid.js") ? t.replace(/typegrid\.js$/g, "") : "/") + a.json.file;
	try {
		let t = await fetch(n);
		if (!t.ok) throw Error(i.get.notfound);
		e(await t.json());
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		console.error(`[${a.name}] Failed to load typegrid.json:`, t);
	}
}
//#endregion
//#region src/model.ts
var z = class {
	constructor(e) {
		this.currentMedia = null, this.debug = r, this.lib = a, this.consoleCss = o, this.attr = s, this.aria = c, this.style = l, this.sizes = d, this.num = f, this.color = p, this.elem = m, this.config = { styleBase: u }, this.user = e, this.devices = e.media.devices, this.fontSize = e.media.contents.fontSize, this.visibility = e.general.visibility, this.fixed = e.general.fixed, this.scrollbarWidth = _(), this.width(), this.height(), this.ua(), this.keyboard(), this.size(), this.getStyle();
	}
	getJsonValues(e) {
		let t = this.user.media, n = t.devices.length;
		if (e < 0 || e >= n) throw RangeError(`[typegrid] getJsonValues: index ${e} is out of range (0–${n - 1})`);
		return {
			devices: t.devices[e],
			contents: {
				writingMode: t.contents.writingMode[e],
				fontSize: t.contents.fontSize[e],
				lineHeight: t.contents.lineHeight[e],
				letterSpacing: t.contents.letterSpacing[e],
				breakPoints: { width: { min: t.contents.breakPoints.width.min[e] } },
				gutter: t.contents.gutter[e]
			},
			grids: {
				base: {
					num: t.grids.base.num[e],
					gutter: t.grids.base.gutter[e]
				},
				column: {
					num: t.grids.column.num[e],
					sizeChar: t.grids.column.sizeChar[e],
					gutter: t.grids.column.gutter[e]
				},
				row: {
					height: t.grids.row.height[e],
					gutter: t.grids.row.gutter[e]
				},
				unit: {
					num: t.grids.unit.num[e],
					gutter: t.grids.unit.gutter[e]
				}
			}
		};
	}
	width() {
		let e = v(), t = b();
		return e ? t - this.scrollbarWidth : t;
	}
	height() {
		return x();
	}
	wrapperHeight() {
		y();
	}
	ua() {
		S();
	}
	base() {}
	unit() {}
	layout() {}
	row() {}
	rhythm() {}
	ruler() {}
	guide() {}
	gui() {}
	keyboard() {}
	size() {}
	getStyle() {
		E("html");
	}
}, B = "http://www.w3.org/2000/svg", V = class {
	constructor(e, t) {
		this.currentMedia = null, this.utils = e, this.model = t;
	}
	wrapper(e, t) {
		this.utils.wrapper(e, t);
	}
	reset(e) {
		this.utils.reset(e);
	}
	syncSvgElements(e, t, n, r) {
		let i = e.children;
		for (let e = 0; e < Math.min(i.length, t); e++) r(i[e], e);
		let a = document.createDocumentFragment();
		for (let e = i.length; e < t; e++) {
			let t = document.createElementNS(B, n);
			r(t, e), a.appendChild(t);
		}
		for (a.childNodes.length > 0 && e.appendChild(a); e.children.length > t;) e.lastElementChild.remove();
	}
	visibility() {
		let e = this.model.visibility, t = document.getElementById("tg_all");
		t && t.setAttribute("style", `display: ${e ? "block" : "none"}`);
	}
	render(e, t) {
		if (e === "init") this.wrapper(this.model.elem.wrapper.html, this.model), this.model.wrapperHeight(), this.visibility(), this.utils.insertStyleElem(this.model.config.styleBase), this.utils.setSvgSizes("tg_grid", this.model.width(), this.utils.height()), this.currentMedia = this.model.currentMedia, this.render("resize");
		else if (e === "resize") {
			if (!this.currentMedia) return;
			let e = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, "html"), t = this.currentMedia.contents.lineHeight, n = this.model.width(), r = this.utils.height();
			this.model.wrapperHeight();
			let i = this.currentMedia.grids.column.num, a = this.currentMedia.grids.column.sizeChar, o = this.currentMedia.grids.row.height, s = this.currentMedia.grids.row.gutter, c = this.currentMedia.grids.column.gutter, l = this.currentMedia.contents.gutter;
			this.utils.setSvgSizes("tg_grid", n, r), this.rhythm(e, t, n, r), this.row(e, t, n, r, o, s), this.layout(e, n, r, i, a, c, l), this.base(), this.unit();
		} else if (e === "change") this.unit();
		else if (e === "media") {
			if (t === void 0) return;
			this.currentMedia = this.model.getJsonValues(t);
		}
	}
	base() {}
	unit() {}
	layout(e, t, n, r, i, a, o) {
		let s = e, c = t, l = n, u = r, d = s * a, f = d * u - d, p = this.utils.decisionGutterSideType(o, s) * 2 / u, m = this.utils.decisionColumnSizeType(s, i, c, u, f, p), h = (c - (f + m * u)) / 2, g = document.getElementById("tg_layout__body");
		g && this.syncSvgElements(g, u, "rect", (e, t) => {
			e.setAttribute("class", `rect-x${t}`), e.setAttribute("x", String(d * t + t * m + h)), e.setAttribute("y", "0"), e.setAttribute("width", String(m)), e.setAttribute("height", String(l)), e.setAttribute("fill", "#ff0000"), e.setAttribute("fill-opacity", "0.125"), e.setAttribute("stroke", "#ff0000"), e.setAttribute("stroke-opacity", "0.5");
		});
	}
	row(e, t, n, r, i, a) {
		let o = e, s = n, c = r, l = i, u = a, d = (l + u) * o, f = Math.floor(c / d) + 1, p = document.getElementById("tg_row__body");
		p && this.syncSvgElements(p, f, "rect", (e, t) => {
			e.setAttribute("class", `row-y${t}`), e.setAttribute("x", "0"), e.setAttribute("y", String(Math.floor(t * l * o + t * u * o))), e.setAttribute("width", String(s)), e.setAttribute("height", String(l * o)), e.setAttribute("fill", "#ff0000"), e.setAttribute("fill-opacity", "0.125"), e.setAttribute("stroke", "#ff0000"), e.setAttribute("stroke-opacity", "0.5");
		});
	}
	rhythm(e, t, n, r) {
		let i = e, a = t, o = n, s = Math.floor(r / i * a), c = document.getElementById("tg_rhythm__body");
		c && this.syncSvgElements(c, s, "line", (e, t) => {
			e.setAttribute("class", `line-y${t}`), e.setAttribute("x1", "0"), e.setAttribute("y1", String(t * i * a / 2)), e.setAttribute("x2", String(o)), e.setAttribute("y2", String(t * i * a / 2)), e.setAttribute("fill", "none"), e.setAttribute("stroke", "#999999"), e.setAttribute("stroke-width", "0.5"), e.setAttribute("stroke-opacity", "0.75");
		});
	}
	ruler() {}
	guide() {}
	gui() {}
	keyboard() {}
	size() {}
}, H = class {
	constructor(e, t, n) {
		this.utils = e, this.model = t, this.view = n, this.unlistenMedia = this.media(), this.uncheckWindow = this.resize(), this.unKeyBinds = this.keyBinds(), this.init();
	}
	init() {
		let e = () => {
			this.view.render("init");
		};
		document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
	}
	media() {
		return this.utils.listenMediaQueries(this.model, this.view, (e) => {
			this.view.render("media", e);
		});
	}
	resize() {
		return this.utils.checkWindowSize(this.model, this.view, () => {
			this.view.render("resize");
		});
	}
	keyBinds() {
		return this.utils.keyBinds(this.model, this.view);
	}
	destroy() {
		this.unlistenMedia(), this.uncheckWindow(), this.unKeyBinds();
	}
};
//#endregion
//#region src/main.ts
function U() {
	let e = null, t = {
		init() {
			R((t) => {
				let n = new z(t);
				e = new H(h, n, new V(h, n));
			});
		},
		destroy() {
			e &&= (e.destroy(), null);
		}
	};
	return t.init(), t;
}
//#endregion
export { U as typegrid };
