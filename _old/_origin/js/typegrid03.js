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

	var tg = {
		 data       : "/_assets/js/typegrid.json"
		,prefix     : "tg_"
 		,visibility : false
	}
	// settings: unit //////////////////////////////////////////////////////////
	var unit = {
		 px: "px"
		,rem: "rem"
	}

	// settings: html Elements /////////////////////////////////////////////////
	var wrapper = {
		all: {
			 entity   : "div"
			,class    : "wrapperAll"
			,target   : "body"
			,style    : "display: block;"
		    ,id       : "wrapperAll"
		}
	}

	// settings: layout ////////////////////////////////////////////////////////
	var layout = {
	     wrapper: {
 			 id  : "wrapperAll"
			,index : 9998
 		}
		,grid: {

		}
	    ,base: {
 			 id  : "wrapperAll"
			,index : 9990
 		}
		,char : {
 			 id  : "wrapperAll"
			,index : 9991
 		}
	    ,column: {
 			 id  : "wrapperAll"
			,index : 9992
 		}
	    ,unit: {
 			 id  : "wrapperAll"
			,index : 9993
 		}
	    ,guide: {
 			 id  : "wrapperAll"
			,index : 9994
 		}
	    ,controller : {
 			 id  : "controller"
			,index : 9999
 		}
	}

	// settings: SVG Elements //////////////////////////////////////////////////
	var wrapper = {
		all: {
			 entity: "div"
			,class : "wrapperAll"
		}
	}
	var grid = {
	    base: {//再背面の細かい線
			 common: {
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
		,char : {//1文字分のサイズ
			 class : "unit"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
 		}
		,column: {//カラム
 			 class : "column"
			,entity: "rect"
 		   	,color : "#999"
 		   	,css   : ""
 		}
		,row : {
 			 class : "row"
			,entity: "rect"
 		   	,color : "#999"
 		   	,css   : ""
		}
		,unit : {//複数文字分のサイズ
			 class : "unit"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
 		}
	    ,guide: {//ガイド線
			 class : "guide"
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
		return document.createElementNS(svgNs, ele);
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
	function setVbValue(targetSvg, currentViewBox, currentWidth, currentHeight) {//引数に指定したSVG要素のviewbox属性を、レンダリングエリアのサイズで書き換える関数
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
    //html element generator ///////////////////////////////////////////////////

	//set class object & args
	function Elem(typeName, entityName, className, styles) {
		if (arguments.length <= 0) { typeName = "html" }//引数typeNameに値がなかった場合の初期値
			this.type     = typeName;//html or svg
			this.entity   = entityName;
			this.class    = className;
			this.style    = styles;
			console.log(this.type);
	}
	// set argorythme(prototype) using args
	Elem.prototype.create = function() {
		var self;
		if (this.type === "html") { self = createElem(this.entity); }
		if (this.type === "svg")  { self = createElemNS(this.entity); }
		// console.log(self, this.type);
		return self;
	}
	Elem.prototype.set = function() {
		// this.aria     = attrAria;
		// console.log(this.type+'要素:"'+this.entity+'" class:"'+this.class+'" style:"'+this.style+'"');
		// console.log(this.type+'要素:"'+this.entity+'" class:"'+this.class+'" style:"'+this.style+'"');
		var self = 	this.create();
			self.setAttribute("class", this.class);
			self.setAttribute("style", this.style);
			return self;
	}
	Elem.prototype.insertTag = function(targetName) {
		var self   = 	this.set();
		var target = 	targetName;
		console.log(self);
		var insertTarget = getTag(target);
			insertTarget.appendChild(self);
	}
	Elem.prototype.insertSelector = function(targetName) {
		var self   = 	this.set();
		var target = 	targetName;
		console.log(self);
		var insertTarget = getSelector(target);
			insertTarget.appendChild(self);
	}
	// http://qiita.com/yas-nyan/items/3783ad8839072022ad97

	//run
	// var wrapperAll = new Elem("html", wrapper.all.entity, wrapper.all.class, wrapper.all.style);
	// wrapperAll.insert(wrapper.all.target);
	// var svgWrapper = new Elem("svg", "svg", ".test_svg", attr.style.pointerEvents);
	// svgWrapper.insert(".wrapperAll");


	// function createAllWrap() {// typegrid.jsで生成される全ての要素をまとめるルートの要素を生成する関数
	// 	var allWrap = creEle("div");
	// 	allWrap.id = tgPrefix + "allWrapper";
	// 	var insertWrapTarget = getTag("body");
	// 	insertWrapTarget.appendChild(allWrap);
	// 	console.log("2: #typeGridAllWrapperが生成されました。");
	// }



	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
    // init ////////////////////////////////////////////////////////////////////


	var wrapperAll = new Elem("html", wrapper.all.entity, wrapper.all.class, wrapper.all.style);
	wrapperAll.insertTag(wrapper.all.target);
	console.log(getTag(wrapper.all.target));

	window.addEventListener("DOMContentLoaded",function(){
		// vars
	},false);



	window.addEventListener("load",function(){
		console.log("Start typegrid.js!");
		// console.log("config.char.size.remは" + config.char.size.rem + "です。");
		// console.log("attr.svg.nsは" + attr.svg.ns + "です。");
		// console.log("attr.style.fontFamilyは" + attr.style.fontFamily + "です。");
	},false);


	// function applyData(jsonData) {
	//
	// 	if(window.JSON){
	// 		console.log("[json]load start. >>>");
	// 		var httpObj = new XMLHttpRequest();
	// 		httpObj.open("get", jsonData, true);
	// 		httpObj.send(null);
	// 		console.log("[json]>>> load end.");
	//
	// 		var myJson = parseJson(httpObj.responseText);
	//
	// 		console.log(myJson);
	//
	// 		function parseJson(jsonObj) {
	// 			var data = eval("("+jsonObj+")");
	// 			var resultData = "["+data.config[0].mediaName+"] ";
	// 			// var resultData = "["+data.config[i].mediaName+"] "+data.itemName+" : "+data.itemPrice +"円";
	// 			return resultData;
	// 		}
	//
	// 		// httpObj.onload = function(){
	// 		// 	var myData = JSON.parse(this.responseText);
	// 		// 	var txt = "";
	// 		// 	for (var i=0; i<myData.length; i++){
	// 		// 	   var option = document.createElement("option");
	// 		// 		option.innerText = myData[i].name;
	// 		// 		option.value=myData[i].value;
	// 		// 		document.getElementById("test-json").appendChild(option);
	// 		// 	}
	// 		// }
	// 	}
	//
	// }



	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
    // events //////////////////////////////////////////////////////////////////


	// event: window resize ////////////////////////////////////////////////////
	var resizeTimer;
	var interval = Math.floor(1000 / 60 * 10);

	window.addEventListener('resize', function (event) {
		console.log('resizing');
		if (resizeTimer !== false) {
			clearTimeout(resizeTimer);
		}
		resizeTimer = setTimeout(function () {
			console.log('resized');
			console.log(1000 / 60 * 10);
		// do something ...
		}, interval);
	});




})();
