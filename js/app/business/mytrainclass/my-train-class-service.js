/**
 * Created with IntelliJ IDEA.
 * User: drj
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    var url='/web/business/mytrainclass/myClassManagement/';
    module.exports = [ '$resource', function( $resource) {
        var mytrainclass= $resource(url+':id/:action' ,{id: '@id', action: '@action'}, {
            findMyTrainClass: {method: 'get', url : url+'0/findMyTrainClass'}
        });
        return mytrainclass;
    }]
});