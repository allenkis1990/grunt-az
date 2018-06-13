/**
 * Created by admin on 15-1-19.
 */



define(function (require, exports, module) {
    'use strict';
    var url='/web/admin/lessonresource/lessonResource/';

    module.exports = [ '$resource', function( $resource) {
        var lessonresource= $resource(url+':id/:action' ,{id: '@id', action: '@action'}, {
            checkLessonName: {method: 'get', url : url+'0/checkLessonName'},
            saveLesson:{method: 'post', url : url+'0/saveLesson'},
            findLessonTypeByParentId:{method: 'get', url : url+'0/findLessonTypeByParentId'}
            });
        return lessonresource;
    }]
});