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
                findOrderDetails: {method: 'get', url: url + '/0/orderDetails'},
                closeOrder:{method:'get',url:url+'/0/closeOrder'},
                remind: {method: 'get', url: url + '/0/remind'},
                findCloseOrderReasonList: {method: 'get', url: url + '/0/findCloseOrderReasonList'}
            })
        return order;
    }]
});
     
     