!function(){"use strict";function t(){window.addEventListener("DOMContentLoaded",function(){console.log("Start typegrid.js!"),G(),M(),E(),H(),I(),W(),D(),L(),p(),f(),T(),Y(32),c(tg_contFontSize,X)},!1)}function e(t){return document.createElement(t)}function o(t){return document.createElementNS(nt,t)}function n(){return document.createDocumentFragment()}function r(t){return document.createTextNode(t)}function i(t,o,n,i){var l=e("label"),a=e("input"),u=r(o),s=r(n);l.setAttribute("for",i),a.setAttribute("id",i),a.setAttribute("name",i),a.setAttribute("type",t),l.appendChild(a),l.appendChild(u),l.appendChild(s)}function l(t){return document.getElementById(t)}function a(t){return document.getElementsByTagName(t).item(0)}function u(){return window.innerWidth||document.documentElement.clientWidth||0}function s(){return Math.max.apply(null,[document.body.clientHeight,document.body.scrollHeight,document.documentElement.scrollHeight,document.documentElement.clientHeight])}function d(t){var e=t.getAttribute("value");return console.log("Get value:"+e),e}function c(t,e){console.log("Set value:"+t),t.setAttribute("value",e)}function f(){l(O+"wrapInner").style.zIndex=et}function p(){l(O+"controller").style.zIndex=ot}function g(){var t="fill: none;stroke: #ccc;stroke-width:0.5";return"fill: none;stroke: #ccc;stroke-width:0.5"}function b(){var t="fill: none;stroke: #ccc;stroke-width: 0.5";return"fill: none;stroke: #ccc;stroke-width: 0.5"}function m(){var t="position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; height: auto;";return"position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; height: auto;"}function h(){var t="fill: rgba(153, 153, 153, 0.75);stroke: #ccc;stroke-width: 0";return"fill: rgba(153, 153, 153, 0.75);stroke: #ccc;stroke-width: 0"}function v(){var t='font-family: "Open Sans", Roboto, "Helvetica Neue", Helvetica, Verdana, "Droid Sans","游ゴシック", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "Meiryo UI", "メイリオ", Meiryo, sans-serif;color: #fff;position: fixed; bottom: 0; left: 0; width: 100%; height: auto; padding: 1em; background-color: rgba(0, 0, 0, 0.75);-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;-webkit-font-feature-settings: "palt"; -moz-font-feature-settings: "palt"; font-feature-settings: "palt";';return'font-family: "Open Sans", Roboto, "Helvetica Neue", Helvetica, Verdana, "Droid Sans","游ゴシック", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "Meiryo UI", "メイリオ", Meiryo, sans-serif;color: #fff;position: fixed; bottom: 0; left: 0; width: 100%; height: auto; padding: 1em; background-color: rgba(0, 0, 0, 0.75);-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;-webkit-font-feature-settings: "palt"; -moz-font-feature-settings: "palt"; font-feature-settings: "palt";'}function y(){var t="box-sizing: border-box; color: #333;border: none; background: #f1f1f1; font-size: 32px; width: 2.5em;height: 1.5em; padding: 0.125em 0; text-align: right; border-radius: 0.125em;";return"box-sizing: border-box; color: #333;border: none; background: #f1f1f1; font-size: 32px; width: 2.5em;height: 1.5em; padding: 0.125em 0; text-align: right; border-radius: 0.125em;"}function A(){var t="position: relative; clear: both;";return"position: relative; clear: both;"}function w(){var t="display: inline; font-size: 0.5em; letter-spacing: -0.25em;";return"display: inline; font-size: 0.5em; letter-spacing: -0.25em;"}function z(){var t="display: block; margin: 0.125em 0 -0.125em 0;";return"display: block; margin: 0.125em 0 -0.125em 0;"}function x(){var t="font-size: 0.5em; position: absolute; bottom: -1em; right: 0.25em; color: #333;";return"font-size: 0.5em; position: absolute; bottom: -1em; right: 0.25em; color: #333;"}function B(){var t="display: block; width: 5em; margin: 0.35em 0.25em 0 0; float: left;";return"display: block; width: 5em; margin: 0.35em 0.25em 0 0; float: left;"}function C(t){void 0==t&&(t=X);for(var e=n(),r=u()/t,i=Math.ceil(r),l=0;l<i;l++){console.log("X軸の実線："+i);var a=o("line");a.setAttribute("class","line-x"+l),a.setAttribute("x1",l*t),a.setAttribute("y1","0"),a.setAttribute("x2",l*t),a.setAttribute("y2",s()),a.setAttribute("style",g()),e.appendChild(a)}return e}function _(){for(var t=n(),e=u()/K,r=Math.ceil(e),i=0;i<r;i++){console.log("X軸の点線："+r);var l=o("line");l.setAttribute("class","line-x"+i),l.setAttribute("x1",i*K),l.setAttribute("y1","0"),l.setAttribute("x2",i*K),l.setAttribute("y2",s()),l.setAttribute("stroke-dasharray","1,1"),l.setAttribute("style",g()),t.appendChild(l)}return t}function S(t){void 0==t&&(t=X);for(var e=n(),r=s()/t,i=Math.ceil(r),l=0;l<i;l++){console.log("Y軸の実線："+i);var a=o("line");a.setAttribute("class","line-y"+l),a.setAttribute("x1","0"),a.setAttribute("y1",l*t),a.setAttribute("x2",u()),a.setAttribute("y2",l*t),a.setAttribute("style",g()),e.appendChild(a)}return e}function k(){for(var t=n(),e=s()/K,r=Math.ceil(e),i=0;i<r;i++){console.log("Y軸の点線："+r);var l=o("line");l.setAttribute("class","line-y"+i),l.setAttribute("x1","0"),l.setAttribute("y1",i*K),l.setAttribute("x2",u()),l.setAttribute("y2",i*K),l.setAttribute("stroke-dasharray","1,1"),l.setAttribute("style",g()),t.appendChild(l)}return t}function F(t){void 0==t&&(t=X);for(var e=n(),r=u()/t,i=Math.floor(r),l=0;2;l++){console.log("X軸の実線："+i);var a=o("rect");a.setAttribute("class","rect-x"+l),a.setAttribute("x",l*t),a.setAttribute("y","0"),a.setAttribute("width",t),a.setAttribute("height",s()),a.setAttribute("style",h()),e.appendChild(a)}return e}function G(){var t=e("div");t.id=O+"allWrapper",a("body").appendChild(t),console.log("2: #typeGridAllWrapperが生成されました。")}function M(){var t=e("div");t.id=O+"wrapBody";var o=e("div");o.id=O+"wrapInner",l(O+"allWrapper").appendChild(t),l(O+"wrapBody").appendChild(o),console.log("2: #typeGridAllWrapperが生成されました。")}function E(){var t=e("div");t.id=O+"controller",l(O+"allWrapper").appendChild(t);var o=e("form");o.setAttribute("id",O+"controllerBody"),o.setAttribute("name",O+"controllerBody"),l(O+"controller").appendChild(o),console.log("5: #controllerが生成されました。");var n=e("label"),i=e("input"),a=r("フォントサイズ"),u=r("Font size"),s=r("px"),d=e("span"),c=e("span"),f=e("span"),p=e("span");n.setAttribute("for",O+"contFontSize"),n.setAttribute("style",A()),i.setAttribute("id",O+"contFontSize"),i.setAttribute("name",O+"contFontSize"),i.setAttribute("type","number"),i.setAttribute("value",""),i.setAttribute("style",y()),n.appendChild(i),d.setAttribute("class",O+"labelBody"),d.setAttribute("style",B()),c.setAttribute("class",O+"labelJa"),c.setAttribute("style",w()),c.appendChild(a),f.setAttribute("class",O+"labelEn"),f.setAttribute("style",z()),f.appendChild(u),d.appendChild(f),d.appendChild(c),p.appendChild(s),p.setAttribute("style",x()),n.insertBefore(d,i),n.appendChild(p),o.appendChild(n)}function H(){var t=e("div");t.id=O+"gridGroup",l(O+"wrapInner").appendChild(t),console.log("3: #gridGroupが生成されました。");var n=o("svg");n.setAttribute("id",O+"gridBody"),n.setAttribute("width",u()),n.setAttribute("height",s()),n.setAttribute("viewBox","0 0 200 200"),l(t.id).appendChild(n)}function I(){var t=e("div");t.id=O+"colGroup",l(O+"wrapInner").appendChild(t),console.log("4: #colGroupが生成されました。");var n=o("svg");n.setAttribute("id",O+"colBody"),l(t.id).appendChild(n)}function V(){var t=new Array;return t.push("0 0 "),t.push(u()),t.push(" "),t.push(s()),t.join("")}function N(t){t.textContent=null,t.removeAttribute("viewBox"),t.setAttribute("viewBox",V()),t.setAttribute("width",u()),t.setAttribute("height",s())}function W(){var t=m(),e=v();l(O+"wrapInner").setAttribute("style",t),l(O+"gridGroup").setAttribute("style",t),l(O+"colGroup").setAttribute("style",t),l(O+"controller").setAttribute("style",e)}function D(){l(O+"wrapBody").setAttribute("style","pointer-events: none;")}function L(){var t=l(O+"gridBody"),e=l(O+"colBody");N(t),N(e),t.appendChild(S()),t.appendChild(C()),t.appendChild(k()),t.appendChild(_())}function P(t){var e=t;if(void 0==e){var e=document.forms.tg_controllerBody.tg_contFontSize.value=X,o=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=X;return!1}if(0==e)var e=document.forms.tg_controllerBody.tg_contFontSize.value=1,o=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=e;else{var n=l(O+"gridBody"),r=l(O+"colBody");console.log("resized."),console.log("width："+u()),console.log("height："+s()),console.log("viewboxの値："+V()),console.log("↑result."),N(n),N(r),n.appendChild(S(e)),n.appendChild(C(e)),n.appendChild(k()),n.appendChild(_())}}function T(){var t=document.forms.tg_controllerBody.tg_contFontSize.value,e=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=t,o=l(O+"contFontSize"),n,r=Math.floor(1e3/60*10);window.addEventListener("resize",function(t){if(void 0==e){console.log("値がundefinedのとき");var e=document.forms.tg_controllerBody.tg_contFontSize.value=X,o=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=X;return!1}if(0==e){console.log("値が0のとき"),P(e);var e=document.forms.tg_controllerBody.tg_contFontSize.value=1,o=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=e}else console.log("resizing..."),!1!==n&&clearTimeout(n),n=setTimeout(function(){P(e)},r)})}function Y(){var t=l(O+"controllerBody");l(O+"contFontSize").addEventListener("blur",function(){var t=document.forms.tg_controllerBody.tg_contFontSize.value,e=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=t;if(console.log("フォントサイズ "+t+"px"),void 0==t){console.log("値がundefinedのとき");var t=document.forms.tg_controllerBody.tg_contFontSize.value=X,e=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=X;return!1}if(0==t){console.log("値が0のとき");var t=document.forms.tg_controllerBody.tg_contFontSize.value=1,e=document.forms.tg_controllerBody.tg_contFontSize.defaultValue=t}else P(t)},!1)}var O="tg_",X=16,j=16/X,K=X/4,R="#aaa",U="#ccc",J="#00FFFF",q="",Q="left",Z=2*X,tt="#999",et=9998,ot=9999,nt="http://www.w3.org/2000/svg";t()}();