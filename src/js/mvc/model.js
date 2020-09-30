'use strict';
export default class {
    constructor(utils, config, user) {
        this.config      = config;
        this.utils       = utils;
        this.user        = this.utils.getJSON(this.config.lib.json.storage);
        console.log(this.user);
        this.devices     = this.user.media.devices;
        this.fontSize    = this.user.media.contents.fontSize;
        this.visibility  = this.user.general.visibility;
        this.fixed       = this.user.general.fixed;
        this.scrollbarWidth = this.utils.calcScrollbarWidth();
        this.debug       = config.debug;
        this.msg         = config.msg;
        this.lib         = config.lib;
        this.console     = config.console;
        this.attr        = config.attr;
        this.aria        = config.aria;
        this.style       = config.style;
        this.sizes       = config.sizes;
        this.num         = config.num;
        this.color       = config.color;
        this.elem        = config.elem;
        console.group("%c[" + this.lib.name + "]: %c" + "%cmodel.js:%c %cconstructor()%c", this.console.red , '' , this.console.green , '' , this.console.blue , '' );
            //this.deviceDecision(this.user.general.deviceDecision);
            // this.deviceDecision(this.user.general.deviceDecision, this.user.media.devices, this.user.media.contents.breakPoints.width.min, this.msg.attention.deviceDicision, this.msg.err.deviceDicision);
            // this.scrollbarWidth();
            // this.calcScrollbarWidth();
            this.width();
            this.height();
            // this.fontSize(this.user.media.contents.fontSize);
            this.ua();
            // this.base();
            // this.unit();
            // this.layout();
            // this.rhythm();
            // this.ruler();
            // this.guide();
            // this.gui();
            this.keyboard();
            this.size();
            this.getStyle();
        console.groupEnd();
    }
    getJsonValues( myIndex ) {
        let myMedia = this.user.media;
        return {
             devices: myMedia.devices[ myIndex ]
            ,contents: {
                 writingMode: myMedia.contents.writingMode[ myIndex ]
                ,fontSize: myMedia.contents.fontSize[ myIndex ]
                ,lineHeight: myMedia.contents.lineHeight[ myIndex ]
                ,letterSpacing: myMedia.contents.letterSpacing[ myIndex ]
                ,breakPoints: {
                    width: {
                        min: myMedia.contents.breakPoints.width.min[ myIndex ]
                    }
                }
                ,gutter: myMedia.contents.gutter[ myIndex ]
            }
            ,grids: {
                 base: {
                     num    : myMedia.grids.base.num[ myIndex ]
                    ,gutter : myMedia.grids.base.gutter[ myIndex ]
                 }
                ,column: {
                     num    : myMedia.grids.column.num[ myIndex ]
                    ,sizeChar : myMedia.grids.column.sizeChar[ myIndex ]
                    ,gutter : myMedia.grids.column.gutter[ myIndex ]
                 }
                ,row: {
                     height : myMedia.grids.row.height[ myIndex ]
                    ,gutter : myMedia.grids.row.gutter[ myIndex ]
                }
                ,unit: {
                     num    : myMedia.grids.unit.num[ myIndex ]
                    ,gutter : myMedia.grids.unit.gutter[ myIndex ]
                 }
             }
        }
    }
    // calcScrollbarWidth() {
    //     this.utils.calcScrollbarWidth();
    // }
    deviceDecision(decisionStr) {
        // let decision      = decisionStr,
        //     mediaDevices   = mediaDevicesStr,
        //     mediaWidthMin = mediaBreakpointsWidthMinStr,
        //     msgAttention  = msgAttentionStr,
        //     msgErr  = msgErrStr;
        // this.utils.deviceDecision(decision, mediaDevices, mediaWidthMin, msgAttention, msgErr);
        let decision = decisionStr;
        if(decision === "@media") {
            console.log(decision);
            this.media(this.user.media.devices, this.user.media.contents.breakPoints.width.min);
        } else if(decision === "userAgent") {
            console.log(this.msg.attention.deviceDicision);
        } else {
            console.log(this.msg.err.deviceDicision);
        }
        // console.log(fontSize(this.user.media.contents.fontSize));
        console.log(this.devices);
        console.log(this.fontSize);
        console.log(this.fontSize.length);
        console.log(this.fontSize[0]);
    }
    media(devices, breakPoints) {//matchMediaでの判定
        console.log(this.utils.media(devices, breakPoints));
    }
    width() {//幅の取得
        //縦スクロールの有無を確認
        let isScrollbarOccur = this.utils.checkBrowserHeight();
        console.log("ブラウザの縦幅と、スクロール含んだ縦幅を評価中...............");
        console.log(isScrollbarOccur);
        //縦スクロールバーのサイズを取得
        let diffScrollbarWidth = this.scrollbarWidth;
        //横幅を取得
        let widthOrigin = this.utils.width();
        let calcWidth;
        if(isScrollbarOccur == true) {
            calcWidth = widthOrigin - diffScrollbarWidth;
            console.log("true / スクロールバーあり: " + diffScrollbarWidth + "px / width: " + calcWidth + "px");
            console.log(calcWidth);
        } else {
            calcWidth = widthOrigin;
            console.log("false / スクロールバーなし / width: " + calcWidth + "px");
            console.log(calcWidth);
        }
        return calcWidth;
    }
    height() {//高さの取得
        return this.utils.height();
    }
    wrapperHeight() {
        return this.utils.setWrapperHeight();
    }
    // fontSize(setting) {
    //     let jsonSetting = setting;
    //     console.log(jsonSetting);
    //     return jsonSetting;

    // }
    ua() {//userAgentの出力
        this.utils.ua();
    }
    base() {
        console.log("model.js: base()の値を設定します。");
    }
    unit() {
        console.log("model.js: unit()の値を設定します。");
    }
    layout() {
        console.log("model.js: layout()の値を設定します。");
    }
    row() {
    }
    rhythm() {
    }
    ruler() {
        console.log("model.js: ruler()の値を設定します。");
    }
    guide() {
        console.log("model.js: guide()の値を設定します。");
    }
    gui() {
        console.log("model.js: gui()の値を設定します。");
    }
    keyboard() {
        console.log("model.js: keyboard()の値を設定します。");
    }
    size() {//ブラウザのウィンドウサイズを変更する
        console.log("model.js: size()の値を設定します。");
    }
    getStyle() {
        this.utils.getStyles("html");
        // this.utils.detectFontSizeType();
    }

}
