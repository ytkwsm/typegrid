'use strict';
import * as config  from "../data/config";

// export function tgFilePathOrigin() {
//     const tgFilePathOriginBody = (function() {
//         if (document.currentScript) {
//             return document.currentScript.src;
//         } else {
//             const loadScripts = document.getElementsByTagName('script'),
//             script = loadScripts[loadScripts.length-1];
//             if (script.src) {
//                 return script.src;
//             }
//         }
//     })();
//     return tgFilePathOriginBody;
// }

//model.js //////////////////////////////////////////////////////////////////////////////////////////////
export function getJSON(item) {
    return config[ item ];
}

export function deviceDecision(decisionStr, mediaDevicesStr, mediaBreakpointsWidthMinStr, msgAttentionStr, msgErrStr) {
    let decision      = decisionStr,
        mediaDevice   = mediaDevicesStr,
        mediaWidthMin = mediaBreakpointsWidthMinStr,
        msgAttention  = msgAttentionStr,
        msgErr  = msgErrStr;
    if(decision === "@media") {
        console.log(decision);
        this.media(mediaDevice, mediaWidthMin);
    } else if(decision === "userAgent") {
        console.log(msgAttention);
    } else {
        console.log(msgErr);
    }
    // console.log(fontSize(this.user.media.contents.fontSize));
    console.log(this.devices);
    console.log(this.fontSize);
    console.log(this.fontSize.length);
    console.log(this.fontSize[0]);
}

export function media(devices, breakPoints) {
    let devicesNamespaces  = devices;
    let devicesBreakPoints = breakPoints;
    let matchParam         = new Array();
    let conditionUnit      = "px";
    let conditionMedia     = "screen";
    let conditionWidthMin  = "min-width: ";
    let conditionWidthMax  = "max-width: ";
    let testBreakpoints;
    console.log("model.media(); -> device num: " + devicesNamespaces.length);
    console.log("model.media(); -> device num: " + devicesBreakPoints.length);
    console.log(devicesNamespaces);
    console.log(devicesBreakPoints);
    console.log(matchParam);
    for (let i = 0; i < devicesBreakPoints.length; i++) {

    }
    devicesBreakPoints.some(function (val, index) {
        if (index == 0) {
            matchParam.push(conditionMedia + ' and (' + conditionWidthMax + (devicesBreakPoints[index + 1] - 1) + conditionUnit + ')');
        } else if (index == devicesBreakPoints.length - 1) {
            matchParam.push(conditionMedia + ' and (' + conditionWidthMin + val + conditionUnit + ')');
        } else {
            matchParam.push(conditionMedia + ' and (' + conditionWidthMax + (devicesBreakPoints[index + 1] - 1) + conditionUnit + ') and (' + conditionWidthMin + devicesBreakPoints[index] + conditionUnit + ')');
        }
    });
    console.log(matchParam);
    for(let i = 0; i < matchParam.length; i++) {
        console.log(matchParam[i]);
    }
    console.log(matchParam);
    let myQuery = [].concat(matchParam);
    myQuery.some(function (val, index) {
        myQuery[index] = myQuery[index].replace(/\s+/g, "");
    });
    console.log(myQuery);

    return myQuery;

    // window.addEventListener('load', testBreakpoints);

    // testBreakpoints = function () {
    //     console.log("testBreakpoints start ==========================>");
	// 	myQuery.some(function (val, index) {
	// 		// init
	// 		if (window.matchMedia(myQuery[index]).matches) {
	// 			_.dispatchEvent(break_point_change_event, { width: window.innerWidth, breakpoint: _.settings.breakpoints[index] });
	// 		}
	// 		window.matchMedia(myQuery[index]).addListener(function (e) {
	// 			if (e.matches) {
	// 				var tmp = e['media'].replace(/\s+/g, "");

	// 				// fire
	// 				_.dispatchEvent(break_point_change_event, { width: window.innerWidth, breakpoint: _.settings.breakpoints[myquery_cl.indexOf(tmp)] });
	// 			}
	// 		});
	// 	});
    //     console.log("=========================> testBreakpoints end");
	// };

    // console.log(testBreakpoints);

    // function testBreakpoints() {
    //     console.log("fire");
    //     if (window.matchMedia(myQuery[index]).addListener(function (e){

    //     })) {

    //     }
    // }

	// window.addEventListener('load', check_breakpoints);
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // check_breakpoints = function () {
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
	// 	matchParam.some(function (val, index) {
	// 		// init
	// 		if (window.matchMedia(matchParam[index]).matches) {
	// 			_.dispatchEvent(break_point_change_event, { width: window.innerWidth, breakpoint: devicesBreakPoints[index] });
	// 		}

	// 		window.matchMedia(matchParam[index]).addListener(function (e) {
	// 			if (e.matches) {
	// 				var tmp = e['media'].replace(/\s+/g, "");

	// 				// fire
	// 				_.dispatchEvent(break_point_change_event, { width: window.innerWidth, breakpoint: devicesBreakPoints[myQuery.indexOf(tmp)] });
	// 			}
	// 		});
	// 	});
	// };

}

export function wrapper(htmlSet, model) {
    console.log("view.js: wrapperを生成します。");
    const root        = document.createElement("div");
    const htmlBody    = document.getElementsByTagName("body").item(0);
    const htmlWrapper = htmlSet;
    root.setAttribute("id", "tg_all");
    root.setAttribute("role", "presentation");
    root.setAttribute("aria-hidden", "true");
    htmlBody.appendChild(root);
    root.innerHTML    = htmlWrapper;
    console.log(model.width());
    console.log(model.height());
}

export function calcScrollbarWidth() {
    let element = document.createElement('div');
    element.style.visibility = 'hidden';
    element.style.overflow = 'scroll';
    document.body.appendChild(element);
    const scrollbarWidth = element.offsetWidth - element.clientWidth;
    console.log(element.offsetWidth);
    console.log(element.clientWidth);
    document.body.removeChild(element);

    console.log(scrollbarWidth);
    return scrollbarWidth;
}

export function checkBrowserHeight() {
    //1. ビューポート縦幅をチェック
    let innerHeight = window.innerHeight;
    let documentClientHeight = document.documentElement.clientHeight;
    let resultViewportHeight = Math.max(innerHeight, documentClientHeight);//サイズを比較して、大きい方をビューポートの縦幅として取得。
    console.log("ビューポートの縦幅　：" + resultViewportHeight + "px");
    //2. スクロール含んだ縦幅をチェック
    let offsetHeight = document.body.offsetHeight;
    let documentBodyclientHeight = document.body.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    let resultDocumentHeight = Math.max(scrollHeight, documentBodyclientHeight);//サイズを比較して、大きい方を大きい方をドキュメントの縦幅として取得。
    console.log("ドキュメントの縦幅：" + resultDocumentHeight + "px");
    //3. 1, 2で、ドキュメントの縦幅が大きいかチェック
    let isScrollbarOccur = resultViewportHeight < resultDocumentHeight;//
    console.log(resultViewportHeight + " < " + resultDocumentHeight + ": " + isScrollbarOccur);
    return isScrollbarOccur;
    //4. 3番の結果を送る
        // return hoge
    //5. (別関数) width(); 内で、
        //5-1. 縦スクロールがあればcalcScrollbarWidth()の値を引いたwidthのサイズを返す。
        //5-2. 縦スクロールがなければ、calcScrollbarWidth()の値を引かずに、全幅のwidthを返す。
}

export function setWrapperHeight() {
    let target = document.getElementById("tg_wrapper");
    let currentHeight = height() + "px";
    console.log(currentHeight);
    target.style.height = currentHeight;
}

export function width() {
    //get all width
    function documentWidth() {return window.innerWidth||document.documentElement.clientWidth||0}

    // console.log(documentWidth());
    return documentWidth();
}

export function height() {
    function documentHeight() {
        return Math.max.apply( null, [window.innerHeight , document.documentElement.clientHeight, 	document.body.offsetHeight, document.body.clientHeight, document.body.scrollHeight] )
    }
    console.log(documentHeight());
    return documentHeight();
}

export function ua() {
    let ua = navigator.userAgent;
    console.log(ua);
    if (ua.indexOf('iPhone')      > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        console.log("mobile");
        if(ua.indexOf('iPhone')   > 0)   console.log("iPhone");   // iPhone
        if(ua.indexOf('Android')  > 0)   console.log("Android Mobile"); // Android
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        console.log("tablet");
        if(ua.indexOf('iPad')     > 0)   console.log("iPad");;       // iPad
        if(ua.indexOf('Android')  > 0)   console.log("Android Tablet");  __logger("Android"); // Android
    } else {
        console.log("Desktop");
    }
}

export function getElementTagStyle(elem) {
    const htmlElem = elem;
    if(htmlElem === "html" || "body"){
        const getTag = document.getElementsByTagName(htmlElem).item(0);
        const getStyle = window.getComputedStyle(getTag);
        return getStyle;
    } else {
        console.log("Specify the html element or body element for the argument.");
        return;
    }
}

export function convertHex (color) {
    let ret = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*([.\d]+)?\)/.exec(color);
    let convertHex = '';
    for(let i=1;i<=3;i++){
      let hex = Number(ret[i]).toString(16);
      convertHex += (hex.length === 1)? '0' + hex : hex;
    }
    return convertHex;
}

export function convertComputedFontSize(jsonFontSize, targetElem) {
    const computed  = 'computed';
    const setSize      = jsonFontSize;
    const htmlElem  = targetElem;
    if(setSize === computed){
        const computedStyle = getElementTagStyle(htmlElem);
        const convertFloat = parseFloat(computedStyle.fontSize);
        console.log(convertFloat);
        return convertFloat;
    } else {
        return setSize;
    }
}

export function getStyles(elem) {//getElementTagStyle()に移行したい
    console.log("model.js: getStyle()でbody要素のCSSを取得します。");
    const styles = getElementTagStyle(elem);
    console.log("body -> color: "                  + styles.color + ";");
    console.log("body -> color: "                  + "#" + convertHex(styles.color) + ";");
    console.log("body -> font-family: "            + styles.fontFamily + ";");
    console.log("body -> font-size: "              + styles.fontSize + ";");
    console.log("body -> line-height: "            + styles.lineHeight + ";");
    console.log("body -> letter-spacing: "         + styles.letterSpacing + ";");
    console.log("body -> font-feature-settings: "  + styles.fontFeatureSettings + ";");
    console.log("body -> -webkit-font-smoothing: " + styles.webkitFontSmoothing + ";");
    console.log("body -> hanging-punctuation: "    + styles.hangingPunctuation + ";");
}

// layout
//両端のスペースの有無を判定して、ある場合は1以上の数値を返す。
export function decisionGutterSideType(currentGutterSide, currentFontSize) {
    const gutterSide = currentGutterSide;
    const fontSize = currentFontSize;

    if(gutterSide === "auto") {
        const result = 0;
        return result;
    } else {
        const result = currentGutterSide * fontSize;
        return result;
    }
};

//カラム幅が固定／動的か判定して、数値で返す。
export function decisionColumnSizeType(currentFontSize, currentSizeChar, currenttWidth, currentColumnNum, currentGutterTotal, currentGutterSideEachInstallments) {
    const fontSize = currentFontSize;
    const columnSize = currentSizeChar;
    const width =  currenttWidth;
    const columnNum = currentColumnNum;
    const gutterTotal = currentGutterTotal;
    const totalFluidWidth = width - gutterTotal;
    if(columnSize === "fluid") {
        const columnWidth = totalFluidWidth / columnNum - currentGutterSideEachInstallments;
        console.log("columnWidth->>>>> 'fluid!!!!'");
        return columnWidth;
    } else {
        const columnWidth = fontSize * columnSize - currentGutterSideEachInstallments;
        console.log("columnWidth->>>>>" + columnWidth);
        return columnWidth;
    }
}

//view.js //////////////////////////////////////////////////////////////////////////////////////////////


export function setSvgSizes(targetSvg, currentWidth, currentHeight) {
    const svgAll       = document.getElementById(targetSvg);
    // const renderWidth  = currentWidth - calcScrollbarWidth();
    const renderWidth  = currentWidth;
    const renderHeight = currentHeight;
    // console.log(calcScrollbarWidth() + "/" + currentWidth + "/" + renderWidth);
    svgAll.setAttribute("width", renderWidth);
    svgAll.setAttribute("height", renderHeight);
    svgAll.setAttribute("viewbox", "0 0 " + renderWidth + " " + renderHeight);
}


export function reset(resetElem) {
    let target = resetElem;
    target.textContent = null;
}

export function wrapperFit() {
    console.log("view.js: svg要素、g要素の横幅・縦幅を親要素に合わせます。");
    console.log(width());
    console.log(height());
}

export function insertStyleElem(config, userSetting) {
    const style    = document.createElement("style");
    const target   = document.getElementById("tg_all");
    const property = document.createTextNode(config);
    style.setAttribute("id", "tg_style");
    if (style.styleSheet) {
        style.styleSheet.cssText = property.nodeValue;
    } else {
        style.appendChild(property);
    };
    target.appendChild(style);
}


//controller.js //////////////////////////////////////////////////////////////////////////////////////////////

export function resize(model, view) {
    window.addEventListener("resize", resize, false );
    let timerResize = null;
    function resize(){
        clearTimeout( timerResize );
        timerResize = setTimeout(function() {
        console.group("%c[" + model.lib.name + "]: %c" + "%cwindow.addEventListener:%c %cresize%c", model.console.red , '' , model.console.green , '' , model.console.blue , '' );
        //ここに処理を書く
            model.debug.count.resize = model.debug.count.resize + 1;
            console.log("ブラウザを「" + model.debug.count.resize + "回」リサイズしました。");
            console.log(model.width());
            console.log(model.height());
            view.render("resize");
        console.groupEnd();
        }, 300 );
    }
}


/**
 * @void listenMediaQuery
 * @param Object model Typegridのモデル
 * @param Object view Typegridのビュー
 */
export function listenMediaQueries(model, view, callBack) {
    let _self = this, // ここから： _self = utils
    	myBreakPoints = model.user.media.contents.breakPoints.width.min,
        myDevices = model.user.media.devices,
    	myUnit = model.user.general.unit.breakPoints,
        myMediaQueryIndex = -1,
    	myMediaQueries = [],
        myRender = function( newMediaQueryIndex ) {
    		myMediaQueryIndex = newMediaQueryIndex;
            console.group("%c[" + model.lib.name + "]: %c" + "%cutils\.listenMediaQueries:%c %c» " + myDevices[myMediaQueryIndex] + " « device matched%c", model.console.red , '' , model.console.green , '' , model.console.blue , '' );
    		console.log('New %c' + myDevices[myMediaQueryIndex] + '%c compatible device detected', 'font-weight: bold; font-style: italic;', '');
            console.log('Redraw is required');
            console.groupEnd();
            callBack( myMediaQueryIndex );
        },
        checkMediaQuery = function( mediaQueryListener ) {
        	if ( mediaQueryListener.matches ) {
                let newMediaQueryIndex = mediaQueryListener.target ? mediaQueryListener.target.typegridIndex : mediaQueryListener.typegridIndex;
        	    if ( !isNaN(newMediaQueryIndex) && myMediaQueryIndex !== newMediaQueryIndex ) {
                    return newMediaQueryIndex;
                }
        	}
        	return -1;
        };

    _self.mediaQueryListener = function(mediaQueryListener) { // utils.mediaQueryListener
        let newMediaQueryIndex = checkMediaQuery( mediaQueryListener );
    	if ( newMediaQueryIndex > -1 ) {
            myRender( newMediaQueryIndex );
    	}
    };

    console.group("%c[" + model.lib.name + "]: %c" + "%cutils\.listenMediaQueries:%c %c" + myBreakPoints.length + " media queries generated%c", model.console.red , '' , model.console.green , '' , model.console.blue , '' );
	myBreakPoints.forEach(function(myBreakPoint, myIndex, myBreakPointsArray) {
		// 最初：myIndex = 0 の場合は myMediaQueries[ 0 ] = window.matchMedia('screen and (min-width: ◯◯◯px) and (max-width: ◯◯◯px)')
        // ...
		// 最後：myIndex = N の場合は myMediaQueries[ N ] = window.matchMedia('screen and (min-width: ◯◯◯px)')
		myMediaQueries[ myIndex ] = window.matchMedia([
			'screen and (min-width: ' + (myBreakPoint + myUnit) + ')',
			myBreakPointsArray[ myIndex + 1 ] ? ' and (max-width:' + ((myBreakPointsArray[ myIndex + 1 ] - 1) + myUnit) + ')' : ''
		].join(''));
        console.log( '%c[ ' + myIndex + ' ] = ' + myDevices[myIndex] + '%c -> ' + myMediaQueries[ myIndex ].media, 'font-weight: bold', 'font-weight: normal' );
		// イベントリスナーの設定
		myMediaQueries[ myIndex ].typegridIndex = myIndex;
        myMediaQueries[ myIndex ].addListener( _self.mediaQueryListener );
		// はじめに (「min-width/max-width」が使用されますから一回しか呼び出せない)
		if ( myMediaQueries[ myIndex ].matches ) {
    		let newMediaQueryIndex = checkMediaQuery( myMediaQueries[ myIndex ] );
    		if ( newMediaQueryIndex > -1 ) {
        		_self.currentMedia = model.getJsonValues( newMediaQueryIndex ); // Temp: _self.currentMedia = root.utils.currentMedia
            }
            //_self.mediaQueryListener( myMediaQueries[ myIndex ] );
		}
	});
    console.groupEnd();

    _self.mediaQueries = myMediaQueries;  // utils.mediaQueryListener (unlistenMediaQueries為に)
}


/**
 * @boolean unlistenMediaQueries
 */
export function unlistenMediaQueries() {
    let _self = this; // ここから： _self = utils
    if ( ! _self.mediaQueries ) {
        return false;
    }
	_self.mediaQueries.forEach(function(myMediaQuery) {
        myMediaQuery.removeListener( _self.mediaQueryListener );
	});
    return true;
}


/**
 * @boolean checkWindowSize
 * @param Object model Typegridのモデル
 * @param Object view Typegridのビュー
 */
export function checkWindowSize(model, view, callBack) {
    let _self = this; // utils
    _self.timerResize = -1;
    _self.resizeWindowListener = function( event ) {
        if ( _self.timerResize === -1 ) {
            _self.timerResize = setTimeout(function(){
                console.group("%c[" + model.lib.name + "]: %c" + "%cutils.checkWindowSize:%c %cresize event triggered%c", model.console.red , '' , model.console.green , '' , model.console.blue , '' );
                //ここに処理を書く
                model.debug.count.resize = model.debug.count.resize + 1;
                console.log("ブラウザを「" + model.debug.count.resize + "回」リサイズしました。");
                console.log(model.width());
                console.log(model.height());
                callBack();
                console.groupEnd();
                clearTimeout( _self.timerResize );
                _self.timerResize = -1;
            }, 300);
        }
    };

    window.addEventListener("resize", _self.resizeWindowListener, false);

}


/**
 * @boolean uncheckWindowSize
 */
export function uncheckWindowSize() {
    let _self = this;
    if ( ! _self.resizeWindowListener ) {
        return false;
    }
    window.removeEventListener("resize", _self.resizeWindowListener, false );
    return true;
}


export function keyBinds(model, view) {
    let displayStatus  = model.visibility;
    let fixedStatus = model.fixed;
    // console.log(displayStatus);
    let all = document.getElementById("tg_all");
    // console.log(all);
    document.body.addEventListener('keydown',
    event => {
        if (event.key === 'g') {
            // console.log("Gが押されました。");

            displayStatus = !displayStatus;
            // console.log(displayStatus);
            // console.log(all);
            if(displayStatus == true){
                all.style.display = "block";
            } else {
                all.style.display = "none";
            }

        }
        if (event.key === 'p') {
            // console.log("Gが押されました。");

            // displayStatus = !displayStatus;
            // console.log(displayStatus);
            // console.log(all);
            if(fixedStatus == true){
                all.style.position = "fixed";
            } else {
                all.style.position = "absolute";
            }
            fixedStatus = !fixedStatus;

        }
    });
}
