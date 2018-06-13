/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function ($http, $resource) {
        var url = '/web/business/lessonDetails';
        var code =
            $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                findLessonDetails: {method: 'get', url: url + '/0/findLessonDetails'}

            })
        return code;
    }]
});

