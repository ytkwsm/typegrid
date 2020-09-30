'use strict';
export default class {
    constructor(utils, model, view) {

        this.utils = utils;
        this.model = model;
        this.view  = view;

        //イベントをラッピングして、動かすメソッド
        this.media();
        this.init();
        this.resize();
        this.keyBinds(this.model, this.view);

        // console.group("%c[" + this.model.lib.name + "]: %c" + "%ccontroller.js:%c %cconstructor()%c", this.model.console.red , '' , this.model.console.green , '' , this.model.console.blue , '' );
        //     // this.resize(this.model, this.view);
        //     this.keyBinds(this.model, this.view);
        // console.groupEnd();
    }
    init() {
        let _self = this,
            _callback = function() {
                console.log( 'BOO' );
                _self.view.render( 'init' );
            };
        if ( document.readyState === 'loading' ) {
            document.addEventListener('DOMContentLoaded', _callback);
        } else {
            _callback();
        }
    }
    media() {//メディアクエリに変更があった際に、view.jsのメソッドを動かす
        let _self = this,
            renderMedia = function( mediaIndex ) {
                _self.view.render("media", mediaIndex);
            };
		_self.utils.listenMediaQueries(_self.model, _self.view, renderMedia);//this.media()に変更したい
    }
    resize() {//ウィンドウサイズに変更があった際に、view.jsのメソッドを動かす
        let _self = this,
            renderResize = function() {
                _self.view.render("resize");
            };
        _self.utils.checkWindowSize(_self.model, _self.view, renderResize);//this.resize()に変更したい
    }
    keyBinds(model, view) {
        this.utils.keyBinds(model, view);
    }
}
