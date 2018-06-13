/**
 * author :dww
 * create on 15-1-19
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {

        var trainClass=
            $resource('/web/trainclass/trainClass/:id/:action' ,{}, {
                findTrainClassTypes: {method: 'get', url : '/web/trainclass/trainClass/0/findTrainClassType'},
                loadLessonTypes:{method:'get',url:'/web/trainclass/trainClass/0/loadLessonTypes'},
//                loadNotSelectedLessons:{method:'get',url:'/web/trainclass/trainClass/0/loadNotSelectedLessons'},
                loadLesson:{method:'get',url:'/web/trainclass/trainClass/0/loadSelectedLessons'},
                findSelectedLesson:{method:'post',url:'/web/trainclass/trainClass/0/findSelectedLesson'},
                createTrainDraft:{method:'post',url:'/web/trainclass/trainClass/0/createTrainDraft'}
            })
        return trainClass;
    }]
});
     
     