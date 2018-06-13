/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var  url='/web/business/mysetting/userInfo';
        var collect=
            $resource(url+'/:id/:action' ,{id: '@id', action: '@action'}, {
                findUserInfo: {method: 'get', url : url+'/0/findUserInfo'},
                updateUserInfo:{method:'post',url:url+'/0/updateUserInfo'},
                activation:{method: 'get', url : '/web/mall/account/0/sendActivateAccountEmail'}
            })
        return collect;
    }]
});
     
     