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
 *	* ライブラリに依存せず、typeGrid.jsとjsonの設定ファイルを読み込ませるだけで動作できる
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
 *	## typeGrid.jsの想定外の目的・機能
 *	*
 *	*
 *	*
 *	*
 *
*/
(function(){
	"use strict";

	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////


    // settings: typegrid globals settings /////////////////////////////////////
	var widthAll          = getWidth();
	var heightAll         = getHeight();
	var charRuleDynamic   = "hoge";//vwに合わせたサイズ

	// settings: mediaquery sizes //////////////////////////////////////////////
	var mq_s_max    = window.matchMedia('screen and (max-width: 767px)');//mobile phone
	var mq_m_min    = window.matchMedia('screen and (min-width: 768px)');//mobile tablet
	var mq_l_min    = window.matchMedia('screen and (min-width: 960px)');//desktop
	var mq_xl_min   = window.matchMedia('screen and (min-width: 1200px)');//desktop
	var mq_xxl_min  = window.matchMedia('screen and (min-width: 1600px)');//desktop
	var mq_xxxl_min = window.matchMedia('screen and (min-width: 1800px)');//desktop

    // settings: typegrid globals settings /////////////////////////////////////
	var tg = {
		 data       : "/_assets/js/typegrid.json"
		,prefix     : "tg_"
 		,visibility : false
		,size       : {
			char : {
				rem      : 1
				,px      : 16
				,dynamic : 1
			}
		}
	}

	// settings: HTML Elements /////////////////////////////////////////////////
	var wrapper = {
		all: {
			 entity: "div"
			,class : "wrapperAll"
			,css: ""
			,target: "body"
		},
		grid: {
			body: {
				 entity: "div"
				,class: "gridBody"
				,css: "pointer-events: none; position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; height: auto; z-index: 9990"
				,target: "wrapperAll"
			}
			,inner: {
				 entity: "div"
				,class: "gridInner"
				,css: "position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; height: auto;"
				,target: "gridBody"
			}
		}
	}
	// settings: SVG Elements //////////////////////////////////////////////////
	var grid = {
		all: {
			root: {
				css : "position: absolute; top: 0; left: 0;"
			}
		}
	    ,base: {//再背面の細かい線
			root: {
				css : "z-index: 9991;"
			}
			,common: {
				 entity: "line"
  				,class : "base"
	 		   	,color : "#ccc"
			    ,css   : "fill: none; stroke: #ccc; stroke-width: 0.5;"
				,size: 1
			}
			,thick : {
				 class: "thick"
			}
			,dash  : {
				 class: "dash"
			}
 		}
		,row : {
			root: {
				css : "z-index: 9992;"
			}
 			,class : "row"
			,entity: "rect"
 		   	,color : "#999"
 		   	,css   : ""
		}
		,column: {//カラム
			root: {
				css : "z-index: 9993;"
			}
 			,class : "column"
			,entity: "rect"
 		   	,color : "#999"
 		   	,css   : ""
 		}
		,unit : {//複数文字分のサイズ
			root: {
				css : "z-index: 9994;"
			}
			,class : "unit"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
 		}
		,char : {//1文字分のサイズ
			root: {
				css : "z-index: 9995;"
			}
			,class : "unit"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
 		}
	    ,guide: {//ガイド線
			root: {
				css : "z-index: 9991"
			}
			,class : "guide"
			,entity: "line"
 		   	,color : "#00FFFF"
 		   	,css   : ""
 		}
	    ,gutter : {//カラム間の幅
			 class : "gutter"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
 		}
	}

	// settings: attr //////////////////////////////////////////////////////////
	var attr = {
		 svg : {
			ns : "http://www.w3.org/2000/svg"
		}
		,aria : {
		    presen : "role='presentation'"
		}
		,style : {
		     pointerEvents : "pointer-events: none;"
			,fixed         : "position: fixed;"
		    ,absolute      : "position: absolute;"
		    ,relative      : "position: relative;"
			,fontFamily    : "font-family: \"Open Sans\", Roboto, \"Helvetica Neue\", Helvetica, Verdana, \"Droid Sans\",\"游ゴシック\", YuGothic, \"ヒラギノ角ゴ ProN W3\", \"Hiragino Kaku Gothic ProN\", \"Meiryo UI\", \"メイリオ\", Meiryo, sans-serif;"
		}
	}


	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
    // short code //////////////////////////////////////////////////////////////

	// create //////////////////////////////////////////////////////////////////
	function createTxt(txt) {
		return document.createTextNode(txt)
	}
	function createFrag() {
		return document.createDocumentFragment();
	}
	function createElem(ele) {
		return document.createElement(ele);
	}
	function createElemNS(ele) {
		return document.createElementNS(attr.svg.ns, ele);
	}

	// get elements ////////////////////////////////////////////////////////////
	function getSelector(ele) {
		return document.querySelector(ele);
	}
	function getSelectorAll(ele) {
		return document.querySelectorAll(ele);
	}
	function getId(id) {
		return document.getElementById(id);
	}
	function getTag(tag) {
		return document.getElementsByTagName(tag).item(0);
	}

	// get value ///////////////////////////////////////////////////////////////
	function getWidth() {
		var currentWidth = window.innerWidth||document.documentElement.clientWidth||0;
		return currentWidth;
	}
	function getHeight() {
		var currentHeight = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
		return currentHeight;
	}
	function getVbValue(valueWidth, valueHeight){//現在のレンダリングエリアのサイズと同一の数値を、SVG要素のviewbox属性の値として書き出すための数値を生成する関数
		//引数：横幅、縦幅
		//使用例：getViewBox(getWidth(), getHeight());
		var viewBoxValue = new Array();
		viewBoxValue.push("0 0 ");//(x, y, width, height)のうち、前半のx, yを0, 0に設定
		viewBoxValue.push(valueWidth);
		viewBoxValue.push(" ");
		viewBoxValue.push(valueHeight);
		var svgViewBox = viewBoxValue.join('');
		return svgViewBox;
	}

	// set value ///////////////////////////////////////////////////////////////
	function setVbValue(targetSvg, currentWidth, currentHeight) {//引数に指定したSVG要素のviewbox属性を、レンダリングエリアのサイズで書き換える関数
		//引数：対象SVG要素、viewboxの値、横幅、縦幅
		//使用例：setSvgView(target, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
		targetSvg.textContent = null;
		targetSvg.removeAttribute("viewBox");//viewbox属性をリセット
		targetSvg.setAttribute("viewBox", getVbValue(currentWidth, currentHeight));//viewbox属性に別の関数で値を設定
		targetSvg.setAttribute("width", currentWidth);//viewboxと同様の値をwidthへ設定
		targetSvg.setAttribute("height", currentHeight);//viewboxと同様の値をheightへ設定
	}




	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
    // class ///////////////////////////////////////////////////////////////////

	//element setting & insert.
	function Elem(typeName, entityName, className, styles) {
		// if (arguments.length <= 0) { typeName = "html" }//引数typeNameに値がなかった場合の初期値
			this.type     = typeName;//html or svg
			this.entity   = entityName;
			this.class    = className;
			this.style    = styles;
	}
	Elem.prototype.create = function() {
		var self;
		//値に合わせて、htmlとsvgどちらかの要素を生成する
		if (this.type === "html") { self = createElem(this.entity); }
		if (this.type === "svg")  { self = createElemNS(this.entity); }
		//生成した要素を返す
		return self;
	}
	Elem.prototype.set = function() {
		var self = this.create();
		//生成した要素に属性を付与する
		self.setAttribute("class", this.class);
		self.setAttribute("style", this.style);
		//生成した要素を返す
		return self;
	}
	Elem.prototype.insert = function(targetMove) {
		var self = this.set();
		var insertTarget = getSelector(targetMove);
		insertTarget.appendChild(self);
	}

	//loop svg element setting
	function LoopFragNS(loopDirection, entityName, charSize, style) {
		this.loopDir   = loopDirection;//"x" or "y"
		this.entity    = entityName;
		this.charSize  = charSize;
		this.css       = style;
	}
	LoopFragNS.prototype.create = function() {
		var self = createElemNS(this.entity);
		return self;
	}
	LoopFragNS.prototype.loop = function() {
		var fragments = createFrag();
		var calcGridNum  = getWidth() / this.charSize;//レンダリングエリアの幅をフォントサイズで割る
		var floorNum = Math.ceil(calcGridNum);//割った幅の少数を切り上げる
		for(var cnt = 0; cnt < floorNum; cnt ++){
			var self = this.create();
			//値に合わせて、htmlとsvgどちらかの要素を生成する
			if (this.loopDir === "x") {
				self.setAttribute("class", this.entity + "-x" + cnt);
				self.setAttribute("x1", cnt * this.charSize);
				self.setAttribute("y1", "0");
				self.setAttribute("x2", cnt * this.charSize);
				self.setAttribute("y2", getHeight());
			}
			if (this.loopDir === "y") {
				self.setAttribute("class", this.entity + "-y" + cnt);
				self.setAttribute("x1", "0");
				self.setAttribute("y1", cnt * this.charSize);
				self.setAttribute("x2", getWidth());
				self.setAttribute("y2", cnt * this.charSize);
			}
			self.setAttribute("style", this.css);
			fragments.appendChild(self);
		}
		//生成した要素を返す
		return fragments;
	}
	LoopFragNS.prototype.insert = function(targetMove) {
		var self = this.loop();
		var insertTarget = getSelector(targetMove);
		insertTarget.appendChild(self);
	}

	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
    // Processing group ////////////////////////////////////////////////////////

	function createWrapper() {
		createWrapperAll();
		createBody();
		createInner();
	}
	function createWrapperAll() {
		var wrapperAll       = new Elem("html", wrapper.all.entity, tg.prefix + wrapper.all.class + " typeGrid", wrapper.all.css);
		wrapperAll.insert(wrapper.all.target);
	}
	function createBody() {
		var gridBody         = new Elem("html", wrapper.grid.body.entity, tg.prefix + wrapper.grid.body.class, wrapper.grid.body.css);
		var controllerBody   = new Elem("html", "div", tg.prefix + "controllerBody", "display:block;");
		gridBody.insert("." + tg.prefix + wrapper.grid.body.target);
		controllerBody.insert("." + tg.prefix + "wrapperAll");
	}
	function createInner() {
		var gridInner        = new Elem("html", wrapper.grid.inner.entity, tg.prefix + wrapper.grid.inner.class, wrapper.grid.inner.css);
		var controllerInner  = new Elem("html", "div", tg.prefix + "controllerInner", "display:block;");
		gridInner.insert("." + tg.prefix + wrapper.grid.inner.target);
		controllerInner.insert("." + tg.prefix + "controllerBody");
	}
	function createRootSvg() {
		//各ルートSVGタグを1度だけ生成する。
		//各ルートSVGタグの中身は、setGrids()でロード時・リサイズ時に生成する。
		createRootBase();
		createRootChar();
		createRootCol();
		createRootRow();
		createRootUnit();
		setVbRoot();
	}
	function createRootBase() {
		var self          = new Elem("svg", "svg", tg.prefix + "gridGroup " + tg.prefix + "gridBase ", grid.all.root.css + grid.base.root.css + "display:block;");
		self.insert("." + tg.prefix + "gridInner");
		console.log(self);
	}
	function createRootChar() {
		var self          = new Elem("svg", "svg", tg.prefix + "gridGroup " + tg.prefix + "gridChar", grid.all.root.css + grid.char.root.css + "display:block;");
		self.insert("." + tg.prefix + "gridInner");
	}
	function createRootCol() {
		var self          = new Elem("svg", "svg", tg.prefix + "gridGroup " + tg.prefix + "gridColumn", grid.all.root.css + grid.column.root.css + "display:block;");
		self.insert("." + tg.prefix + "gridInner");
	}
	function createRootRow() {
		var self          = new Elem("svg", "svg", tg.prefix + "gridGroup " + tg.prefix + "gridRow", grid.all.root.css + grid.row.root.css + "display:block;");
		self.insert("." + tg.prefix + "gridInner");
	}
	function createRootUnit() {
		var self          = new Elem("svg", "svg", tg.prefix + "gridGroup " + tg.prefix + "gridUnit", grid.all.root.css + grid.unit.root.css + "display:block;");
		self.insert("." + tg.prefix + "gridInner");
	}
	function setVbRoot() {
		var wrappers = getSelectorAll("." + tg.prefix + "gridGroup");
		for( var i=wrappers.length; i--; ) {
			// elements[i] = ...
			setVbValue(wrappers[i], widthAll, heightAll);
		}
		// setVbValue(wrappers, getWidth(), getHeight());
	}

	function setGrids() {
		var fragGridSolidX       = new LoopFragNS("x", "line", 16, "fill: none;stroke: #ccc;stroke-width:0.5");
		var fragGridSolidY       = new LoopFragNS("y", "line", 16, "fill: none;stroke: #ccc;stroke-width:0.5");
		fragGridSolidX.insert("." + tg.prefix + "gridBase");
		fragGridSolidY.insert("." + tg.prefix + "gridBase");
			// var gridBody = getId("." + tg.prefix + "gridBase");
			// 	setVbValue(gridBody ,getWidth(), getHeight());
			// 	gridBody.appendChild(loopGridSolidX());
	}

	// function loopGridSolidX(fontSize) {
	// 	if(fontSize == undefined){
	// 		fontSize = tg.size.char.px;
	// 	}
	// 	var fragGrids = createFrag();
	// 	var calcGridNum  = getWidth() / fontSize;
	// 	var floorNum = Math.ceil(calcGridNum);
	// 	for(var cnt = 0; cnt < floorNum; cnt ++){
	// 		console.log("X軸の実線：" + floorNum);
	// 		var line = createElemNS("line");
	// 		line.setAttribute("class", "line-x" + cnt);
	// 		line.setAttribute("x1", cnt * fontSize);
	// 		line.setAttribute("y1", "0");
	// 		line.setAttribute("x2", cnt * fontSize);
	// 		line.setAttribute("y2", getHeight());
	// 		line.setAttribute("style", "fill: none;stroke: #ccc;stroke-width:0.5");
	// 		fragGrids.appendChild(line);
	// 	}
	// 	return fragGrids;
	// }

//base, char, column, row, unit

	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
    // init ////////////////////////////////////////////////////////////////////

	function _init() {
		console.log("widthAll: " + widthAll);
		console.log("heightAll: " + heightAll);
		createWrapper();
		createRootSvg();
		setGrids();
	}

	window.addEventListener("DOMContentLoaded",function(){
		// vars
		console.log("init...");
		_init();
	},false);



	window.addEventListener("load",function(){
		console.log("Start typegrid.js.");





			// console.log(getTag(wrapper.all.target));
		// console.log("config.char.size.remは" + config.char.size.rem + "です。");
		// console.log("attr.svg.nsは" + attr.svg.ns + "です。");
		// console.log("attr.style.fontFamilyは" + attr.style.fontFamily + "です。");
	},false);



	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
    // events //////////////////////////////////////////////////////////////////


	// event: window resize ////////////////////////////////////////////////////
	var resizeTimer;
	var interval = Math.floor(1000 / 60 * 10);

	window.addEventListener('resize', function (event) {
		var widthAll  = getWidth();
		var heightAll = getHeight();
		console.log("widthAll: " + widthAll);
		console.log("heightAll: " + heightAll);
		console.log('resizing');
		if (resizeTimer !== false) {
			clearTimeout(resizeTimer);
		}
		resizeTimer = setTimeout(function () {
			console.log('resized');
			console.log(1000 / 60 * 10);
		// do something ...
		setVbRoot();//リサイズ後に、ルートのviewBoxを再設定
		setGrids();
		}, interval);
	});




})();
