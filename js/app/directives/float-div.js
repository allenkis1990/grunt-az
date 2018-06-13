/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-20
 * Time: 下午1:04
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    require('jquery');

    module.exports = ['$http', function($http) {
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {
                var ref = attr.ref;
                var refObj = $('#' + ref),
                    refObjHeight = refObj.height(),
                    refOffset = refObj.offset();
                elem.css({
                    position: 'absolute',
                    left: refOffset.left + 'px',
                    top: (refOffset.top + refObjHeight) + 'px'
                });
            }
        }
    }]
});