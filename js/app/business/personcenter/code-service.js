/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function ($http, $resource) {
        var url = '/web/business/BusinessPersonCenter';
        var code =
            $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                findUserRedemptionCode: {method: 'get', url: url + '/0/findUserRedemptionCode'},
                findRedemptionCodeUserMangeStatics: {method: 'get', url: url + '/0/findRedemptionCodeUserMangeStatics'},
                exchangeCode: {method: 'get', url: url + '/0/exchangeCode'}
            })
        return code;
    }]
});
     
     