/**
 * Created by admin on 15-1-19.
 */



define(function (require, exports, module) {
    'use strict';
    var reurl='/web/admin/commodity/commodity/';
    var  url='/web/admin/commodity/release';

    module.exports = [ '$http','$resource', function($http, $resource) {
        var commodity= $resource(url+':id/:action' ,{id: '@id', action: '@action'}, {
            toModifyCommodity: {method: 'get', url : reurl+':id/toModifyCommodity'},
            findCommodityTypes:{method:'get',url:url+'/0/findCommodityTypes'},
            modify:{method:'post',url:reurl+':id/modify'},
            findTrainClass:{method:'get',url:url+'/0/findTrainClass'}
        });
        return commodity;
    }]
});