'use strict';

export let debug = {
    count: {
        resize: 0
    }
    ,msg: {
        default:    "テストだよ。"
       ,resize:     "リサイズしたよ。"
       ,load:       "ロードだよ。"
       ,model:      "modelだよ。"
       ,view:       "viewだよ。"
       ,controller: "controllerだよ。"
       ,err: {
           deviceDicision: 'Please set "@media" or "userAgent" to general.deviceDecision of typegrid.json.'
       }
       ,attention: {
            deviceDecision: "Current typegrid.js does not support user agent judgment."
       }
    }
}

export const msg = {
    get: {
        notfound: "Can not find typegrid.json. Please put it in the same directory as typegrid.js. Please check if there is any problem with the structure of json when placing :)"
    }
}

export const lib = {
     name    : "typegrid.js"
    ,prefix  : "tg_"
    ,json: {
         file: "typegrid.json"
        ,storage: "typegrid_json"
    }
}

export const console = {
    red:   "color:#f00;"
   ,green: "color:#0f0;"
   ,blue:  "color:#00f;"
}

export let attr = {
    svg: {
         ns: "http://www.w3.org/2000/svg"
        ,width: 100
    }
}

export const aria = {
     presen  : "role='presentation'"
    ,hidden  : "aria-hidden='true'"
}

export let style = {
     mode: "horizontal-tb"//"horizontal-tb" or "vertical-rl"
    ,pointerEvents : "pointer-events: none;"
}

export const styleBase = `
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
`;

export let sizes = {
    test:      280
   ,char:       16
   ,gutter:      2
}

export let num = {
    grid:        1
   ,unit:        1
   ,guide:       1
   ,char:        1
}

export let color = {
    grid:   "#cccccc"
}

export let elem = {
    wrapper: {
         html: "<div id='tg_wrapper'><svg id='tg_grid'><g id='tg_base'><g id='tg_base__body'></g></g><g id='tg_unit'><g id='tg_unit__body'></g></g><g id='tg_sizes'><g id='tg_sizes__body'></g></g><g id='tg_chars'><g id='tg_chars__body'></g></g><g id='tg_layout'><g id='tg_layout__body'></g></g><g id='tg_row'><g id='tg_row__body'></g></g><g id='tg_rhythm'><g id='tg_rhythm__body'></g></g></svg></div><div id='tg_ruler'><div id='tg_ruler__body'></div></div><div id='tg_settings'></div><div id='tg_gui'><div id='tg_gui__body></div></div>"
    }
}

// export let size = {
//     char: {
//          px:   16
//         ,em:    1
//         ,rem:   1
//     }
//     ,unit: {
//          px:      "px"
//         ,em:      "em"
//         ,rem:     "rem"
//         ,percent: "%"
//     }
//     ,grids: {
//         base:    {

//         }
//         ,width  : {
//             content  : 16
//         }
//         ,height : {
//             content  : 16
//         }
//         ,layout : {
//             content  : 16
//         }
//     }
// }


// export const elems = {
//      column: {//カラム
//          class  : "column"
//         ,entity : "rect"
//         ,fill   : "#999"
//         ,stroke : "#999"
//         ,css    : ""
//         ,index  : 9998
//      }
//     ,unit : {//複数文字分のサイズ
//          class  : "unit"
//         ,entity : "rect"
//         ,fill   : "#ccc"
//         ,stroke : "#ccc"
//         ,css    : ""
//         ,index  : 9999
//      }
//     ,guide: {//ガイド線
//          class  : "guide"
//         ,entity : "line"
//         ,fill   : "#00FFFF"
//         ,stroke : "#00FFFF"
//         ,css    : ""
//         ,index  : 9998
//      }
//      ,ruler: {//ガイド線
//           class  : "ruler"
//          ,entity : "line"
//          ,fill   : "#00FFFF"
//          ,stroke : "#00FFFF"
//          ,css    : ""
//          ,index  : 9998
//      }
//     ,grid : {
//          class  : "grid"
//         ,entity : "rect"
//         ,fill   : "#ccc"
//         ,stroke : "#ccc"
//         ,css    : ""
//         ,index  : 9999
//      }
//     ,gutter : {//カラム間の幅
//          class  : "gutter"
//         ,entity : "rect"
//         ,fill   : "#ccc"
//         ,stroke : "#ccc"
//         ,css    : ""
//         ,index  : 9999
//      }
// }
