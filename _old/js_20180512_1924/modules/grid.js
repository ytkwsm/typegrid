import * as config  from "../data/config";
import * as code    from "../snippet/shortcode";

let tgCharSizeBase = 16;

export function setGrids() {
    var gridsInner = code.getId(config.common.prefix + "gridsInner");
    // var colBody = code.getId(tgPrefix + "colBody");
        code.setViewBox(gridsInner, code.getViewBox(code.getWidth(), code.getHeight()),code.getWidth(), code.getHeight());
        // setViewBox(colBody, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
        // gridBody.appendChild(loopGridSolidY());
        // gridBody.appendChild(loopGridSolidX());
        // gridBody.appendChild(loopGridDashY());
        // gridBody.appendChild(loopGridDashX());
}

// algorithm /////////////////////////////////////
//loop
export function loopGridSolidX(fontSize) {
    if(fontSize == undefined){
        fontSize = tgCharSizeBase;
    }
    var fragGrids = creFrag();
    var calcGridNum  = getWidth() / fontSize;
    var floorNum = Math.ceil(calcGridNum);
    for(var cnt = 0; cnt < floorNum; cnt ++){
        console.log("X軸の実線：" + floorNum);
        var line = creEleNS("line");
        line.setAttribute("class", "line-x" + cnt);
        line.setAttribute("x1", cnt * fontSize);
        line.setAttribute("y1", "0");
        line.setAttribute("x2", cnt * fontSize);
        line.setAttribute("y2", getHeight());
        line.setAttribute("style", setLineStyleSolid());
        fragGrids.appendChild(line);
    }
    return fragGrids;
}
export function loopGridDashX() {
    var fragGrids = creFrag();
    var calcGridNum  = getWidth() / tgDashArray;
    var floorNum = Math.ceil(calcGridNum);
    for(var cnt = 0; cnt < floorNum; cnt ++){
        console.log("X軸の点線：" + floorNum);
        var line = creEleNS("line");
        line.setAttribute("class", "line-x" + cnt);
        line.setAttribute("x1", cnt * tgDashArray);
        line.setAttribute("y1", "0");
        line.setAttribute("x2", cnt * tgDashArray);
        line.setAttribute("y2", getHeight());
        line.setAttribute("stroke-dasharray", "1,1");
        line.setAttribute("style", setLineStyleSolid());
        fragGrids.appendChild(line);
    }
    return fragGrids;
}
export function loopGridSolidY(fontSize) {
    if(fontSize == undefined){
        fontSize = tgCharSizeBase;
    }
    var fragGrids = creFrag();
    var calcGridNum  = getHeight() / fontSize;
    var floorNum = Math.ceil(calcGridNum);
    for(var cnt = 0; cnt < floorNum; cnt ++){
        console.log("Y軸の実線：" + floorNum);
        var line = creEleNS("line");
        line.setAttribute("class", "line-y" + cnt);
        line.setAttribute("x1", "0");
        line.setAttribute("y1", cnt * fontSize);
        line.setAttribute("x2", getWidth());
        line.setAttribute("y2", cnt * fontSize);
        line.setAttribute("style", setLineStyleSolid());
        fragGrids.appendChild(line);
    }
    return fragGrids;
}
export function loopGridDashY() {
    var fragGrids = creFrag();
    var calcGridNum  = getHeight() / tgDashArray;
    var floorNum = Math.ceil(calcGridNum);
    for(var cnt = 0; cnt < floorNum; cnt ++){
        console.log("Y軸の点線：" + floorNum);
        var line = creEleNS("line");
        line.setAttribute("class", "line-y" + cnt);
        line.setAttribute("x1", "0");
        line.setAttribute("y1", cnt * tgDashArray);
        line.setAttribute("x2", getWidth());
        line.setAttribute("y2", cnt * tgDashArray);
        line.setAttribute("stroke-dasharray", "1,1");
        line.setAttribute("style", setLineStyleSolid());
        fragGrids.appendChild(line);
    }
    return fragGrids;
}
