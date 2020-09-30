'use strict';
export default class {
    constructor(utils, model) {
        this.utils = utils;
        this.model = model;
        console.log(this.model.user.general);
        console.group("%c[" + this.model.lib.name + "]: %c" + "%cview.js:%c %cconstructor()%c", this.model.console.red , '' , this.model.console.green , '' , this.model.console.blue , '' );
            // this.wrapper(this.model.elem.wrapper.html, this.model);
        console.groupEnd();

    }
    wrapper(htmlSet, model) {
        this.utils.wrapper(htmlSet, model);
    }
    reset(resetElem) {
        this.utils.reset(resetElem);
    }
    visibility() {
        const status = this.model.visibility;
        const target = document.getElementById("tg_all");
        if(status === true) {
            console.log(this.model.visibility);
            target.setAttribute("style", "display: block");
        } else {
            console.log(this.model.visibility);
            target.setAttribute("style", "display: none");
        }
    }
    render(flg, param1) {//引数によって実行するメソッドを分けたい。
        let flgType = flg;
        if(flgType === "init") {
            console.log('view.js: render("init");');
            this.wrapper(this.model.elem.wrapper.html, this.model);
            this.model.wrapperHeight();
            this.visibility();
            this.utils.insertStyleElem(this.model.config.styleBase);
            // this.model.calcScrollbarWidth();
            this.utils.setSvgSizes("tg_grid", this.model.width(), this.utils.height());
            // this.utils.setSvgSizes("tg_grid", this.model.width(), 400);
            // this.model.calcScrollbarWidth();
            this.currentMedia = this.utils.currentMedia; // 最初
            try { delete this.utils.currentMedia } catch (e) { window.console.log(e); }
            // let renderFontSize = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, "html");
            // なま JSON console.log( this.utils.config );
            this.render( 'resize' );
        } else if(flgType === "resize") {
            console.log('view.js: render("resize");');
            console.log( this.currentMedia );
            console.log( this.currentMedia.contents.fontSize );
            let renderFontSize = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, "html");
            let renderLineHeight = this.currentMedia.contents.lineHeight;
            let renderWidth = this.model.width();
            let renderHeight = this.utils.height();
            this.model.wrapperHeight();
            let renderColumnNum = this.currentMedia.grids.column.num;
            let renderSizeChar = this.currentMedia.grids.column.sizeChar;
            let renderRowHeight = this.currentMedia.grids.row.height;
            let renderRowGutter = this.currentMedia.grids.row.gutter;
            let renderGutter = this.currentMedia.grids.column.gutter;
            let renderGutterSide = this.currentMedia.contents.gutter;
            this.utils.setSvgSizes("tg_grid", renderWidth, renderHeight);
            // this.utils.setSvgSizes("tg_grid", renderWidth, 400);
            this.rhythm(renderFontSize, renderLineHeight, renderWidth, renderHeight);
            this.row(renderFontSize, renderLineHeight, renderWidth, renderHeight, renderRowHeight, renderRowGutter);
            this.layout(renderFontSize, renderWidth, renderHeight, renderColumnNum, renderSizeChar, renderGutter, renderGutterSide);
            this.base();
            this.unit();
        } else if(flgType === "change") {
            console.log('view.js: render("change");');
            this.unit();
        } else if(flgType === "media") {
            this.rhythm();
            console.log('view.js: render("media");');
            this.currentMedia = this.model.getJsonValues( param1 );
            console.log( this.currentMedia );
        }
    }
    grid() {
        type = {//引数によって実行するメソッドを分けたい。
            init: function() {
                console.log(hoge);
            },
            resize: function() {
                console.log(hoge);
            },
            media: function() {
                console.log(hoge);
            }
        }
    }
    base() {
        console.log("view.js: base()を生成します。");
    }
    unit() {
        console.log("view.js: unit()を生成します。");
    }
    layout(currentFontSize, currentWidth, currentHeight, currentColumnNum, currentSizeChar, currentGutter, currentGutterSide) {
        //基本：ブラウザ
        const fontSize = currentFontSize;//現在のフォントサイズ
        const width =  currentWidth;//現在のブラウザ横幅
        const height =  currentHeight;//現在のブラウザ縦幅

        //基本：json上の設定
        const columnNum = currentColumnNum;//現在のカラム数
        const columnSize = currentSizeChar;//現在のカラム1つあたりのサイズ（文字数換算）
        const gutterBaseWidth = currentFontSize * currentGutter;//カラム間のスペースのサイズ（ピクセル）
        const guttterTotal = gutterBaseWidth * columnNum - gutterBaseWidth;//カラム間のスペースの合計サイズ。

        //計算
        const gutterSideEach = this.utils.decisionGutterSideType(currentGutterSide, fontSize);//両端のスペースが"auto"の場合は0、そうでない場合は数値。
        const gutterSideInstallments = gutterSideEach * 2 / columnNum;//両端のスペースの合計値をカラム数で割って、各カラムからマイナスする数値。
        console.log("■テスト中:>>>" + gutterSideInstallments);
        const columnWidth = this.utils.decisionColumnSizeType(fontSize, columnSize, width, columnNum, guttterTotal, gutterSideInstallments);//カラム1つあたりの横幅
        const widthTotal = columnWidth * columnNum;//全カラムの合計値
        const widthAll = guttterTotal + widthTotal;//全カラム＋全溝の合計値
        const gutterOutsideWidthTotal = width - widthAll;//左右両端のスペースの合計値。ブラウザ幅から全カラム＋カラム間の溝の合計幅を引いた数値。
        const gutterOutsideWidthOneSide = gutterOutsideWidthTotal / 2;//左右両端のスペースの合計値の半分。

        console.log("view.js: layout()を生成します。");
        let targetInsert  = document.getElementById("tg_layout__body");
        this.reset(targetInsert);//生成したものを削除
        let insertElement;
        let fragGrids = document.createDocumentFragment();
        // let columnWidthTotal;
        console.log(targetInsert, insertElement, fragGrids);




        for(let cnt = 0; cnt < columnNum; cnt ++){
            console.log("Y軸の実線：" + fontSize);
            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            rect.setAttribute("class", "rect-x" + cnt);
            rect.setAttribute("x", gutterBaseWidth * cnt + cnt * columnWidth + gutterOutsideWidthOneSide);
            rect.setAttribute("y", "0");
            // rect.setAttribute("width", columnWidth - gutterSideEachInstallments);
            rect.setAttribute("width", columnWidth);
            rect.setAttribute("height", height);
            rect.setAttribute("fill", "#ff0000");
            rect.setAttribute("fill-opacity", 0.125);
            rect.setAttribute("stroke", "#ff0000");
            rect.setAttribute("stroke-opacity", 0.5);
            text.appendChild(rect);
            fragGrids.appendChild(rect);
        }
        // return fragGrids;
        targetInsert.appendChild(fragGrids);
    }
    row (currentFontSize, currentLineHeight, currentWidth, currentHeight, currentRowHeight, currentRowGutter) {
        const fontSize = currentFontSize;
        const lineHeight = currentLineHeight;
        const width =  currentWidth;
        const height =  currentHeight;
        const rowHeight = currentRowHeight;
        const rowGuttter = currentRowGutter;
        const rowTotalChar = rowHeight + rowGuttter;
        const rowTotalHeight = rowTotalChar * fontSize;
        console.log("rowTotalChar: " + rowTotalChar);
        console.log("rowTotalChar * fontSize: " + rowTotalChar * fontSize);
        console.log("rowTotalHeight: " + rowTotalHeight);
        const loopNum = parseInt(height / rowTotalHeight + 1);
        console.log("view.js: row()を生成します。");
        console.log("loopNum: ---> " + loopNum);
        console.log("rowHeight: ---> " + rowHeight);
        let targetInsert  = document.getElementById("tg_row__body");
        this.reset(targetInsert);//生成したものを削除
        let insertElement;
        let fragGrids = document.createDocumentFragment();
        for(let cnt = 0; cnt < loopNum; cnt ++){
            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("class", "row-y" + cnt);
            rect.setAttribute("x", "0");
            let nowRowHeight = cnt * rowHeight * fontSize;
            console.log(nowRowHeight);
            let nowRouGutter = cnt * rowGuttter * fontSize;
            console.log(nowRouGutter);
            rect.setAttribute("y", parseInt(nowRowHeight + nowRouGutter ));
            console.log("rowのy座標" + nowRowHeight + nowRouGutter);
            rect.setAttribute("width", width);
            rect.setAttribute("height", rowHeight * fontSize);
            rect.setAttribute("fill", "#ff0000");
            rect.setAttribute("fill-opacity", 0.125);
            rect.setAttribute("stroke", "#ff0000");
            rect.setAttribute("stroke-opacity", 0.5);
            fragGrids.appendChild(rect);
        }
        // return fragGrids;
        targetInsert.appendChild(fragGrids);
    }
    rhythm(currentFontSize, currentLineHeight, currentWidth, currentHeight) {
        const fontSize = currentFontSize;
        const lineHeight = currentLineHeight;
        const width =  currentWidth;
        const height =  currentHeight;
        const loopNum = parseInt(height / fontSize * lineHeight);
        console.log("現在のフォントサイズ→→→→→→→" + fontSize);
        console.log("view.js: rhythm()を生成します。");
        let targetInsert  = document.getElementById("tg_rhythm__body");
        this.reset(targetInsert);//生成したものを削除
        let insertElement;
        let fragGrids = document.createDocumentFragment();
        console.log(targetInsert, insertElement, fragGrids);
        for(let cnt = 0; cnt < loopNum; cnt ++){
            console.log("Y軸の実線：" + fontSize);
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("class", "line-y" + cnt);
            line.setAttribute("x1", "0");
            line.setAttribute("y1", cnt * fontSize * lineHeight / 2);
            line.setAttribute("x2", width);
            line.setAttribute("y2", cnt * fontSize * lineHeight / 2);
            line.setAttribute("fill", "none");
            line.setAttribute("stroke", "#999999");
            line.setAttribute("stroke-width", 0.5);
            line.setAttribute("stroke-opacity", 0.75);
            fragGrids.appendChild(line);
        }
        // return fragGrids;
        targetInsert.appendChild(fragGrids);
    }
    ruler() {
        console.log("view.js: ruler()を生成します。");
    }
    guide() {
        console.log("view.js: guide()を生成します。");
    }
    gui() {
        console.log("view.js: gui()を生成します。");
    }
    keyboard() {
        console.log("view.js: keyboard()を生成します。");
    }
    size() {//ブラウザのウィンドウサイズを変更する
        console.log("view.js: size()を生成します。");
    }
}
