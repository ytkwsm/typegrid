(function(){
    window.onload = function() {
        // ウィンドウがロードされた時に、以下を実行する
        // 1. グリッドを格納するdivを生成する関数を実行
        // 2. グリッドのスタイルをheadタグに生成する関数を実行する
        // 3. ページの幅・高さに合わせて、グリッドを生成する関数を実行する
        typeGridStyles();
        createGridGroup();
        genGrid();
    }

    window.onresize = function() {
        // ウィンドウサイズが変更された時に、以下を実行する
        // 1. リサイズ中、常時関数が動かないようにリサイズ間の制限時間を設定する
        // 2. 生成済みのグリッドを削除する関数を実行する
        // 3. 幅・高さを取得とグリッドの生成を行う関数を再度実行する
        var genTimer = false;
        if(genTimer !== false){
            clearTimeout(genTimer);
        }
        genTimer = setTimeout(function() {
            genGrid();
        }, 800);
        //    removeGrids();

        //        var grids = document.getElementsByClassName("typeGridLine");
        //        var gridsParent = grids.parentNode;
        //        gridsParent.removeChild(grids);
        //
        //        var modifiedHeight;
        //        modifiedHeight = window.innerHeight;
        //        console.log(modifiedHeight);
        //
        //        var modifiedWidth;
        //        modifiedWidth = window.innerWidth;
        //        console.log(modifiedWidth);
        //
        //        for(var i=0; i < modifiedHeight; i += 16){
        //            vGrid(i);
        //            console.log(modifiedHeight+"回、グリッドが呼ばれました");
        //        }
        //
        //
        //        for(var h=0; h < modifiedWidth; h += 16){
        //            hGrid(h);
        //            console.log(modifiedWidth+"回、グリッドが呼ばれました");
        //        }
    }

    //function removeGrid() {
    //    var vGrid = document.getElementsByClassName("vGrid");
    //    var hGrid = document.getElementsByClassName("hGrid");
    //
    //    //全ての要素に対して処理をする
    //    for(var i=0,l=vGrid.length;l>i;i++){
    //        mytable.removeChild(removeTable);
    //
    //    }
    //
    //
    ////    var vGrid = document.querySelector(".vGrid");
    ////    var hGrid = document.querySelector(".hGrid");
    ////    for(var i = vGrid; i>=0; i--){
    ////        vGrid.removeChild(vGrid[i]);
    ////    }
    ////    for(var i = hGrid; i>=0; i--){
    ////        hGrid.removeChild(hGrid[i]);
    ////    }
    //}



    //    function removeGrid(targetClass) {
    //        var target = targetClass.parentNode;
    //        return target.removeChild(targetClass);
    //    }

    //    function removeGrids() {
    //        removeGrid("vGrid");
    //        removeGrid("hGrid");
    //    }

    function createGridGroup() {
        // グリッドをまとめる要素を生成する関数
        var gridGroup = document.createElement("div");
        gridGroup.id = "typeGridWrapper";
        var insertGroup = document.getElementsByTagName("body").item(0);
        insertGroup.appendChild(gridGroup);
        console.log("#typeGridWrapperが生成されました。");
    }

    function yGrid(yNum){
        // 縦軸(y)に横グリッドを定義する関数
        var yGridLine = document.createElement("div");
        yGridLine.style.top = yNum + "px";
        yGridLine.className = "typeGridLine vGrid";
        yGridLine.setAttribute("data-vertical-point", yNum+"px");
    }

    function xGrid(xNum){
        // 横軸(x)に縦グリッドを定義する関数
        var xGridLine = document.createElement("div");
        xGridLine.style.left = xNum + "px";
        xGridLine.className = "typeGridLine hGrid";
        xGridLine.setAttribute("data-horizon-point", xNum+"px");
    }

    function genGrid(){
        // ブラウザの幅・高さを確認して、グリッドを生成する関数
        //1. ブラウザの高さを取得する
        //2. 高さを最大値として、複数のグリッド生成・格納する
        //3. 格納した複数のグリッドを、親要素へ展開する
        var parentWrapper = document.getElementById("typeGridWrapper");
//        var gridGroup = [];
//        var fragment = document.createDocumentFragment;
//        var insertWrapper = document.getElementById("typeGridWrapper"),
//            fragmentY = document.createDocumentFragment(),
//            fragmentX = document.createDocumentFragment();
        var bodyHeight = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
        console.log("このページの高さは"+bodyHeight+"pxです。");

//        var gridGroup = for(var i = 0; i < bodyHeight; i += 16){
//            yGrid(i);
//            console.log("yGrid" + i / 16 + "個目(" + i + "px)");
//        }
//        for(var i = 0; i < bodyHeight; i += 16){
//            fragment.appendChild(yGrid(i));
//            console.log("yGrid" + i / 16 + "個目(" + i + "px)");
//        }
//        parentWrapper.appendChild(fragment);
        console.log("#typeGridWrapper内にグリッドが生成されました。");
    }

//
//    function removeGrid(targetClass) {
//        var target = targetClass.parentNode;
//        return target.removeChild(targetClass);
//    }
//
//    function removeGrids() {
//        removeGrid("vGrid");
//        removeGrid("hGrid");
//    }

    function createGridGroup() {
        var gridGroup = document.createElement("div");
        gridGroup.id = "typeGridGroup";
        var insertGroup = document.getElementsByTagName("body").item(0);
        insertGroup.appendChild(gridGroup);
    }


    function typeGridStyles() {
        // グリッド用のスタイルをheadタグ内に動的に作成する関数
        var document = window.document,
            css = document.createElement('style'),
            rule1 = document.createTextNode('.typeGridLine {background-color:#bbbbbb;position: absolute;opacity:0.5;z-index:9999;}'),
            rule2 = document.createTextNode('.vGrid {width: 100%;height:1px;left:0;}'),
            rule3 = document.createTextNode('.hGrid {width: 1px;height:100%;top: 0;}');
        css.media = 'screen';
        css.type = 'text/css';
        if (css.styleSheet) {
            css.styleSheet.cssText = rule1.nodeValue;
            css.styleSheet.cssText = rule2.nodeValue;
            css.styleSheet.cssText = rule3.nodeValue;
        } else {
            css.appendChild(rule1);
            css.appendChild(rule2);
            css.appendChild(rule3);
        }
        document.getElementsByTagName('head')[0].appendChild(css);
        console.log("typegrid用のスタイルがheadタグ内に生成されました。");
    }

})();
