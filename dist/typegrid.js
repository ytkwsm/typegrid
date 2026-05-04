const k = {
  count: {
    resize: 0
  }
}, $ = {
  get: {
    notfound: "Cannot find typegrid.json. Please put it in the same directory as typegrid.js."
  },
  attention: {
    deviceDecision: "Current typegrid.js does not support user agent judgment."
  },
  err: {
    deviceDicision: 'Please set "@media" or "userAgent" to general.deviceDecision of typegrid.json.'
  }
}, _ = {
  name: "typegrid.js",
  prefix: "tg_",
  json: {
    file: "typegrid.json",
    storage: "typegrid_json"
  }
}, H = {
  red: "color:#f00;",
  green: "color:#0f0;",
  blue: "color:#00f;"
}, C = {
  svg: {
    ns: "http://www.w3.org/2000/svg",
    width: 100
  }
}, B = {
  presen: "role='presentation'",
  hidden: "aria-hidden='true'"
}, x = {
  mode: "horizontal-tb",
  // "horizontal-tb" | "vertical-rl"
  pointerEvents: "pointer-events: none;"
}, j = `
#tg_all {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99900;
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 100%;
    overflow: hidden;
    font-feature-settings: "palt";
    pointer-events: none;
}
#tg_originForWidth {
    pointer-events: none;
    position: absolute;
    top: 0;
    width: calc(100vw - 100%);
    height: 1px;
    opacity: 0;
}
#tg_wrapper {
    pointer-events: none;
}
#tg_ruler {
    width: 100%;
    min-width: 100%;
}
#tg_ruler, #tg_setting, #tg_gui {
    pointer-events: auto;
}
`, T = {
  test: 280,
  char: 16,
  gutter: 2
}, W = {
  grid: 1,
  unit: 1,
  guide: 1,
  char: 1
}, O = {
  grid: "#cccccc"
}, N = {
  wrapper: {
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
    ].join("")
  }
}, U = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aria: B,
  attr: C,
  color: O,
  consoleCss: H,
  debug: k,
  elem: N,
  lib: _,
  msg: $,
  num: W,
  sizes: T,
  style: x,
  styleBase: j
}, Symbol.toStringTag, { value: "Module" }));
function V(i) {
  return U[i];
}
function P() {
  const i = document.createElement("div");
  i.style.visibility = "hidden", i.style.overflow = "scroll", document.body.appendChild(i);
  const t = i.offsetWidth - i.clientWidth;
  return document.body.removeChild(i), t;
}
function L() {
  const i = Math.max(window.innerHeight, document.documentElement.clientHeight), t = Math.max(document.body.scrollHeight, document.body.clientHeight);
  return i < t;
}
function F() {
  const i = document.getElementById("tg_wrapper");
  i && (i.style.height = `${z()}px`);
}
function D() {
  return window.innerWidth || document.documentElement.clientWidth || 0;
}
function z() {
  return Math.max(
    window.innerHeight,
    document.documentElement.clientHeight,
    document.body.offsetHeight,
    document.body.clientHeight,
    document.body.scrollHeight
  );
}
function Q() {
  const i = navigator.userAgent;
  i.indexOf("iPhone") > 0 || i.indexOf("Android") > 0 && i.indexOf("Mobile") > 0 ? console.info("[typegrid] UA: mobile detected") : i.indexOf("iPad") > 0 || i.indexOf("Android") > 0 ? console.info("[typegrid] UA: tablet detected") : console.info("[typegrid] UA: desktop detected");
}
function A(i) {
  const t = document.getElementsByTagName(i).item(0);
  if (!t)
    throw new Error(`[typegrid] Element <${i}> not found.`);
  return window.getComputedStyle(t);
}
function G(i) {
  const t = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*([.\d]+)?\)/.exec(i);
  if (!t) return "";
  let e = "";
  for (let n = 1; n <= 3; n++) {
    const r = Number(t[n]).toString(16);
    e += r.length === 1 ? `0${r}` : r;
  }
  return e;
}
function q(i, t) {
  if (i === "computed") {
    const e = A(t);
    return parseFloat(e.fontSize);
  }
  return i;
}
function J(i) {
  const t = A(i);
  console.info(
    `[typegrid] <${i}> styles —`,
    `font-size: ${t.fontSize};`,
    `line-height: ${t.lineHeight};`,
    `color: #${G(t.color)};`
  );
}
function I(i, t) {
  return i === "auto" ? 0 : i * t;
}
function K(i, t, e, n, r, d) {
  const c = e - r;
  return t === "fluid" ? c / n - d : i * t - d;
}
function X(i, t, e) {
  const n = document.getElementById(i);
  n && (n.setAttribute("width", String(t)), n.setAttribute("height", String(e)), n.setAttribute("viewBox", `0 0 ${t} ${e}`));
}
function Y(i) {
  i.textContent = null;
}
function Z(i) {
  const t = document.createElement("style"), e = document.getElementById("tg_all");
  e && (t.setAttribute("id", "tg_style"), t.textContent = i, e.appendChild(t));
}
function tt(i, t) {
  const e = document.createElement("div"), n = document.body;
  e.setAttribute("id", "tg_all"), e.setAttribute("role", "presentation"), e.setAttribute("aria-hidden", "true"), n.appendChild(e), e.innerHTML = i;
}
function et(i, t, e) {
  const n = i.user.media.contents.breakPoints.width.min, r = i.user.media.devices, d = i.user.general.unit.breakPoints;
  let c = -1;
  const h = [], f = (o) => {
    c = o, console.info(
      `[typegrid] media query matched: ${r[c]} (index: ${c})`
    ), e(c);
  }, m = (o) => {
    if (o.matches) {
      const s = o.typegridIndex;
      if (s !== void 0 && !isNaN(s) && c !== s)
        return s;
    }
    return -1;
  }, l = (o) => {
    const s = o.target;
    if (!s) return;
    const u = m(s);
    u > -1 && f(u);
  };
  return n.forEach((o, s, u) => {
    const b = u[s + 1], p = [`screen and (min-width: ${o}${d})`];
    b !== void 0 && p.push(`and (max-width: ${b - 1}${d})`);
    const g = window.matchMedia(p.join(" "));
    if (g.typegridIndex = s, g.addEventListener("change", l), h.push(g), g.matches) {
      const y = m(g);
      y > -1 && (i.currentMedia = i.getJsonValues(y));
    }
  }), function() {
    h.forEach((s) => {
      s.removeEventListener("change", l);
    });
  };
}
function it(i, t, e) {
  let n = -1;
  const r = () => {
    n === -1 && (n = window.setTimeout(() => {
      i.debug.count.resize += 1, e(), clearTimeout(n), n = -1;
    }, 300));
  };
  return window.addEventListener("resize", r, !1), function() {
    window.removeEventListener("resize", r, !1);
  };
}
function nt(i, t) {
  let e = i.visibility, n = i.fixed;
  const r = document.getElementById("tg_all");
  r && document.body.addEventListener("keydown", (d) => {
    d.key === "g" && (e = !e, r.style.display = e ? "block" : "none"), d.key === "p" && (n = !n, r.style.position = n ? "fixed" : "absolute");
  });
}
function rt(i, t, e) {
  return t.map((n, r) => r === 0 ? `screen and (max-width: ${t[r + 1] - 1}${e})` : r === t.length - 1 ? `screen and (min-width: ${n}${e})` : `screen and (min-width: ${n}${e}) and (max-width: ${t[r + 1] - 1}${e})`);
}
const E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildMediaQueries: rt,
  calcScrollbarWidth: P,
  checkBrowserHeight: L,
  checkWindowSize: it,
  convertComputedFontSize: q,
  convertHex: G,
  decisionColumnSizeType: K,
  decisionGutterSideType: I,
  getElementTagStyle: A,
  getJSON: V,
  getStyles: J,
  height: z,
  insertStyleElem: Z,
  keyBinds: nt,
  listenMediaQueries: et,
  reset: Y,
  setSvgSizes: X,
  setWrapperHeight: F,
  ua: Q,
  width: D,
  wrapper: tt
}, Symbol.toStringTag, { value: "Module" }));
function st() {
  if (document.currentScript)
    return document.currentScript.src;
  const i = document.getElementsByTagName("script"), t = i[i.length - 1];
  return t != null && t.src ? t.src : "";
}
function ot(i) {
  const e = st().replace(/typegrid\.js$/g, "") + _.json.file;
  fetch(e).then((n) => {
    if (n.ok)
      return n.json();
    throw new Error($.get.notfound);
  }).then(i).catch((n) => {
    n instanceof Error ? console.error(`[${_.name}] Failed to load typegrid.json:`, n.message) : console.error(`[${_.name}] Failed to load typegrid.json:`, n);
  });
}
class dt {
  constructor(t) {
    this.currentMedia = null, this.debug = k, this.lib = _, this.consoleCss = H, this.attr = C, this.aria = B, this.style = x, this.sizes = T, this.num = W, this.color = O, this.elem = N, this.config = { styleBase: j }, this.user = t, this.devices = t.media.devices, this.fontSize = t.media.contents.fontSize, this.visibility = t.general.visibility, this.fixed = t.general.fixed, this.scrollbarWidth = P(), this.width(), this.height(), this.ua(), this.keyboard(), this.size(), this.getStyle();
  }
  /**
   * 指定インデックスのデバイス設定スナップショットを返す。
   * view がリサイズ・メディア切替時に呼び出す。
   */
  getJsonValues(t) {
    const e = this.user.media;
    return {
      devices: e.devices[t],
      contents: {
        writingMode: e.contents.writingMode[t],
        fontSize: e.contents.fontSize[t],
        lineHeight: e.contents.lineHeight[t],
        letterSpacing: e.contents.letterSpacing[t],
        breakPoints: {
          width: {
            min: e.contents.breakPoints.width.min[t]
          }
        },
        gutter: e.contents.gutter[t]
      },
      grids: {
        base: {
          num: e.grids.base.num[t],
          gutter: e.grids.base.gutter[t]
        },
        column: {
          num: e.grids.column.num[t],
          sizeChar: e.grids.column.sizeChar[t],
          gutter: e.grids.column.gutter[t]
        },
        row: {
          height: e.grids.row.height[t],
          gutter: e.grids.row.gutter[t]
        },
        unit: {
          num: e.grids.unit.num[t],
          gutter: e.grids.unit.gutter[t]
        }
      }
    };
  }
  width() {
    const t = L(), e = D();
    return t ? e - this.scrollbarWidth : e;
  }
  height() {
    return z();
  }
  wrapperHeight() {
    F();
  }
  ua() {
    Q();
  }
  /** スタブ（未実装） */
  base() {
  }
  /** スタブ（未実装） */
  unit() {
  }
  /** スタブ（未実装） */
  layout() {
  }
  row() {
  }
  rhythm() {
  }
  /** スタブ（未実装） */
  ruler() {
  }
  /** スタブ（未実装） */
  guide() {
  }
  /** スタブ（未実装） */
  gui() {
  }
  keyboard() {
  }
  size() {
  }
  getStyle() {
    J("html");
  }
}
class ct {
  constructor(t, e) {
    this.currentMedia = null, this.utils = t, this.model = e;
  }
  wrapper(t, e) {
    this.utils.wrapper(t, e);
  }
  reset(t) {
    this.utils.reset(t);
  }
  visibility() {
    const t = this.model.visibility, e = document.getElementById("tg_all");
    e && e.setAttribute("style", `display: ${t ? "block" : "none"}`);
  }
  render(t, e) {
    if (t === "init")
      this.wrapper(this.model.elem.wrapper.html, this.model), this.model.wrapperHeight(), this.visibility(), this.utils.insertStyleElem(this.model.config.styleBase), this.utils.setSvgSizes("tg_grid", this.model.width(), this.utils.height()), this.currentMedia = this.model.currentMedia, this.render("resize");
    else if (t === "resize") {
      if (!this.currentMedia) return;
      const n = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, "html"), r = this.currentMedia.contents.lineHeight, d = this.model.width(), c = this.utils.height();
      this.model.wrapperHeight();
      const h = this.currentMedia.grids.column.num, f = this.currentMedia.grids.column.sizeChar, m = this.currentMedia.grids.row.height, l = this.currentMedia.grids.row.gutter, o = this.currentMedia.grids.column.gutter, s = this.currentMedia.contents.gutter;
      this.utils.setSvgSizes("tg_grid", d, c), this.rhythm(n, r, d, c), this.row(n, r, d, c, m, l), this.layout(n, d, c, h, f, o, s), this.base(), this.unit();
    } else if (t === "change")
      this.unit();
    else if (t === "media") {
      if (e === void 0) return;
      this.currentMedia = this.model.getJsonValues(e);
    }
  }
  base() {
  }
  unit() {
  }
  layout(t, e, n, r, d, c, h) {
    const f = t, m = e, l = n, o = r, s = f * c, u = s * o - s, p = this.utils.decisionGutterSideType(h, f) * 2 / o, g = this.utils.decisionColumnSizeType(
      f,
      d,
      m,
      o,
      u,
      p
    ), y = g * o, a = u + y, R = (m - a) / 2, S = document.getElementById("tg_layout__body");
    if (!S) return;
    this.reset(S);
    const M = document.createDocumentFragment();
    for (let v = 0; v < o; v++) {
      const w = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      w.setAttribute("class", `rect-x${v}`), w.setAttribute("x", String(s * v + v * g + R)), w.setAttribute("y", "0"), w.setAttribute("width", String(g)), w.setAttribute("height", String(l)), w.setAttribute("fill", "#ff0000"), w.setAttribute("fill-opacity", "0.125"), w.setAttribute("stroke", "#ff0000"), w.setAttribute("stroke-opacity", "0.5"), M.appendChild(w);
    }
    S.appendChild(M);
  }
  row(t, e, n, r, d, c) {
    const h = t, f = n, m = r, l = d, o = c, u = (l + o) * h, b = Math.floor(m / u) + 1, p = document.getElementById("tg_row__body");
    if (!p) return;
    this.reset(p);
    const g = document.createDocumentFragment();
    for (let y = 0; y < b; y++) {
      const a = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      a.setAttribute("class", `row-y${y}`), a.setAttribute("x", "0"), a.setAttribute("y", String(Math.floor(y * l * h + y * o * h))), a.setAttribute("width", String(f)), a.setAttribute("height", String(l * h)), a.setAttribute("fill", "#ff0000"), a.setAttribute("fill-opacity", "0.125"), a.setAttribute("stroke", "#ff0000"), a.setAttribute("stroke-opacity", "0.5"), g.appendChild(a);
    }
    p.appendChild(g);
  }
  rhythm(t, e, n, r) {
    const d = t, c = e, h = n, m = Math.floor(r / d * c), l = document.getElementById("tg_rhythm__body");
    if (!l) return;
    this.reset(l);
    const o = document.createDocumentFragment();
    for (let s = 0; s < m; s++) {
      const u = document.createElementNS("http://www.w3.org/2000/svg", "line");
      u.setAttribute("class", `line-y${s}`), u.setAttribute("x1", "0"), u.setAttribute("y1", String(s * d * c / 2)), u.setAttribute("x2", String(h)), u.setAttribute("y2", String(s * d * c / 2)), u.setAttribute("fill", "none"), u.setAttribute("stroke", "#999999"), u.setAttribute("stroke-width", "0.5"), u.setAttribute("stroke-opacity", "0.75"), o.appendChild(u);
    }
    l.appendChild(o);
  }
  ruler() {
  }
  guide() {
  }
  gui() {
  }
  keyboard() {
  }
  size() {
  }
}
class ut {
  constructor(t, e, n) {
    this.utils = t, this.model = e, this.view = n, this.unlistenMedia = this.media(), this.uncheckWindow = this.resize(), this.init(), this.keyBinds();
  }
  /** DOMContentLoaded または即時に view.render('init') を呼ぶ */
  init() {
    const t = () => {
      this.view.render("init");
    };
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", t) : t();
  }
  /**
   * メディアクエリのリスナーを登録する。
   * @returns リスナー解除関数
   */
  media() {
    const t = (e) => {
      this.view.render("media", e);
    };
    return this.utils.listenMediaQueries(this.model, this.view, t);
  }
  /**
   * window resize リスナーを登録する。
   * @returns リスナー解除関数
   */
  resize() {
    const t = () => {
      this.view.render("resize");
    };
    return this.utils.checkWindowSize(this.model, this.view, t);
  }
  keyBinds() {
    this.utils.keyBinds(this.model, this.view);
  }
  /**
   * 登録済みのすべてのリスナーを解除する。
   * アンマウント時に呼び出す。
   */
  destroy() {
    this.unlistenMedia(), this.uncheckWindow();
  }
}
function lt() {
  let i = null;
  const t = {
    init() {
      ot((e) => {
        const n = new dt(e), r = new ct(E, n);
        i = new ut(E, n, r);
      });
    },
    destroy() {
      i && (i.destroy(), i = null);
    }
  };
  return t.init(), t;
}
export {
  lt as typegrid
};
