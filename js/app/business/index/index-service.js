/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    module.exports = ['$http', '$resource', function ($http, $resource) {
        var url = '/web/mall/mallIndex';
        var info =
            $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                findUserInfo: {method: 'get', url: url + '/0/validateIAMLogin'},
                updateUserInfo: {post: 'post', url: url + '/0/updateUserInfo'},
                activation: {method: 'get', url: '/web/mall/account/0/sendActivateAccountEmail'}
            })
        return info;
    }]
});