/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-13
 * Time: 上午9:51
 * To change this template use File | Settings | File Templates.
 */
define(function(require){
    'use strict';
    require('validateEngine');
    var g = {}, process = {}, event = {},
        builder = {};

    g.node = {
        validateForm: $('#validateForm')

    };

    process = {
        init: function() {
            builder.loading();
        }
    };

    builder = {
        loading: function() {
            builder.___validateBuild();
            event.listener();
        },
        ___validateBuild: function() {
            g.node.validateForm.validationEngine();
        }
    };

    event = {
        listener: function() {

        }
    };
    process.init();
});
