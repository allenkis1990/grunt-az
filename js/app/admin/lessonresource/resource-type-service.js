/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function ($http, $resource) {
        var url = '/web/admin/lessonresource/lessonResourceType';
        var order =
            $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                findResourceType: {method: 'get', url: url + '/0/findResourceType'},
                addResourceType: {method: 'post', url: url + '/0/addResourceType'},
                deleteCourseCategory: {method: 'get', url: url + '/0/deleteCourseCategory'},
                updateCourseCategory: {method: 'get', url: url + '/0/updateCourseCategory'},
                exchangeType: {method: 'get', url: url + '/0/exchangeType'},
                moveTypeTop: {method: 'get', url: url + '/0/moveTypeTop'},
                moveTypeBottom: {method: 'get', url: url + '/0/moveTypeBottom'}
            })
        return order;
    }]
});
     
     