/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-12
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    'use strict';
    require('jquery');
    require('kindEditor');
    var process = {};
    process = {
        init: function() {
            KindEditor.ready(function(K) {
                window.editor = K.create('#test');
            });
        }
    };
    process.init();
});
