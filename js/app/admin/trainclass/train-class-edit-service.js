/**
 * author :dww
 * create on 15-1-25
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var trainClass=
            $resource('/web/trainclass/trainClass/:id/:action' ,{}, {
                loadLessonTypes:{method:'get',url:'/web/trainclass/trainClass/0/loadLessonTypes'},
                findTrainClassTypes: {method: 'get', url : '/web/trainclass/trainClass/0/findTrainClassType'},
                findTrainClassRules:{method:'get',url:'/web/trainclass/trainClass/0/findTrainClassRules'},
                loadLesson:{method:'get',url:'/web/trainclass/trainClass/0/loadSelectedLessons'},
                loadTrainClassLesson:{method:'get',url:'/web/trainclass/trainClass/0/loadTrainClassLesson'},
                findSelectedLesson:{method:'get',url:'/web/trainclass/trainClass/0/findSelectedLesson'},
                showTrainClassDetail: {method: 'get', url : '/web/trainclass/trainClass/0/showTrainClassDetail'},
                showTrainClassLesson:{method:'get',url:'/web/trainclass/trainClass/0/showTrainLesson'},
                updateTrainClass:{method:'post',url:'/web/trainclass/trainClass/0/updateTrainClass'}
            })
        return trainClass;
    }]
});

