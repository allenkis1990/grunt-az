/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function ($http, $resource) {
        var url = '/web/admin/order/order';
        var order =
            $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                findOrders: {method: 'get', url: url + '/0/findOrders'},
                closeOrder: {method: 'get', url: url + '/0/closeOrder'},
                sendCode: {method: 'get', url: url + '/0/sendActivationCode'},
                findCode: {method: 'get', url: url + '/0/lookActivationCode'},
                findUserInfo: {method: 'get', url: url + '/0/findUserInfo'},
                findCloseOrderReasonList: {method: 'get', url: url + '/0/findCloseOrderReasonList'}
            })
        return order;
    }]
});
     
     