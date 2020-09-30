'use strict';
import * as config  from "../data/config";

export function tgFilePathOrigin() {
    const tgFilePathOriginBody = (function() {
        if (document.currentScript) {
            return document.currentScript.src;
        } else {
            const loadScripts = document.getElementsByTagName('script'),
            script = loadScripts[loadScripts.length-1];
            if (script.src) {
                return script.src;
            }
        }
    })();
    return tgFilePathOriginBody;
}

// export function convertHex (color) {
//     var ret = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*([.\d]+)?\)/.exec(color);
//     var convertHex = '';
//     for(var i=1;i<=3;i++){
//         var hex = Number(ret[i]).toString(16);
//         convertHex += (hex.length === 1)? '0' + hex : hex;
//     }
//     return convertHex;
// }

// export function setElem(name, attr, value, type) {
//     const elemName = name;
//     const attrName = attr;
//     const elemType = type;
//     if (elemType == null || "html") {
//         var elemTag = document.createElement(elemName);
//     } else if(elemType == "svg") {
//         var elemTag = document.createElementNS(config.svg.attr.ns, elemName)
//     }
//     if (attrName !== null) {
//         const attrValue = value;
//         elemTag.setAttribute(attrName, attrValue);
//     }
//     return elemTag;
// }

// function elemAppend(elem, type, name) {
//     const elemName     = elem;
//     const targetType   = type;
//     const targetName   = name;
//     if (targetType == null || "tag") {
//         var insertTarget = document.getElementsByTagName(targetName).item(0);
//     } else if(targetType == "id") {
//         var insertTarget = document.getElementById(targetName);
//     } else if(targetType == "class") {
//         var insertTarget =  function() {
//             return document.getElementsByClassName(targetName);
//         }
//     }
//     // var insertTarget = document.getElementsByTagName(targetName).item(0);
//     insertTarget.appendChild(elemName);
// }


// export function getId(id) {
//     return document.getElementById(id);
// }
// export function getTag(tag) {
//     return document.getElementsByTagName(tag).item(0);
// }
// export function getWidth() {
//     var currentWidth = window.innerWidth||document.documentElement.clientWidth||0;
// // 		var currentWidth = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
//     return currentWidth;
// }
// export function getHeight() {
//     var currentHeight = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
//     return currentHeight;
// }

// export function setElem(name, attr, value, type) {
//     const elemName = name;
//     const attrName = attr;
//     const elemType = type;
//     if (elemType == null || "html") {
//         var elemTag = document.createElement(elemName);
//     } else if(elemType == "svg") {
//         var elemTag = document.createElementNS(config.svg.attr.ns, elemName)
//     }
//     if (attrName !== null) {
//         const attrValue = value;
//         elemTag.setAttribute(attrName, attrValue);
//     }
//     return elemTag;
// }

// function elemAppend(elem, type, name) {
//     const elemName     = elem;
//     const targetType   = type;
//     const targetName   = name;
//     if (targetType == null || "tag") {
//         var insertTarget = document.getElementsByTagName(targetName).item(0);
//     } else if(targetType == "id") {
//         var insertTarget = document.getElementById(targetName);
//     } else if(targetType == "class") {
//         var insertTarget =  function() {
//             return document.getElementsByClassName(targetName);
//         }
//     }
//     // var insertTarget = document.getElementsByTagName(targetName).item(0);
//     insertTarget.appendChild(elemName);
// }

// export function getViewBox(currentWidth, currentHeight){
//     //ブラウザの現在のレンダリングエリアのサイズと同一の数値をviewbox属性の値として書き出す関数
//     //引数：横幅、縦幅
//     //使用例：getViewBox(getWidth(), getHeight());
//     var viewBoxValue = new Array();
//     viewBoxValue.push("0 0 ");
//     viewBoxValue.push(currentWidth);
//     viewBoxValue.push(" ");
//     viewBoxValue.push(currentHeight);
//     var svgViewBox = viewBoxValue.join('');
//     return svgViewBox;
// }

// export function setViewBox(targetSvg, currentViewBox, currentWidth, currentHeight) {
//     //引数に指定したSVG要素のviewbox属性を、ブラウザのレンダリングエリアのサイズで書き換える関数
//     //引数：対象SVG要素、viewboxの値、横幅、縦幅
//     //使用例：setSvgView(target, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
//     // targetSvg.textContent = null;
//     targetSvg.removeAttribute("viewBox");
//     targetSvg.setAttribute("viewBox", getViewBox(currentWidth,currentHeight));
//     targetSvg.setAttribute("width", currentWidth);
//     targetSvg.setAttribute("height", currentHeight);
// }


// export function setGrids() {
//     var gridBody = getId(tgPrefix + "gridBody");
//     var colBody = getId(tgPrefix + "colBody");
//         setViewBox(gridBody, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
//         setViewBox(colBody, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
//         gridBody.appendChild(loopGridSolidY());
//         gridBody.appendChild(loopGridSolidX());
//         gridBody.appendChild(loopGridDashY());
//         gridBody.appendChild(loopGridDashX());
// }
