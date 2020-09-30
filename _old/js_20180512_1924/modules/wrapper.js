import * as config  from "../data/config";
import * as code    from "../snippet/shortcode";
import * as grid    from "../modules/grid";

const prefix = config.common.prefix;

export function createWrapAll() {// typegrid.jsで生成される全ての要素をまとめるルートの要素を生成する関数
    const wrapAll          = code.setElem("div",  "id", prefix + "wrapAll");
    const wrapBody         = code.setElem("div",  "id", prefix + "wrapBody");
    const wrapInner        = code.setElem("div",  "id", prefix + "wrapInner");
    const rulerBody        = code.setElem("div",  "id", prefix + "rulerBody");
    const rulerInner       = code.setElem("div",  "id", prefix + "rulerInner");
    const guiBody          = code.setElem("div",  "id", prefix + "guiBody");
    const guiInner         = code.setElem("div",  "id", prefix + "guiInner");
    const gridsBody        = code.setElem("div",  "id", prefix + "gridsBody");
    const gridsInner       = code.setElem("svg",  "id", prefix + "gridsInner", "svg");

    wrapAll.setAttribute("role", "presentation");
    var insertTarget = document.getElementsByTagName("body").item(0);
    insertTarget.appendChild(wrapAll);

    var insertTarget = code.getId(prefix + "wrapAll");
    insertTarget.appendChild(wrapBody);

    var insertTarget = code.getId(prefix + "wrapBody");
    insertTarget.appendChild(wrapInner);

    gridsBody.setAttribute("style", config.styles.pointerEvents);
    var insertTarget = code.getId(prefix + "wrapInner");
    insertTarget.appendChild(gridsBody);

    var insertTarget = code.getId(prefix + "gridsBody");
    insertTarget.appendChild(gridsInner);

    var insertTarget = code.getId(prefix + "wrapInner");
    insertTarget.appendChild(rulerBody);

    var insertTarget = code.getId(prefix + "rulerBody");
    insertTarget.appendChild(rulerInner);

    var insertTarget = code.getId(prefix + "wrapInner");
    insertTarget.appendChild(guiBody);

    var insertTarget = code.getId(prefix + "guiBody");
    insertTarget.appendChild(guiInner);
    console.log("done: wrapper.createWrapAll()");
}

export function createWrapGridsPrimary() {// typegrid.jsで生成される全ての要素をまとめるルートの要素を生成する関数
    const gridsPrimary     = code.setElem("g",    "id", prefix + "gridsPrimary", "svg");//これと、下部3つのALLは分けた方がいいかも
    const lineAll          = code.setElem("g", "class", prefix + "lineAll", "svg");
    const layoutAll        = code.setElem("g", "class", prefix + "layoutAll", "svg");
    const unitAll          = code.setElem("g", "class", prefix + "unitAll", "svg");

    var insertTarget = code.getId(prefix + "gridsInner");
    insertTarget.appendChild(gridsPrimary);

    var insertTarget = code.getId(prefix + "gridsPrimary");
    insertTarget.appendChild(lineAll);

    var insertTarget = code.getId(prefix + "gridsPrimary");
    insertTarget.appendChild(layoutAll);

    var insertTarget = code.getId(prefix + "gridsPrimary");
    insertTarget.appendChild(unitAll);
    console.log("done: wrapper.createWrapGridsPrimary()");

    grid.setGrids();
}

export function createInner() {//ルートの要素の直下にUIとグリッドを囲むための要素を生成する関数
    console.log("done: wrapper.createInner()");
}
