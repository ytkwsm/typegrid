export const console = {
    red:   "color:#f00;"
   ,green: "color:#0f0;"
   ,blue:  "color:#00f;"
}

export let common = {
     lib     : "typegrid.js"
    ,prefix  : "tg_"
    ,mode    : "horizontal-tb"//"horizontal-tb" or "vertical-rl"
}

export let size = {
    char: {
         px:   16
        ,em:    1
        ,rem:   1
    }
    ,unit: {
         px:      "px"
        ,em:      "em"
        ,rem:     "rem"
        ,percent: "%"
    }
    ,grids: {
        base:    {

        }
        ,width  : {
            content  : 16
        }
        ,height : {
            content  : 16
        }
        ,layout : {
            content  : 16
        }
    }
}

export const svg = {
    attr : {
         ns  : "http://www.w3.org/2000/svg"
    }
}

export const aria = {
     presen  : "role='presentation'"
    ,hidden  : "aria-hidden='true'"
}

export const styles = {
    pointerEvents : "pointer-events: none;"
}

export const elems = {
     column: {//カラム
         class  : "column"
        ,entity : "rect"
        ,fill   : "#999"
        ,stroke : "#999"
        ,css    : ""
        ,index  : 9998
     }
    ,unit : {//複数文字分のサイズ
         class  : "unit"
        ,entity : "rect"
        ,fill   : "#ccc"
        ,stroke : "#ccc"
        ,css    : ""
        ,index  : 9999
     }
    ,guide: {//ガイド線
         class  : "guide"
        ,entity : "line"
        ,fill   : "#00FFFF"
        ,stroke : "#00FFFF"
        ,css    : ""
        ,index  : 9998
     }
     ,ruler: {//ガイド線
          class  : "ruler"
         ,entity : "line"
         ,fill   : "#00FFFF"
         ,stroke : "#00FFFF"
         ,css    : ""
         ,index  : 9998
     }
    ,grid : {
         class  : "grid"
        ,entity : "rect"
        ,fill   : "#ccc"
        ,stroke : "#ccc"
        ,css    : ""
        ,index  : 9999
     }
    ,gutter : {//カラム間の幅
         class  : "gutter"
        ,entity : "rect"
        ,fill   : "#ccc"
        ,stroke : "#ccc"
        ,css    : ""
        ,index  : 9999
     }
}
