/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function ($http, $resource) {
        var url = '/web/admin/trainclass/trainClassStudentLesson';
        var code =
            $resource(url + '/:id/:action', {id: '@id', action: '@action'}, {
                findStudentStudyCondition: {method: 'get', url: url + '/0/findStudentStudyCondition'},
                findClassLessonPage: {method: 'get', url: url + '/0/findClassLessonPage'}
            })
        return code;
    }]
});

