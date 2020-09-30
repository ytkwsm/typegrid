/*
 * Copyright (c) 2014 yuta kawasumi(@ytkwsm)
 */

(function(){
    //はじめに動いてるか確認
    console.log("Hello, I am typegrid.js");
    
    /*
    * スクリプト実行時------------------------------
    * 1.ウィンドウサイズを取得
    * 2.ウィンドウの表示領域全体用の親SVGを追加
    * 3.親SVGの中に縦線、横線、それぞれ用のgタグを追加（ウィンドウサイズと同じ）
    * 4.縦線・横線、それぞれ用のgタグに、lineタグで線を追加する（ウィンドウサイズを利用して作る数を決める）
    *
    *
    *
    *
    */
    
    //setting: body element
    
    function tgBodySetting(){
        document.body.style.position = "relative";
        document.body.style.margin = "0";
    }
    window.onload = tgBodySetting;
    
    //setting: rendering area size
    var browserWidth = parseInt(document.documentElement.clientWidth);
    var browserHeight = parseInt(document.documentElement.clientHeight);
    //confirmation: rendering area size
    console.log("first browser width: " + browserWidth);
    console.log("first browser height: " + browserHeight);
    
    //setting: browser window resize
    function winResize(){
        browserWidth = parseInt(document.documentElement.clientWidth);
        browserHeight = parseInt(document.documentElement.clientHeight);
        console.log("modify browser width: " + browserWidth);
        console.log("modify browser height: " + browserHeight);
    }
    //drive: resize function
    window.onresize = winResize;
    
    
    console.log("first browser width: " + browserWidth);
    console.log("first browser height: " + browserHeight);

    //ページが表示された時に作動
    window.addEventListener("load", function(){
        //DocumentFragment
        var tgFragment = document.createDocumentFragment();
        
        //svgの生成
        var tgWrapper = document.createElement("svg");
        var tgInner = document.createElement("g");
        var vGrids = document.createElement("g");
        var hGrids = document.createElement("g");
        var vGridsChild = document.createElement("line");
        var hGridsChild = document.createElement("line");
        
        //操作UIの作成
        var tgController = document.createElement("div");
        
        //生成したsvg, gの属性を設定
        //tgWrapper
        tgWrapper.id = "tgWrapper";
        tgWrapper.style.display = "block";
        tgWrapper.style.width = "100%";
        tgWrapper.style.height = "50px";
        tgWrapper.style.minHeight = "100%";
        tgWrapper.style.overflow = "hidden";
        tgWrapper.style.position = "relative";
        tgWrapper.style.top = "0px";
        tgWrapper.style.left = "0px";
        //tgInner
        tgInner.id = "tgInner";
        tgInner.style.display = "block";
        //verticalGrid
        vGrids.id = "vGrids";
        vGrids.style.display = "block";
        vGrids.style.position = "relative";
        //horizonGrid
        hGrids.id = "hGrids";
        hGrids.style.display = "block";
        hGrids.style.position = "relative";
        
        //生成したsvgをbodyに追加
        document.getElementsByTagName("body")[0].appendChild(tgWrapper);
        document.getElementById("tgWrapper").appendChild(tgInner);
        document.getElementById("tgInner").appendChild(vGrids);
        document.getElementById("tgInner").appendChild(hGrids);
        
        //ウィンドウリサイズ時の動作設定
        //ウィンドウリサイズ時に、サイズを取得
        
        
        
        //v, hGridsに追加するlineの設定
//        function winResize(){
//            winWidth = parseInt(document.documentElement.clientWidth);
//            winHeight = parseInt(document.documentElement.clientHeight);
//            for (var i=0; i<=100; i++){
//                document.getElementById("vGrids").appendChild(vGridsChild);
//                vGridsChild.setAttribute("x1", i + "0px");
//                vGridsChild.setAttribute("y1", "0px");
//                vGridsChild.setAttribute("x2", i + "0px");
//                vGridsChild.setAttribute("y2", winHeight);
//                vGridsChild.setAttribute("stroke", "#ccc");
//            }
//        }
        //リサイズの関数を実行
//        window.onresize = winResize;
        
    }, false);
})();