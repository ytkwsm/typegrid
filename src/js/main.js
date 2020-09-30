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

'use strict';
// import ------------------------------------------------------------------------
import * as snippet   from "./modules/snippet";
import * as utils     from "./modules/utils";
import * as config    from "./data/config";
import * as user      from "./modules/user";
import MyModel        from "./mvc/model";
import MyView         from "./mvc/view";
import MyController   from "./mvc/controller";

const lib          = config.lib.name
     ,consoleRed   = config.console.red
     ,consoleGreen = config.console.green
     ,consoleBlue  = config.console.blue;

// load --------------------------------------------------------------------------
console.group("%c[" + lib + "]: %c" + "%cmain.js%c %cclass App%c", consoleRed , '' , consoleGreen , '' , consoleBlue , '' );
    class App {
        constructor() {
			let myApp = this;
            myApp.snippet     = snippet;
            myApp.config      = config;
            myApp.utils       = utils;
            let api = {};
            api.init = function() {
    			myApp.user = user.getJSON(function(json) { // サクセスのコールバック
					myApp.config[ myApp.config.lib.json.storage ] = json; // config.typegrid_json
	                console.group("%c[" + lib + "]: %c" + "%cmain.js%c %cthis.model%c", consoleRed , '' , consoleGreen , '' , consoleBlue , '' );
	                myApp.model       = new MyModel(myApp.utils, myApp.config, myApp.user);
	                console.groupEnd();
	                console.group("%c[" + lib + "]: %c" + "%cmain.js%c %cthis.view%c", consoleRed , '' , consoleGreen , '' , consoleBlue , '' );
	                myApp.view        = new MyView(myApp.utils, myApp.model);
	                console.groupEnd();
	                console.group("%c[" + lib + "]: %c" + "%cmain.js%c %cthis.controller%c", consoleRed , '' , consoleGreen , '' , consoleBlue , '' );
	                myApp.controller  = new MyController(myApp.utils, myApp.model, myApp.view);
	                console.groupEnd();
    			});
            };
            api.destroy = function() {
                myApp.utils.unlistenMediaQueries();
                myApp.utils.uncheckWindowSize();
            };
            api.init(); // First run
            return {
                init: api.init,
                destroy: api.destroy
            };
        }
    }
    window.__typegrid = new App();
console.groupEnd();
