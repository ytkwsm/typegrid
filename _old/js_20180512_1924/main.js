/*
 *******************************************************************************
 *	typegrid.js
 *	generating layout grid on browser for designers & engineers.
 *	author:  @ytkwsm — YUTA KAWASUMI
 *	URL:     http://ytkwsm.work/typegrid/
 *	github:  https://github.com/ytkwsm/typegrid
 *	licence: MIT
 *******************************************************************************
 *
 *	## typeGrid.jsの目的
 *	* ブラウザ上でのデザイン、レイアウト調整作業のための補助ツール
 *	* remベースのCSSレイアウトのガイドとして利用できる
 *	* ライブラリに依存せず、typeGrid.jsを読み込ませるだけで動作できる
 *	* 利用者独自のグリッドを設定できる
 *	* 表示/非表示のon/offができる
 *
 *	## typeGrid.jsの具体的な機能
 *	1. z-index最前面に、svgのグリッドレイヤーを生成
 *	2. 最大3つの、異なるグリッドレイヤーを生成
 *	3. グリッドの初期値はtypeGrid.js上の値を利用。
 *	4. GUIでグリッドの値を変更可能
 *	5. 外部jsonファイルで定義したグリッド生成用ルールで初期値を変更可能
 *	6. キーボードショートカットで表示/非表示をon/off
 *
*/

// import ------------------------------------------------------------------------
import * as config   from "./data/config";
import * as code     from "./snippet/shortcode";
import * as styles   from "./modules/style";
import * as media    from "./modules/media";
import * as wrapper  from "./modules/wrapper";
import * as gui      from "./modules/gui";
import * as svg      from "./modules/svg";
import * as grid     from "./modules/grid";
import * as user     from "./modules/user";

const lib          = config.common.lib
     ,consoleRed   = config.console.red
     ,consoleGreen = config.console.green
     ,consoleBlue  = config.console.blue;

// DOMContentLoaded --------------------------------------------------------------
window.addEventListener("DOMContentLoaded",function(){
console.group("%c[" + lib + "]: %c" + "%cwindow.addEventListener:%c %cDOMContentLoaded%c", consoleRed , '' , consoleGreen , '' , consoleBlue , '' );
    console.log("processing...");
console.groupEnd();
},false);


// load --------------------------------------------------------------------------
window.addEventListener("load",function(){
console.group("%c[" + lib + "]: %c" + "%cwindow.addEventListener:%c %cload%c", consoleRed , '' , consoleGreen , '' , consoleBlue , '' );
console.log("processing...");
    wrapper.createWrapAll();
    wrapper.createWrapGridsPrimary();
    wrapper.createInner();
console.groupEnd();
},false);


// resize ------------------------------------------------------------------------

window.addEventListener("resize", resize, false );
var timer = null;
function resize(){
	clearTimeout( timer );
	timer = setTimeout(function() {
    console.group("%c[" + lib + "]: %c" + "%cwindow.addEventListener:%c %cresize%c", consoleRed , '' , consoleGreen , '' , consoleBlue , '' );
    console.log("processing...");
        console.log("間引いたresize");
        wrapper.createWrapGridsPrimary();
    console.groupEnd();
	}, 300 );
}

