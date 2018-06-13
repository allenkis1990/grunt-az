/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var  url='/web/admin/commodity/release';
        var commodity=
            $resource(url+'/:id/:action' ,{id: '@id', action: '@action'}, {
                findCommodityTypes:{method:'get',url:url+'/0/findCommodityTypes'},
                putAway:{method:'post', url:url+'/0/putAway'},
                findTrainClass:{method:'get',url:url+'/0/findTrainClass'}
            })
        return commodity;
    }]
});
     
     