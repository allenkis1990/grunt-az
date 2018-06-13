/**
 * Created by admin on 15-1-19.
 */



define(function (require, exports, module) {
    'use strict';
    var url='/web/admin/lessonresource/lessonResource/';

    module.exports = [ '$resource', function( $resource) {
        var lessonresource= $resource(url+':id/:action' ,{id: '@id', action: '@action'}, {
            findLessons: {method: 'get', url : url+'0/findOwnLessonSource'},
            deleteLesson:{method: 'get', url : url+'0/deleteLesson'},
            findLessonType:{method: 'get', url : url+'0/findLessonType'}
            });
        return lessonresource;
    }]
});