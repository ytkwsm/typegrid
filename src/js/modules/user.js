'use strict';
import * as snippet   from "../modules/snippet";
import * as config    from "../data/config";

/**
 * @void getJSON
 * @param successCallBack Ajaxのサクセスの場合の機能
 */
export function getJSON( successCallBack )  {
    fetch( ( snippet.tgFilePathOrigin() || '' ).replace( /typegrid.js/g , "" ) + config.lib.json.file )
	.then(function(response) {
        if ( response.ok ) {
            return response.json();
        }
        throw config.msg.get.notfound;
    })
    .then( successCallBack )
    .catch(function( error ) {
        console.log( error );
        // throw config.msg.get.◯◯
    });
}
