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
	let t = document.createElement("style"), n = document.getElementById("tg_all");
	n && (t.setAttribute("id", "tg_style"), t.textContent = e, n.appendChild(t));
}
function M(e, t) {
	let n = document.createElement("div"), r = document.body;
	n.setAttribute("id", "tg_all"), n.setAttribute("role", "presentation"), n.setAttribute("aria-hidden", "true"), r.appendChild(n), n.innerHTML = e;
}
function N(e, t, n) {
	let r = e.user.media.contents.breakPoints.width.min, i = e.user.media.devices, a = e.user.general.unit.breakPoints, o = -1, s = /* @__PURE__ */ new Map(), c = (t) => {
		o = t, e.currentMediaIndex = t, console.info(`[typegrid] media query matched: ${i[o]} (index: ${o})`), n(o);
	}, l = (e) => {
		let t = e.target;
		if (!t || !t.matches) return;
		let n = s.get(t);
		n !== void 0 && o !== n && c(n);
	};
	return r.forEach((t, n, r) => {
		let i = r[n + 1], c = [`screen and (min-width: ${t}${a})`];
		i !== void 0 && c.push(`and (max-width: ${i - 1}${a})`);
		let u = window.matchMedia(c.join(" "));
		s.set(u, n), u.addEventListener("change", l), u.matches && o !== n && (e.currentMedia = e.getJsonValues(n), e.currentMediaIndex = n, o = n);
	}), function() {
		s.forEach((e, t) => {
			t.removeEventListener("change", l);
		}), s.clear();
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
//#region src/validate.ts
function R(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function z(e, t, n = 1) {
	return Array.isArray(e) && e.length >= n && e.every(t);
}
var B = (e) => typeof e == "string", V = (e) => typeof e == "boolean", H = (e) => typeof e == "number" && isFinite(e), U = (e) => H(e) || e === "computed", W = (e) => H(e) || e === "auto", G = (e) => e === "fluid" || H(e);
function K(e) {
	let t = [];
	if (!R(e)) return {
		ok: !1,
		errors: ["config はオブジェクトである必要があります"]
	};
	let n = e.general;
	if (!R(n)) t.push("general が存在しないか不正な型です");
	else {
		V(n.visibility) || t.push("general.visibility は boolean が必要です"), V(n.fixed) || t.push("general.fixed は boolean が必要です"), B(n.deviceDecision) || t.push("general.deviceDecision は string が必要です");
		let e = n.unit;
		(!R(e) || !B(e.breakPoints)) && t.push("general.unit.breakPoints は string が必要です");
	}
	let r = e.media;
	if (!R(r)) return t.push("media が存在しないか不正な型です"), {
		ok: !1,
		errors: t
	};
	let i = r.devices;
	if (!z(i, B)) return t.push("media.devices は string[] (1件以上) が必要です"), {
		ok: !1,
		errors: t
	};
	let a = i.length, o = (e, n, r) => {
		(!z(n, r) || n.length !== a) && t.push(`${e} は長さ ${a} の配列が必要です`);
	}, s = r.contents;
	if (!R(s)) t.push("media.contents が存在しないか不正な型です");
	else {
		o("media.contents.writingMode", s.writingMode, B), o("media.contents.fontSize", s.fontSize, U), o("media.contents.lineHeight", s.lineHeight, H), o("media.contents.letterSpacing", s.letterSpacing, H), o("media.contents.gutter", s.gutter, W);
		let e = s.breakPoints;
		!R(e) || !R(e.width) ? t.push("media.contents.breakPoints.width が存在しないか不正な型です") : o("media.contents.breakPoints.width.min", e.width.min, H);
	}
	let c = r.grids;
	if (!R(c)) t.push("media.grids が存在しないか不正な型です");
	else {
		let e = (e, n) => {
			let r = c[e];
			if (!R(r)) {
				t.push(`media.grids.${e} が存在しないか不正な型です`);
				return;
			}
			for (let [t, i] of Object.entries(n)) o(`media.grids.${e}.${t}`, r[t], i);
		};
		e("base", {
			num: H,
			gutter: H
		}), e("column", {
			num: H,
			sizeChar: G,
			gutter: H
		}), e("row", {
			height: H,
			gutter: H
		}), e("unit", {
			num: H,
			gutter: H
		});
	}
	return t.length === 0 ? { ok: !0 } : {
		ok: !1,
		errors: t
	};
}
function q(e) {
	let t = K(e);
	return t.ok ? !0 : (console.warn("[typegrid] typegrid.json の設定に問題があります:"), t.errors.forEach((e) => console.warn(`  - ${e}`)), !1);
}
//#endregion
//#region src/user.ts
async function J(e, t) {
	let n = L(), r = (n.includes("typegrid.js") ? n.replace(/typegrid\.js$/g, "") : "/") + a.json.file;
	try {
		let n = await fetch(r, { signal: t });
		if (!n.ok) throw Error(i.get.notfound);
		let a = await n.json();
		if (!q(a)) return;
		e(a);
	} catch (e) {
		if (e instanceof DOMException && e.name === "AbortError") return;
		let t = e instanceof Error ? e.message : String(e);
		console.error(`[${a.name}] Failed to load typegrid.json:`, t);
	}
}
//#endregion
//#region src/model.ts
var Y = class {
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
}, X = "http://www.w3.org/2000/svg", Z = class {
	constructor(e, t) {
		this.currentMedia = null, this.cachedFontSize = null, this.cachedMediaCalc = null, this.elSvgGrid = null, this.elLayoutBody = null, this.elRowBody = null, this.elRhythmBody = null, this.utils = e, this.model = t;
	}
	wrapper(e, t) {
		this.utils.wrapper(e, t);
	}
	reset(e) {
		this.utils.reset(e);
	}
	syncSvgElements(e, t, n, r) {
		let i = e.children, a = Math.min(i.length, t);
		for (let e = 0; e < a; e++) r(i[e], e, !1);
		let o = document.createDocumentFragment();
		for (let e = i.length; e < t; e++) {
			let t = document.createElementNS(X, n);
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
		if (e === "init") this.wrapper(this.model.elem.wrapper.html, this.model), this.elSvgGrid = document.getElementById("tg_grid"), this.elLayoutBody = document.getElementById("tg_layout__body"), this.elRowBody = document.getElementById("tg_row__body"), this.elRhythmBody = document.getElementById("tg_rhythm__body"), this.model.wrapperHeight(), this.visibility(), this.utils.insertStyleElem(this.model.config.styleBase), this.utils.setSvgSizes(this.elSvgGrid, this.model.width(), this.utils.height()), this.currentMedia = this.model.currentMedia, this.render("resize");
		else if (e === "resize") {
			if (!this.currentMedia) return;
			if (this.cachedFontSize === null && (this.cachedFontSize = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, "html")), this.cachedMediaCalc === null) {
				let e = this.cachedFontSize, t = this.currentMedia.grids.column.num, n = this.currentMedia.grids.column.gutter, r = this.currentMedia.contents.gutter, i = this.currentMedia.grids.row.height, a = this.currentMedia.grids.row.gutter, o = e * n, s = o * t - o, c = this.utils.decisionGutterSideType(r, e), l = c * 2 / t;
				this.cachedMediaCalc = {
					fontSize: e,
					lineHeight: this.currentMedia.contents.lineHeight,
					columnNum: t,
					sizeChar: this.currentMedia.grids.column.sizeChar,
					gutterBaseWidth: o,
					gutterTotal: s,
					gutterSideEach: c,
					gutterSideInstallments: l,
					rowTotalHeight: (i + a) * e,
					rowHeightPx: i * e
				};
			}
			let e = this.cachedMediaCalc, t = this.model.width(), n = this.utils.height();
			this.model.wrapperHeight(n), this.utils.setSvgSizes(this.elSvgGrid, t, n), this.rhythm(e, t, n), this.row(e, t, n), this.layout(e, t, n), this.base(), this.unit();
		} else if (e === "change") this.unit();
		else if (e === "media") {
			if (t === void 0) return;
			this.currentMedia = this.model.getJsonValues(t), this.cachedFontSize = null, this.cachedMediaCalc = null, this.elLayoutBody?.replaceChildren(), this.elRowBody?.replaceChildren(), this.elRhythmBody?.replaceChildren();
		}
	}
	base() {}
	unit() {}
	layout(e, t, n) {
		let { fontSize: r, columnNum: i, sizeChar: a, gutterBaseWidth: o, gutterTotal: s, gutterSideInstallments: c } = e, l = this.utils.decisionColumnSizeType(r, a, t, i, s, c), u = (t - (s + l * i)) / 2, d = o + l, f = String(l), p = String(n), m = this.elLayoutBody;
		m && this.syncSvgElements(m, i, "rect", (e, t, n) => {
			n && (e.setAttribute("class", `rect-x${t}`), e.setAttribute("y", "0")), e.setAttribute("x", String(t * d + u)), e.setAttribute("width", f), e.setAttribute("height", p);
		});
	}
	row(e, t, n) {
		let { rowTotalHeight: r, rowHeightPx: i } = e, a = Math.floor(n / r) + 1, o = String(t), s = String(i), c = this.elRowBody;
		c && this.syncSvgElements(c, a, "rect", (e, t, n) => {
			n && (e.setAttribute("class", `row-y${t}`), e.setAttribute("x", "0"), e.setAttribute("y", String(Math.floor(t * r))), e.setAttribute("height", s)), e.setAttribute("width", o);
		});
	}
	rhythm(e, t, n) {
		let { fontSize: r, lineHeight: i } = e, a = Math.floor(n / r * i), o = r * i / 2, s = String(t), c = this.elRhythmBody;
		c && this.syncSvgElements(c, a, "line", (e, t, n) => {
			if (n) {
				let n = String(t * o);
				e.setAttribute("class", `line-y${t}`), e.setAttribute("x1", "0"), e.setAttribute("y1", n), e.setAttribute("y2", n);
			}
			e.setAttribute("x2", s);
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
function Q(e, t) {
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
function $(e, t, n) {
	let r = n ?? window.lil?.GUI;
	if (!r) return null;
	let i = e.currentMediaIndex, a = Q(e, i), o = () => {
		if (!t.currentMedia) return;
		let e = t.currentMedia;
		e.contents.fontSize = a.fontSize, e.contents.lineHeight = a.lineHeight, e.contents.gutter = a.contentGutter, e.grids.column.num = a.columnNum, e.grids.column.gutter = a.columnGutter, e.grids.row.height = a.rowHeight, e.grids.row.gutter = a.rowGutter, t.invalidateMediaCalc(), t.render("resize");
	}, s = new r({ title: "typegrid" });
	s.domElement.style.zIndex = "99901";
	let c = s.addFolder("Contents"), l = s.addFolder("Column"), u = s.addFolder("Row");
	return c.add(a, "fontSize").min(8).max(40).step(1).name("font-size (px)").onChange(o), c.add(a, "lineHeight").min(1).max(3).step(.025).name("line-height").onChange(o), c.add(a, "contentGutter").min(0).max(20).step(.25).name("side gutter (rem)").onChange(o), l.add(a, "columnNum").min(1).max(24).step(1).name("columns").onChange(o), l.add(a, "columnGutter").min(0).max(10).step(.25).name("gutter (rem)").onChange(o), u.add(a, "rowHeight").min(1).max(20).step(.125).name("height (rem)").onChange(o), u.add(a, "rowGutter").min(0).max(10).step(.125).name("gutter (rem)").onChange(o), s.add({ exportJson() {
		let t = JSON.parse(JSON.stringify(e.user)), n = i;
		t.media.contents.fontSize[n] = a.fontSize, t.media.contents.lineHeight[n] = a.lineHeight, t.media.contents.gutter[n] = a.contentGutter, t.media.grids.column.num[n] = a.columnNum, t.media.grids.column.gutter[n] = a.columnGutter, t.media.grids.row.height[n] = a.rowHeight, t.media.grids.row.gutter[n] = a.rowGutter;
		let r = new Blob([JSON.stringify(t, null, 4)], { type: "application/json" }), o = URL.createObjectURL(r), s = document.createElement("a");
		s.href = o, s.download = "typegrid.json", document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(o);
	} }, "exportJson").name("Export JSON"), {
		updateMedia(t) {
			i = t, Object.assign(a, Q(e, t)), s.controllersRecursive().forEach((e) => e.updateDisplay());
		},
		destroy() {
			s.destroy();
		}
	};
}
//#endregion
//#region src/controller.ts
var ee = class {
	constructor(e, t, n, r) {
		this.unKeyBinds = () => {}, this.gui = null, this.utils = e, this.model = t, this.view = n, this.guiConstructor = r, this.unlistenMedia = this.media(), this.uncheckWindow = this.resize(), this.init();
	}
	init() {
		let e = () => {
			this.view.render("init"), this.unKeyBinds = this.utils.keyBinds(this.model, this.view), this.gui = $(this.model, this.view, this.guiConstructor);
		};
		document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e, { once: !0 }) : e();
	}
	media() {
		return this.utils.listenMediaQueries(this.model, this.view, (e) => {
			this.view.render("media", e), this.gui?.updateMedia(e);
		});
	}
	resize() {
		return this.utils.checkWindowSize(this.model, this.view, () => {
			this.view.render("resize");
		});
	}
	destroy() {
		this.unlistenMedia(), this.uncheckWindow(), this.unKeyBinds(), this.gui?.destroy();
	}
};
//#endregion
//#region src/main.ts
function te(e) {
	let t = null, n = null, r = {
		init() {
			n = new AbortController(), J((r) => {
				n = null;
				let i = new Y(r);
				t = new ee(h, i, new Z(h, i), e?.gui);
			}, n.signal);
		},
		destroy() {
			n?.abort(), n = null, t &&= (t.destroy(), null);
		}
	};
	return r.init(), r;
}
//#endregion
export { te as typegrid };
