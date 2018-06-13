/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function ($http, $resource) {
        var url = '/web/admin/redemptioncode/adminRedemptionCode';
        var code =
            $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                findAdminRedemptionCode: {method: 'get', url: url + '/0/findAdminRedemptionCode'},
                findRedemptionCodeAdminMangeStatics: {method: 'get', url: url + '/0/findRedemptionCodeAdminMangeStatics'}
            })
        return code;
    }]
});

