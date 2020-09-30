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
(function(){
	"use strict";
	//typegrid globals settings
	var tgPrefix           = "tg_";
	var tgCharSizeBase     = 16;
	var tgFontSizeRem      = 16 / tgCharSizeBase;
	var tgDashArray        = tgCharSizeBase / 4;
	var tgColorGridSolid   = "#aaa";
	var tgColorGridDotted  = "#ccc";
	var tgColorGuide       = "#00FFFF";
	var tgColNum           = "";//number or auto
	var tgColPos           = "left";//left, center, right
	var tgColGut           = tgCharSizeBase * 2;//カラム間のスペース
	var tgColColor         = "#999";
	var tgWrapIndex        = 9998;//グリッド全体のz-indexデフォルト値
	var tgContIndex        = 9999;//コントローラー全体のz-indexデフォルト値
	var svgNs              = "http://www.w3.org/2000/svg";//SVG用のおまじない文字列

	// typegrid globals values /////////////////////////////////////////////////
	var char = {
		size : {
			base : {
			 	 px  : 16
				,rem : 1
			}
		}
	}
	var colors = {
	     grid    : {
 			 solid  : "#aaa"
			,dotted : "#ccc"
 		}
	    ,guide   : "#00FFFF"
	    ,column  : "#999"
	}
	var elements = {
	    base: {//再背面の細かい線
 			 class : "column"
			,entity: "line"
 		   	,color : "#ccc"
 		   	,css   : "fill: none; stroke: #ccc; stroke-width: 0.5;"
			,index : 9998
 		}
		,column: {//カラム
 			 class : "column"
			,entity: "rect"
 		   	,color : "#999"
 		   	,css   : ""
			,index : 9998
 		}
		,unit : {//複数文字分のサイズ
			 class : "unit"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
			,index : 9999
 		}
	    ,guide: {//ガイド線
			 class : "guide"
			,entity: "line"
 		   	,color : "#00FFFF"
 		   	,css   : ""
			,index : 9998
 		}
	    ,grid : {
			 class : "grid"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
			,index : 9999
 		}
	    ,gutter : {//カラム間の幅
			 class : "gutter"
			,entity: "rect"
 		   	,color : "#ccc"
 		   	,css   : ""
			,index : 9999
 		}
	}
	var layers = {
	     wrapper: {
 			 id  : "wrapperAll"
			,index : 9998
 		}
	    ,controller : {
 			 id  : "controller"
			,index : 9999
 		}
	}
	var svg = {
	     attr : {
 			 ns  : "http://www.w3.org/2000/svg"
 		}
	}
	var aria = {
	     presen : "role='presentation'"
	}
	var styles = {
	     pointerEvents : "pointer-events: none;"
	}

	console.log("char.base.size.remは" + char.size.base.rem + "です。");

	tgInit();

	function tgInit() {
		window.addEventListener("DOMContentLoaded",function(){

			console.log("Start typegrid.js!");
			createAllWrap();
			createWrapInner();
			createController();
			createGridGroup();
			createColGroup();
			setResetStyle();
			setControlPointer();
			setGrids();
			setContIndex();
			setWrapIndex();
			monitorWindow();
			monitorCharSize(32);
			//formのデフォルト値。関数化したい。。。
			setForm(tg_contFontSize, tgCharSizeBase);
		},false);
	}

	// In order to shorten /////////////////////////////////////
	//create
	function creEle(ele) {
		return document.createElement(ele);
	}
	function creEleNS(ele) {
		return document.createElementNS(svgNs, ele);
	}
	function creFrag() {
		return document.createDocumentFragment();
	}
	function creText(txt) {
		return document.createTextNode(txt);
	}
	function creForm(typ, ja, en, formName) {
		var formLabel = creEle("label");
		var formInput = creEle("input");
		var formLabelJa = creText(ja);
		var formLabelEn = creText(en);
		formLabel.setAttribute("for", formName);
		formInput.setAttribute("id", formName);
		formInput.setAttribute("name", formName);
		formInput.setAttribute("type", typ);
		formLabel.appendChild(formInput);
		formLabel.appendChild(formLabelJa);
		formLabel.appendChild(formLabelEn);
	}
	//get
	function getId(id) {
		return document.getElementById(id);
	}
	function getTag(tag) {
		return document.getElementsByTagName(tag).item(0);
	}
	function getWidth() {
		var currentWidth = window.innerWidth||document.documentElement.clientWidth||0;
// 		var currentWidth = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
		return currentWidth;
	}
	function getHeight() {
		var currentHeight = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
		return currentHeight;
	}
	function getForm(frmTarget) {
		var getForm = frmTarget.getAttribute("value");
// 		var getForm = document.getElementById(frmTarget).defaultValue;
		console.log("Get value:" + getForm);
		return getForm;
	}
	//set
	function setForm(frmTarget, frmValue) {
		console.log("Set value:" + frmTarget);
		frmTarget.setAttribute( "value", frmValue );
	}
	function setWrapIndex() {
		var wrapInner = getId(tgPrefix + "wrapInner");
		wrapInner.style.zIndex = tgWrapIndex;
	}
	function setContIndex() {
		var controller = getId(tgPrefix + "controller");
		controller.style.zIndex = tgContIndex;
	}
	function setLineStyleSolid(){
		var lineStyle = "fill: none;stroke: #ccc;stroke-width:0.5";
		return lineStyle;
	}
	function setLineStyleDash(){
		var lineStyle = "fill: none;stroke: #ccc;stroke-width: 0.5";
		return lineStyle;
	}
	function setGridGroupStyle(){
		var gridGroupStyle = "position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; height: auto;";
		return gridGroupStyle;
	}
	function setColStyle(){
		var lineStyle = "fill: rgba(153, 153, 153, 0.75);stroke: #ccc;stroke-width: 0";
		return lineStyle;
	}
	function setControllerGroupStyle() {
		var controllerGroupStyle = "font-family: \"Open Sans\", Roboto, \"Helvetica Neue\", Helvetica, Verdana, \"Droid Sans\",\"游ゴシック\", YuGothic, \"ヒラギノ角ゴ ProN W3\", \"Hiragino Kaku Gothic ProN\", \"Meiryo UI\", \"メイリオ\", Meiryo, sans-serif;color: #fff;position: fixed; bottom: 0; left: 0; width: 100%; height: auto; padding: 1em; background-color: rgba(0, 0, 0, 0.75);-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;-webkit-font-feature-settings: \"palt\"; -moz-font-feature-settings: \"palt\"; font-feature-settings: \"palt\";";
		return controllerGroupStyle;
	}
	function setFieldStyleText() {
		var textFieldStyle = "box-sizing: border-box; color: #333;border: none; background: #f1f1f1; font-size: 32px; width: 2.5em;height: 1.5em; padding: 0.125em 0; text-align: right; border-radius: 0.125em;";
		return textFieldStyle;
	}
	function setFieldLabelStyle() {
		var labelStyle = "position: relative; clear: both;";
		return labelStyle;
	}
	function setFieldLabelJaStyle() {
		var labelJaStyle = "display: inline; font-size: 0.5em; letter-spacing: -0.25em;";
		return labelJaStyle;
	}
	function setFieldLabelEnStyle() {
		var labelEnStyle = "display: block; margin: 0.125em 0 -0.125em 0;";
		return labelEnStyle;
	}
	function setFieldUnitStyle() {
		var unitStyle = "font-size: 0.5em; position: absolute; bottom: -1em; right: 0.25em; color: #333;";
		return unitStyle;
	}
	function setFieldLabelInnerStyle() {
		var labelInnerStyle = "display: block; width: 5em; margin: 0.35em 0.25em 0 0; float: left;";
		return labelInnerStyle;
	}

	// algorithm /////////////////////////////////////
	//loop
	function loopGridSolidX(fontSize) {
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
	function loopGridDashX() {
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
	function loopGridSolidY(fontSize) {
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
	function loopGridDashY() {
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
	function loopColX(fontSize) {
		if(fontSize == undefined){
			fontSize = tgCharSizeBase;
		}
		var fragGrids = creFrag();
		var calcGridNum  = getWidth() / fontSize;
		var floorNum = Math.floor(calcGridNum);
// 		for(var cnt = 0; cnt < floorNum; cnt ++){
		for(var cnt = 0; 2; cnt ++){
			console.log("X軸の実線：" + floorNum);
			var rect = creEleNS("rect");
			rect.setAttribute("class", "rect-x" + cnt);
			rect.setAttribute("x", cnt * fontSize);
			rect.setAttribute("y", "0");
			rect.setAttribute("width", fontSize);
			rect.setAttribute("height", getHeight());
			rect.setAttribute("style", setColStyle());
			fragGrids.appendChild(rect);
		}
		return fragGrids;
	}
	//create
	function createAllWrap() {// typegrid.jsで生成される全ての要素をまとめるルートの要素を生成する関数
		var allWrap = creEle("div");
		allWrap.id = tgPrefix + "allWrapper";
		var insertWrapTarget = getTag("body");
		insertWrapTarget.appendChild(allWrap);
		console.log("2: #typeGridAllWrapperが生成されました。");
	}

	function createWrapInner() {//ルートの要素の直下にUIとグリッドを囲むための要素を生成する関数
		var wrapBody = creEle("div");
		wrapBody.id = tgPrefix + "wrapBody";
		var wrapInner = creEle("div");
		wrapInner.id = tgPrefix + "wrapInner";
		var insertBodyTarget = getId(tgPrefix + "allWrapper");
		insertBodyTarget.appendChild(wrapBody);
		var insertInnerTarget = getId(tgPrefix + "wrapBody");
		insertInnerTarget.appendChild(wrapInner);
		console.log("2: #typeGridAllWrapperが生成されました。");
	}

	function createController() {//UIを囲むための要素を生成する関数
		var controller = creEle("div");
		controller.id = tgPrefix + "controller";
		var insertGroupTarget = getId(tgPrefix + "allWrapper");
		insertGroupTarget.appendChild(controller);
		var c_Body = creEle("form");
		c_Body.setAttribute("id", tgPrefix + "controllerBody");
		c_Body.setAttribute("name", tgPrefix + "controllerBody");
		var inserBodyTarget = getId(tgPrefix + "controller");
		inserBodyTarget.appendChild(c_Body);
		console.log("5: #controllerが生成されました。");

		//font-sizeの入力欄
		var label          = creEle("label");
		var input          = creEle("input");
		var labelJa        = creText("フォントサイズ");
		var labelEn        = creText("Font size");
		var unitPx         = creText("px");
		var labelInner     = creEle("span");
		var labelJaWrapper = creEle("span");
		var labelEnWrapper = creEle("span");
		var unitWrapper    = creEle("span");
		label.setAttribute("for", tgPrefix + "contFontSize");
		label.setAttribute("style", setFieldLabelStyle());
		input.setAttribute("id", tgPrefix + "contFontSize");
		input.setAttribute("name", tgPrefix + "contFontSize");
		input.setAttribute("type", "number");
		input.setAttribute("value", "");
		input.setAttribute("style", setFieldStyleText());
		label.appendChild(input);
		labelInner.setAttribute("class", tgPrefix + "labelBody");
		labelInner.setAttribute("style", setFieldLabelInnerStyle());
		labelJaWrapper.setAttribute("class", tgPrefix + "labelJa");
		labelJaWrapper.setAttribute("style", setFieldLabelJaStyle());
		labelJaWrapper.appendChild(labelJa);
		labelEnWrapper.setAttribute("class", tgPrefix + "labelEn");
		labelEnWrapper.setAttribute("style", setFieldLabelEnStyle());
		labelEnWrapper.appendChild(labelEn);
		labelInner.appendChild(labelEnWrapper);
		labelInner.appendChild(labelJaWrapper);
		unitWrapper.appendChild(unitPx);
		unitWrapper.setAttribute("style", setFieldUnitStyle());
		label.insertBefore(labelInner, input);
		label.appendChild(unitWrapper);
		c_Body.appendChild(label);
	}

	function createGridGroup() {// グリッドをまとめる要素を生成する関数
		var gridGroup = creEle("div");
		gridGroup.id = tgPrefix + "gridGroup";
		var insertGroupTarget = getId(tgPrefix + "wrapInner");
		insertGroupTarget.appendChild(gridGroup);
		console.log("3: #gridGroupが生成されました。");
		var gridBody = creEleNS("svg");
		gridBody.setAttribute("id", tgPrefix + "gridBody");
		gridBody.setAttribute("width", getWidth());
		gridBody.setAttribute("height", getHeight());
		gridBody.setAttribute("viewBox", "0 0 200 200");
		var insertBodyTarget = getId(gridGroup.id);
		insertBodyTarget.appendChild(gridBody);
	}

	function createColGroup() {// グリッドをまとめる要素を生成する関数
		var colGroup = creEle("div");
		colGroup.id = tgPrefix + "colGroup";
		var insertGroupTarget = getId(tgPrefix + "wrapInner");
		insertGroupTarget.appendChild(colGroup);
		console.log("4: #colGroupが生成されました。");
		var colBody = creEleNS("svg");
		colBody.setAttribute("id", tgPrefix + "colBody");
		var insertBodyTarget = getId(colGroup.id);
		insertBodyTarget.appendChild(colBody);
	}
	//get
	function getViewBox(currentWidth, currentHeight){
		//ブラウザの現在のレンダリングエリアのサイズと同一の数値をviewbox属性の値として書き出す関数
		//引数：横幅、縦幅
		//使用例：getViewBox(getWidth(), getHeight());
		var viewBoxValue = new Array();
		viewBoxValue.push("0 0 ");
		viewBoxValue.push(currentWidth);
		viewBoxValue.push(" ");
		viewBoxValue.push(currentHeight);
		var svgViewBox = viewBoxValue.join('');
		return svgViewBox;
	}
	//set
	function setViewBox(targetSvg, currentViewBox, currentWidth, currentHeight) {
		//引数に指定したSVG要素のviewbox属性を、ブラウザのレンダリングエリアのサイズで書き換える関数
		//引数：対象SVG要素、viewboxの値、横幅、縦幅
		//使用例：setSvgView(target, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
		targetSvg.textContent = null;
		targetSvg.removeAttribute("viewBox");
		targetSvg.setAttribute("viewBox", getViewBox(currentWidth,currentHeight));
		targetSvg.setAttribute("width", currentWidth);
		targetSvg.setAttribute("height", currentHeight);
	}
	function setResetStyle() {
		var parentResetStyle = setGridGroupStyle();
		var controllerResetStyle = setControllerGroupStyle();
		var wrapInner = getId(tgPrefix + "wrapInner");
		wrapInner.setAttribute("style", parentResetStyle);
		var gridGroup = getId(tgPrefix + "gridGroup");
		gridGroup.setAttribute("style", parentResetStyle);
		var colGroup = getId(tgPrefix + "colGroup");
		colGroup.setAttribute("style", parentResetStyle);
		var tgController = getId(tgPrefix + "controller");
		tgController.setAttribute("style", controllerResetStyle);
	}

	function setControlPointer(){
		var targetWrap = getId(tgPrefix + "wrapBody");
		targetWrap.setAttribute("style", "pointer-events: none;");
	}

	function setGrids() {
		var gridBody = getId(tgPrefix + "gridBody");
		var colBody = getId(tgPrefix + "colBody");
			setViewBox(gridBody, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
			setViewBox(colBody, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
			gridBody.appendChild(loopGridSolidY());
			gridBody.appendChild(loopGridSolidX());
			gridBody.appendChild(loopGridDashY());
			gridBody.appendChild(loopGridDashX());
// 			colBody.appendChild(loopColX());
	}
	//rebuild
	function redrawGrid(currentFontSize) {
		var currentSize = currentFontSize;
		if(currentSize == undefined){
			var currentSize = document.forms.tg_controllerBody.tg_contFontSize.value = tgCharSizeBase;
			var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = tgCharSizeBase;
			return false;
		} else if(currentSize == 0) {
			var currentSize = document.forms.tg_controllerBody.tg_contFontSize.value = 1;
			var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = currentSize;
		} else {
			//問題がないとき
			var gridBody = getId(tgPrefix + "gridBody");
			var colBody = getId(tgPrefix + "colBody");
			console.log('resized.');
			console.log("width：" + getWidth());
			console.log("height：" + getHeight());
			console.log("viewboxの値：" + getViewBox(getWidth(),getHeight()));
			console.log('↑result.');
			//reset svg viewbox & width, height
			setViewBox(gridBody, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
			setViewBox(colBody, getViewBox(getWidth(), getHeight()),getWidth(), getHeight());
			//append svg elements
			gridBody.appendChild(loopGridSolidY(currentSize));
			gridBody.appendChild(loopGridSolidX(currentSize));
			gridBody.appendChild(loopGridDashY());
			gridBody.appendChild(loopGridDashX());
	// 		colBody.appendChild(loopColX(currentFontSize));
		}
	}

	//monitor
	function monitorWindow() {
		var currentFontSize = document.forms.tg_controllerBody.tg_contFontSize.value;
		var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = currentFontSize;
		var charSizeField = getId(tgPrefix + "contFontSize");
		var resizeTimer;
		var interval = Math.floor(1000 / 60 * 10);
		window.addEventListener('resize', function (event) {
			if(currentFontSize == undefined){
				console.log("値がundefinedのとき");
				var currentFontSize = document.forms.tg_controllerBody.tg_contFontSize.value = tgCharSizeBase;
				var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = tgCharSizeBase;
				return false;
			} else if(currentFontSize == 0) {
				console.log("値が0のとき");
					redrawGrid(currentFontSize);
				var currentFontSize = document.forms.tg_controllerBody.tg_contFontSize.value = 1;
				var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = currentFontSize;
			} else {
				console.log('resizing...');
				if (resizeTimer !== false) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(function () {
					redrawGrid(currentFontSize);
				}, interval);
			}
		});
	}
	//update
	function monitorCharSize() {
		var parentField = getId(tgPrefix + "controllerBody");
		var charSizeField = getId(tgPrefix + "contFontSize");
		charSizeField.addEventListener( "blur" , function () {
			var currentFontSize = document.forms.tg_controllerBody.tg_contFontSize.value;
			var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = currentFontSize;
			console.log("フォントサイズ " + currentFontSize + "px");
			if(currentFontSize == undefined){
				console.log("値がundefinedのとき");
				var currentFontSize = document.forms.tg_controllerBody.tg_contFontSize.value = tgCharSizeBase;
				var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = tgCharSizeBase;
				return false;
			} else if(currentFontSize == 0) {
				console.log("値が0のとき");
				var currentFontSize = document.forms.tg_controllerBody.tg_contFontSize.value = 1;
				var defaultFontSize = document.forms.tg_controllerBody.tg_contFontSize.defaultValue = currentFontSize;
			} else {
				redrawGrid(currentFontSize);
			}

		} , false );
	}

})();



/*

	function resetLineAttr(dir, shape, ele, cnt, charSize, dashArry){
		if(dir == x) {
			ele.setAttribute("class", "line-x" + cnt);
			if(shape == solid) {
				ele.setAttribute("x1", cnt * charSize);
				ele.setAttribute("x2", cnt * charSize);
			} else if(shape == dash) {
				ele.setAttribute("x1", cnt * dashArry);
				ele.setAttribute("x2", cnt * dashArry);
			} else {
				return false;
			}
			ele.setAttribute("y1", "0");
			ele.setAttribute("y2", getHeight());
		} else if(dir == y) {
			ele.setAttribute("class", "line-x" + cnt);
			if(shape == solid) {
				ele.setAttribute("y1", cnt * charSize);
				ele.setAttribute("y2", cnt * charSize);
			} else if(shape == dash) {
				ele.setAttribute("y1", cnt * dashArry);
				ele.setAttribute("y2", cnt * dashArry);
			} else {
				return false;
			}
			ele.setAttribute("x1", "0");
			ele.setAttribute("x2", getWidth());
		} else {
			return false;
		}
		if(shape == solid) {
			ele.setAttribute("style", setLineStyleSolid());
		} else if(shape == dash) {
			ele.setAttribute("stroke-dasharray", "1,1");
			ele.setAttribute("style", setLineStyleDash());
		} else {
			return false;
		}
	}
*/


/*
	function creForm(typ, ja, en, formName) {
		var formLabel = creEle("label");
		var formInput = creEle("input");
		var formLabelJa = creText(ja);
		var formLabelEn = creText(en);
		formLabel.setAttribute("for", formName);
		formInput.setAttribute("id", formName);
		formInput.setAttribute("name", formName);
		formInput.setAttribute("type", typ);
		formLabel.appendChild(formInput);
		formLabel.appendChild(formLabelJa);
		formLabel.appendChild(formLabelEn);
	}


		var c_fontSize = creForm(text, "フォントサイズ", "font size", "tgContFontSize");


		var l_fontSize = creEle("label");
		var i_fontSize = creEle("input");
		var t_fontSize = creText("フォントサイズ");;
		l_fontSize.setAttribute("for", "contFontSize");
		i_fontSize.setAttribute("id", "contFontSize");
		i_fontSize.setAttribute("name", "contFontSize");
		i_fontSize.setAttribute("type", "text");
		l_fontSize.appendChild(i_fontSize);
		l_fontSize.appendChild(t_fontSize);
		var c_fontSize = creForm();
		controller.appendChild(l_fontSize);
*/
