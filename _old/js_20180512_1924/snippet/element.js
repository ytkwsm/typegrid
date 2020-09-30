import * as config  from "../data/config";
import * as elem    from "../snippet/element";

export function setElem(name, attr, value, type) {
    const elemName = name;
    const attrName = attr;
    const elemType = type;
    if (elemType == null || "html") {
        var elemTag = document.createElement(elemName);
    } else if(elemType == "svg") {
        var elemTag = document.createElementNS(config.svg.attr.ns, elemName)
    }
    if (attrName !== null) {
        const attrValue = value;
        elemTag.setAttribute(attrName, attrValue);
    }
    return elemTag;
}

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
