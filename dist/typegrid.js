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
}, u = "\n:root {\n    --tg-color-column: #ff0000;\n    --tg-color-row: #ff0000;\n    --tg-color-rhythm: #999999;\n}\n#tg_all {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 99900;\n    width: 100%;\n    max-width: 100%;\n    height: auto;\n    min-height: 100%;\n    overflow: hidden;\n    font-feature-settings: \"palt\";\n    pointer-events: none;\n}\n#tg_originForWidth {\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    width: calc(100vw - 100%);\n    height: 1px;\n    opacity: 0;\n}\n#tg_wrapper {\n    pointer-events: none;\n}\n#tg_ruler {\n    width: 100%;\n    min-width: 100%;\n}\n#tg_ruler, #tg_setting, #tg_gui {\n    pointer-events: auto;\n}\n#tg_grid {\n    contain: layout style paint;\n}\n#tg_layout__body rect {\n    fill: var(--tg-color-column);\n    fill-opacity: 0.125;\n    stroke: var(--tg-color-column);\n    stroke-opacity: 0.5;\n}\n#tg_row__body rect {\n    fill: var(--tg-color-row);\n    fill-opacity: 0.125;\n    stroke: var(--tg-color-row);\n    stroke-opacity: 0.5;\n}\n#tg_rhythm__body line {\n    fill: none;\n    stroke: var(--tg-color-rhythm);\n    stroke-width: 0.5;\n    stroke-opacity: 0.75;\n}\n", d = {
	test: 280,
	char: 16,
	gutter: 2
}, f = {
	grid: 1,
	unit: 1,
	guide: 1,
	char: 1
}, p = { grid: "#cccccc" }, m = { wrapper: {
	html: [
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
	].join(""),
	containerHtml: [
		"<div id='tg_wrapper'></div>",
		"<div id='tg_ruler'><div id='tg_ruler__body'></div></div>",
		"<div id='tg_settings'></div>",
		"<div id='tg_gui'><div id='tg_gui__body'></div></div>"
	].join(""),
	svgHtml: [
		"<svg id='tg_grid'>",
		"<g id='tg_base'><g id='tg_base__body'></g></g>",
		"<g id='tg_unit'><g id='tg_unit__body'></g></g>",
		"<g id='tg_sizes'><g id='tg_sizes__body'></g></g>",
		"<g id='tg_chars'><g id='tg_chars__body'></g></g>",
		"<g id='tg_layout'><g id='tg_layout__body'></g></g>",
		"<g id='tg_row'><g id='tg_row__body'></g></g>",
		"<g id='tg_rhythm'><g id='tg_rhythm__body'></g></g>",
		"</svg>"
	].join("")
} }, h = /* @__PURE__ */ t({
	buildMediaQueries: () => ne,
	calcScrollbarWidth: () => _,
	checkBrowserHeight: () => v,
	checkWindowSize: () => ee,
	convertComputedFontSize: () => T,
	convertHex: () => w,
	decisionColumnSizeType: () => O,
	decisionGutterSideType: () => D,
	ensureContainer: () => j,
	getElementTagStyle: () => C,
	getJSON: () => g,
	getStyles: () => E,
	height: () => x,
	insertStyleElem: () => M,
	keyBinds: () => te,
	listenMediaQueries: () => P,
	reset: () => A,
	setSvgSizes: () => k,
	setWrapperHeight: () => y,
	ua: () => S,
	width: () => b,
	wrapper: () => N
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
function y(e) {
	let t = document.getElementById("tg_wrapper");
	t && (t.style.height = `${e ?? x()}px`);
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
	e && (e.setAttribute("width", String(t)), e.setAttribute("height", String(n)), e.setAttribute("viewBox", `0 0 ${t} ${n}`));
}
function A(e) {
	e.replaceChildren();
}
function j(e) {
	if (document.getElementById("tg_all")) return;
	let t = document.createElement("div");
	t.setAttribute("id", "tg_all"), t.setAttribute("role", "presentation"), t.setAttribute("aria-hidden", "true"), document.body.appendChild(t), t.innerHTML = e;
}
function M(e) {
	if (document.getElementById("tg_style")) return;
	let t = document.createElement("style"), n = document.getElementById("tg_all");
	n && (t.setAttribute("id", "tg_style"), t.textContent = e, n.appendChild(t));
}
function N(e, t) {
	let n = document.createElement("div"), r = document.body;
	n.setAttribute("id", "tg_all"), n.setAttribute("role", "presentation"), n.setAttribute("aria-hidden", "true"), r.appendChild(n), n.innerHTML = e;
}
function P(e, t) {
	let n = e.user.media.contents.breakPoints.width.min, r = e.user.media.devices, i = e.user.general.unit.breakPoints, a = -1, o = /* @__PURE__ */ new Map(), s = (n) => {
		a = n, e.currentMediaIndex = n, console.info(`[typegrid] media query matched: ${r[a]} (index: ${a})`), t(a);
	}, c = (e) => {
		let t = e.target;
		if (!t || !t.matches) return;
		let n = o.get(t);
		n !== void 0 && a !== n && s(n);
	};
	return n.forEach((t, n, r) => {
		let s = r[n + 1], l = [`screen and (min-width: ${t}${i})`];
		s !== void 0 && l.push(`and (max-width: ${s - 1}${i})`);
		let u = window.matchMedia(l.join(" "));
		o.set(u, n), u.addEventListener("change", c), u.matches && a !== n && (e.currentMedia = e.getJsonValues(n), e.currentMediaIndex = n, a = n);
	}), function() {
		o.forEach((e, t) => {
			t.removeEventListener("change", c);
		}), o.clear();
	};
}
function ee(e, t) {
	let n = -1, r = new ResizeObserver(() => {
		n === -1 && (n = requestAnimationFrame(() => {
			e.debug.count.resize += 1, t(), n = -1;
		}));
	});
	return r.observe(document.documentElement), function() {
		n !== -1 && cancelAnimationFrame(n), r.disconnect();
	};
}
function te(e) {
	let t = e.visibility, n = e.fixed, r = document.getElementById("tg_all");
	if (!r) return () => {};
	let i = (e) => {
		e.key === "g" && (t = !t, r.style.display = t ? "block" : "none"), e.key === "p" && (n = !n, r.style.position = n ? "fixed" : "absolute");
	};
	return document.body.addEventListener("keydown", i), function() {
		document.body.removeEventListener("keydown", i);
	};
}
function ne(e, t, n) {
	return t.map((e, r) => r === 0 ? `screen and (max-width: ${t[r + 1] - 1}${n})` : r === t.length - 1 ? `screen and (min-width: ${e}${n})` : `screen and (min-width: ${e}${n}) and (max-width: ${t[r + 1] - 1}${n})`);
}
//#endregion
//#region src/snippet.ts
function re() {
	if (document.currentScript) return document.currentScript.src;
	let e = document.getElementsByTagName("script"), t = e[e.length - 1];
	return t?.src ? t.src : "";
}
//#endregion
//#region src/validate.ts
function F(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function I(e, t, n = 1) {
	return Array.isArray(e) && e.length >= n && e.every(t);
}
var L = (e) => typeof e == "string", R = (e) => typeof e == "boolean", z = (e) => typeof e == "number" && isFinite(e), B = (e) => z(e) || e === "computed", V = (e) => z(e) || e === "auto", H = (e) => e === "fluid" || z(e);
function U(e) {
	let t = [];
	if (!F(e)) return {
		ok: !1,
		errors: ["config はオブジェクトである必要があります"]
	};
	let n = e.general;
	if (!F(n)) t.push("general が存在しないか不正な型です");
	else {
		R(n.visibility) || t.push("general.visibility は boolean が必要です"), R(n.fixed) || t.push("general.fixed は boolean が必要です"), L(n.deviceDecision) || t.push("general.deviceDecision は string が必要です");
		let e = n.unit;
		(!F(e) || !L(e.breakPoints)) && t.push("general.unit.breakPoints は string が必要です");
	}
	let r = e.media;
	if (!F(r)) return t.push("media が存在しないか不正な型です"), {
		ok: !1,
		errors: t
	};
	let i = r.devices;
	if (!I(i, L)) return t.push("media.devices は string[] (1件以上) が必要です"), {
		ok: !1,
		errors: t
	};
	let a = i.length, o = (e, n, r) => {
		(!I(n, r) || n.length !== a) && t.push(`${e} は長さ ${a} の配列が必要です`);
	}, s = r.contents;
	if (!F(s)) t.push("media.contents が存在しないか不正な型です");
	else {
		o("media.contents.writingMode", s.writingMode, L), o("media.contents.fontSize", s.fontSize, B), o("media.contents.lineHeight", s.lineHeight, z), o("media.contents.letterSpacing", s.letterSpacing, z), o("media.contents.gutter", s.gutter, V);
		let e = s.breakPoints;
		!F(e) || !F(e.width) ? t.push("media.contents.breakPoints.width が存在しないか不正な型です") : o("media.contents.breakPoints.width.min", e.width.min, z);
	}
	let c = r.grids;
	if (!F(c)) t.push("media.grids が存在しないか不正な型です");
	else {
		let e = (e, n) => {
			let r = c[e];
			if (!F(r)) {
				t.push(`media.grids.${e} が存在しないか不正な型です`);
				return;
			}
			for (let [t, i] of Object.entries(n)) o(`media.grids.${e}.${t}`, r[t], i);
		};
		e("base", {
			num: z,
			gutter: z
		}), e("column", {
			num: z,
			sizeChar: H,
			gutter: z
		}), e("row", {
			height: z,
			gutter: z
		}), e("unit", {
			num: z,
			gutter: z
		});
	}
	return t.length === 0 ? { ok: !0 } : {
		ok: !1,
		errors: t
	};
}
function W(e) {
	let t = U(e);
	return t.ok ? !0 : (console.warn("[typegrid] typegrid.json の設定に問題があります:"), t.errors.forEach((e) => console.warn(`  - ${e}`)), !1);
}
//#endregion
//#region src/user.ts
async function G(e, t) {
	let n = re(), r = (n.includes("typegrid.js") ? n.replace(/typegrid\.js$/g, "") : "/") + a.json.file;
	try {
		let n = await fetch(r, { signal: t });
		if (!n.ok) throw Error(i.get.notfound);
		let a = await n.json();
		if (!W(a)) return;
		e(a);
	} catch (e) {
		if (e instanceof DOMException && e.name === "AbortError") return;
		let t = e instanceof Error ? e.message : String(e);
		console.error(`[${a.name}] Failed to load typegrid.json:`, t);
	}
}
//#endregion
//#region src/model.ts
var K = class {
	constructor(e) {
		this.currentMedia = null, this.currentMediaIndex = 0, this.debug = r, this.lib = a, this.consoleCss = o, this.attr = s, this.aria = c, this.style = l, this.sizes = d, this.num = f, this.color = p, this.elem = m, this.config = { styleBase: u }, this.user = e, this.devices = e.media.devices, this.fontSize = e.media.contents.fontSize, this.visibility = e.general.visibility, this.fixed = e.general.fixed, this.scrollbarWidth = _(), this.width(), this.height(), this.ua(), this.keyboard(), this.size(), this.getStyle();
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
	wrapperHeight(e) {
		y(e);
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
};
//#endregion
//#region src/core/calc.ts
function q(e, t) {
	let n = e.grids.column.num, r = t * e.grids.column.gutter, i = r * n - r, a = D(e.contents.gutter, t), o = a * 2 / n, s = e.grids.row.height, c = e.grids.row.gutter;
	return {
		fontSize: t,
		lineHeight: e.contents.lineHeight,
		columnNum: n,
		sizeChar: e.grids.column.sizeChar,
		gutterBaseWidth: r,
		gutterTotal: i,
		gutterSideEach: a,
		gutterSideInstallments: o,
		rowTotalHeight: (s + c) * t,
		rowHeightPx: s * t
	};
}
function J(e, t, n) {
	let { fontSize: r, columnNum: i, sizeChar: a, gutterBaseWidth: o, gutterTotal: s, gutterSideInstallments: c } = e, l = O(r, a, t, i, s, c), u = (t - (s + l * i)) / 2, d = o + l, f = [];
	for (let e = 0; e < i; e++) f.push({
		x: e * d + u,
		width: l,
		height: n
	});
	return f;
}
function Y(e, t, n) {
	let { rowTotalHeight: r, rowHeightPx: i } = e, a = Math.floor(n / r) + 1, o = [];
	for (let e = 0; e < a; e++) o.push({
		x: 0,
		y: Math.floor(e * r),
		width: t,
		height: i
	});
	return o;
}
function ie(e, t, n) {
	let { fontSize: r, lineHeight: i } = e, a = Math.floor(n / r * i), o = r * i / 2, s = [];
	for (let e = 0; e < a; e++) {
		let n = e * o;
		s.push({
			x1: 0,
			y1: n,
			x2: t,
			y2: n
		});
	}
	return s;
}
function X(e, t, n) {
	return {
		columns: J(e, t, n),
		rows: Y(e, t, n),
		rhythmLines: ie(e, t, n)
	};
}
//#endregion
//#region src/renderer/canvas.ts
var ae = .125, oe = .5, se = .125, ce = .5, le = .75, ue = .5;
function Z(e, t) {
	let n = e.replace("#", "");
	return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},${t})`;
}
var Q = class {
	constructor(e) {
		this.currentMedia = null, this.canvas = null, this.ctx = null, this.cachedFontSize = null, this.cachedMediaCalc = null, this.model = e;
	}
	init() {
		j(this.model.elem.wrapper.containerHtml);
		let e = document.getElementById("tg_wrapper");
		if (!e) return;
		this.canvas = document.createElement("canvas"), this.canvas.id = "tg_canvas", this.canvas.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;", e.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.model.wrapperHeight();
		let t = document.getElementById("tg_all");
		t && (t.style.display = this.model.visibility ? "block" : "none"), M(this.model.config.styleBase), this.currentMedia = this.model.currentMedia, this.resize();
	}
	resize() {
		if (!this.currentMedia || !this.canvas || !this.ctx) return;
		this.cachedFontSize === null && (this.cachedFontSize = T(this.currentMedia.contents.fontSize, "html")), this.cachedMediaCalc === null && (this.cachedMediaCalc = q(this.currentMedia, this.cachedFontSize));
		let e = this.model.width(), t = x();
		this.model.wrapperHeight(t), this.canvas.width = e, this.canvas.height = t;
		let n = X(this.cachedMediaCalc, e, t);
		this.draw(n, e, t);
	}
	mediaChange(e) {
		this.currentMedia = this.model.getJsonValues(e), this.cachedFontSize = null, this.cachedMediaCalc = null, this.resize();
	}
	invalidateMediaCalc() {
		this.cachedFontSize = null, this.cachedMediaCalc = null;
	}
	destroy() {
		this.canvas?.remove(), this.canvas = null, this.ctx = null, this.currentMedia = null, this.cachedFontSize = null, this.cachedMediaCalc = null;
	}
	draw(e, t, n) {
		let r = this.ctx;
		r.clearRect(0, 0, t, n);
		let i = getComputedStyle(document.documentElement), a = i.getPropertyValue("--tg-color-column").trim() || "#ff0000", o = i.getPropertyValue("--tg-color-row").trim() || "#ff0000", s = i.getPropertyValue("--tg-color-rhythm").trim() || "#999999";
		r.fillStyle = Z(a, ae);
		for (let t of e.columns) r.fillRect(t.x, 0, t.width, n);
		r.strokeStyle = Z(a, oe), r.lineWidth = 1;
		for (let t of e.columns) r.strokeRect(t.x, 0, t.width, n);
		r.fillStyle = Z(o, se);
		for (let t of e.rows) r.fillRect(t.x, t.y, t.width, t.height);
		r.strokeStyle = Z(o, ce);
		for (let t of e.rows) r.strokeRect(t.x, t.y, t.width, t.height);
		r.strokeStyle = Z(s, le), r.lineWidth = ue, r.beginPath();
		for (let t of e.rhythmLines) r.moveTo(t.x1, t.y1), r.lineTo(t.x2, t.y2);
		r.stroke();
	}
}, de = "http://www.w3.org/2000/svg", fe = class {
	constructor(e, t) {
		this.currentMedia = null, this.cachedFontSize = null, this.cachedMediaCalc = null, this.elSvgGrid = null, this.elLayoutBody = null, this.elRowBody = null, this.elRhythmBody = null, this.utils = e, this.model = t;
	}
	init() {
		this.render("init");
	}
	resize() {
		this.render("resize");
	}
	mediaChange(e) {
		this.render("media", e);
	}
	destroy() {
		this.elLayoutBody?.replaceChildren(), this.elRowBody?.replaceChildren(), this.elRhythmBody?.replaceChildren(), this.elSvgGrid?.remove(), this.elSvgGrid = null, this.elLayoutBody = null, this.elRowBody = null, this.elRhythmBody = null, this.currentMedia = null, this.cachedFontSize = null, this.cachedMediaCalc = null;
	}
	syncSvgElements(e, t, n, r) {
		let i = e.children, a = Math.min(i.length, t);
		for (let e = 0; e < a; e++) r(i[e], e, !1);
		let o = document.createDocumentFragment();
		for (let e = i.length; e < t; e++) {
			let t = document.createElementNS(de, n);
			r(t, e, !0), o.appendChild(t);
		}
		o.childNodes.length > 0 && e.appendChild(o);
		let s = e.children.length - t;
		for (; s-- > 0;) e.lastElementChild.remove();
	}
	invalidateMediaCalc() {
		this.cachedFontSize = null, this.cachedMediaCalc = null;
	}
	visibility() {
		let e = this.model.visibility, t = document.getElementById("tg_all");
		t && (t.style.display = e ? "block" : "none");
	}
	render(e, t) {
		if (e === "init") {
			this.utils.ensureContainer(this.model.elem.wrapper.containerHtml);
			let e = document.getElementById("tg_wrapper");
			e && (e.innerHTML = this.model.elem.wrapper.svgHtml), this.elSvgGrid = document.getElementById("tg_grid"), this.elLayoutBody = document.getElementById("tg_layout__body"), this.elRowBody = document.getElementById("tg_row__body"), this.elRhythmBody = document.getElementById("tg_rhythm__body"), this.model.wrapperHeight(), this.visibility(), this.utils.insertStyleElem(this.model.config.styleBase), this.currentMedia = this.model.currentMedia, this.render("resize");
		} else if (e === "resize") {
			if (!this.currentMedia) return;
			this.cachedFontSize === null && (this.cachedFontSize = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, "html")), this.cachedMediaCalc === null && (this.cachedMediaCalc = q(this.currentMedia, this.cachedFontSize));
			let e = this.cachedMediaCalc, t = this.model.width(), n = this.utils.height();
			this.model.wrapperHeight(n), this.utils.setSvgSizes(this.elSvgGrid, t, n);
			let r = X(e, t, n);
			this.rhythm(r.rhythmLines), this.row(r.rows), this.layout(r.columns), this.base(), this.unit();
		} else if (e === "change") this.unit();
		else if (e === "media") {
			if (t === void 0) return;
			this.currentMedia = this.model.getJsonValues(t), this.cachedFontSize = null, this.cachedMediaCalc = null, this.elLayoutBody?.replaceChildren(), this.elRowBody?.replaceChildren(), this.elRhythmBody?.replaceChildren();
		}
	}
	base() {}
	unit() {}
	layout(e) {
		let t = this.elLayoutBody;
		t && this.syncSvgElements(t, e.length, "rect", (t, n, r) => {
			let i = e[n];
			r && (t.setAttribute("class", `rect-x${n}`), t.setAttribute("y", "0")), t.setAttribute("x", String(i.x)), t.setAttribute("width", String(i.width)), t.setAttribute("height", String(i.height));
		});
	}
	row(e) {
		let t = this.elRowBody;
		t && this.syncSvgElements(t, e.length, "rect", (t, n, r) => {
			let i = e[n];
			r && (t.setAttribute("class", `row-y${n}`), t.setAttribute("x", "0"), t.setAttribute("y", String(i.y)), t.setAttribute("height", String(i.height))), t.setAttribute("width", String(i.width));
		});
	}
	rhythm(e) {
		let t = this.elRhythmBody;
		t && this.syncSvgElements(t, e.length, "line", (t, n, r) => {
			let i = e[n];
			r && (t.setAttribute("class", `line-y${n}`), t.setAttribute("x1", "0"), t.setAttribute("y1", String(i.y1)), t.setAttribute("y2", String(i.y2))), t.setAttribute("x2", String(i.x2));
		});
	}
	ruler() {}
	guide() {}
	gui() {}
	keyboard() {}
	size() {}
};
//#endregion
//#region src/gui.ts
function $(e, t) {
	let n = e.user.media, r = n.contents.fontSize[t], i = n.contents.gutter[t];
	return {
		fontSize: r === "computed" ? parseFloat(getComputedStyle(document.documentElement).fontSize) : r ?? 16,
		lineHeight: n.contents.lineHeight[t] ?? 1.5,
		contentGutter: i === "auto" ? 0 : i ?? 0,
		columnNum: n.grids.column.num[t] ?? 4,
		columnGutter: n.grids.column.gutter[t] ?? 1,
		rowHeight: n.grids.row.height[t] ?? 4,
		rowGutter: n.grids.row.gutter[t] ?? 1
	};
}
function pe(e, t, n, r) {
	let i = r ?? window.lil?.GUI;
	if (!i) return null;
	let a = e.currentMediaIndex, o = $(e, a), s = () => {
		let e = t.current;
		if (!e.currentMedia) return;
		let n = e.currentMedia;
		n.contents.fontSize = o.fontSize, n.contents.lineHeight = o.lineHeight, n.contents.gutter = o.contentGutter, n.grids.column.num = o.columnNum, n.grids.column.gutter = o.columnGutter, n.grids.row.height = o.rowHeight, n.grids.row.gutter = o.rowGutter, e.invalidateMediaCalc(), e.resize();
	}, c = new i({ title: "typegrid" });
	c.domElement.style.zIndex = "99901";
	let l = c.addFolder("Contents"), u = c.addFolder("Column"), d = c.addFolder("Row");
	if (l.add(o, "fontSize").min(8).max(40).step(1).name("font-size (px)").onChange(s), l.add(o, "lineHeight").min(1).max(3).step(.025).name("line-height").onChange(s), l.add(o, "contentGutter").min(0).max(20).step(.25).name("side gutter (rem)").onChange(s), u.add(o, "columnNum").min(1).max(24).step(1).name("columns").onChange(s), u.add(o, "columnGutter").min(0).max(10).step(.25).name("gutter (rem)").onChange(s), d.add(o, "rowHeight").min(1).max(20).step(.125).name("height (rem)").onChange(s), d.add(o, "rowGutter").min(0).max(10).step(.125).name("gutter (rem)").onChange(s), c.add({ exportJson() {
		let t = JSON.parse(JSON.stringify(e.user)), n = a;
		t.media.contents.fontSize[n] = o.fontSize, t.media.contents.lineHeight[n] = o.lineHeight, t.media.contents.gutter[n] = o.contentGutter, t.media.grids.column.num[n] = o.columnNum, t.media.grids.column.gutter[n] = o.columnGutter, t.media.grids.row.height[n] = o.rowHeight, t.media.grids.row.gutter[n] = o.rowGutter;
		let r = new Blob([JSON.stringify(t, null, 4)], { type: "application/json" }), i = URL.createObjectURL(r), s = document.createElement("a");
		s.href = i, s.download = "typegrid.json", document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(i);
	} }, "exportJson").name("Export JSON"), n) {
		let e = { mode: "canvas" };
		c.add(e, "mode", ["canvas", "svg"]).name("renderer").onChange(() => {
			n(e.mode);
		});
	}
	return {
		updateMedia(t) {
			a = t, Object.assign(o, $(e, t)), c.controllersRecursive().forEach((e) => e.updateDisplay());
		},
		destroy() {
			c.destroy();
		}
	};
}
//#endregion
//#region src/controller.ts
var me = class {
	constructor(e, t, n) {
		this.unKeyBinds = () => {}, this.gui = null, this.utils = e, this.model = t, this.guiConstructor = n, this.activeRenderer = new Q(t), this.rendererRef = { current: this.activeRenderer }, this.unlistenMedia = this.setupMedia(), this.uncheckWindow = this.setupResize(), this.init();
	}
	init() {
		let e = () => {
			this.activeRenderer.init(), this.unKeyBinds = this.utils.keyBinds(this.model), this.gui = pe(this.model, this.rendererRef, (e) => {
				this.setRenderer(e);
			}, this.guiConstructor);
		};
		document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e, { once: !0 }) : e();
	}
	setupMedia() {
		return this.utils.listenMediaQueries(this.model, (e) => {
			this.activeRenderer.mediaChange(e), this.gui?.updateMedia(e);
		});
	}
	setupResize() {
		return this.utils.checkWindowSize(this.model, () => {
			this.activeRenderer.resize();
		});
	}
	setRenderer(e) {
		this.activeRenderer.destroy();
		let t = e === "canvas" ? new Q(this.model) : new fe(this.utils, this.model);
		t.init(), this.activeRenderer = t, this.rendererRef.current = t;
	}
	destroy() {
		this.unlistenMedia(), this.uncheckWindow(), this.unKeyBinds(), this.gui?.destroy(), this.activeRenderer.destroy();
	}
};
//#endregion
//#region src/main.ts
function he(e) {
	let t = null, n = null, r = {
		init() {
			n = new AbortController(), G((r) => {
				n = null, t = new me(h, new K(r), e?.gui);
			}, n.signal);
		},
		destroy() {
			n?.abort(), n = null, t &&= (t.destroy(), null);
		},
		setRenderer(e) {
			t?.setRenderer(e);
		}
	};
	return r.init(), r;
}
//#endregion
export { he as typegrid };
