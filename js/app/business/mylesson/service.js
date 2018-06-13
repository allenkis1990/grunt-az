/**
 * author :drj
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var  url='/web/business/mysetting/userInfo';
        var collect=
            $resource(url+'/:id/:action' ,{id: '@id', action: '@action'}, {
            })
        return collect;
    }]
});
     
     