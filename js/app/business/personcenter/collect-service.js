/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource',

        function ($http, $resource) {
            var url = '/web/business/BusinessPersonCenter';

            return $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                queryCollects: {
                    method: 'get',
                    url: url + '/0/queryCollects'
                },
                cancelCollect: {
                    method: 'post',
                    url: url + '/0/cancelCollect'
                }
            });

        }]
});
     
     