/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var  url='/web/business/mysetting/userInfo';
        var user=
            $resource(url+'/:id/:action' ,{id: '@id', action: '@action'}, {
                updatePassword: {method: 'post', url : url+'/0/updatePassword'}
            })
        return user;
    }]
});
     
     