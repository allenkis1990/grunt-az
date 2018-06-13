/**
 * author :dww
 * create on 15-3-3
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var trainClassLesson=
            $resource('/web/trainclass/trainClassLesson/:id/:action' ,{}, {
                loadLessonType:{method:'get',url:'/web/trainclass/trainClassLesson/0/loadLessonType'},
                loadLesson:{method:'get',url:'/web/trainclass/trainClassLesson/0/loadLesson'},
                loadTrainClassLesson:{method:'get',url:'/web/trainclass/trainClassLesson/0/loadTrainClassLesson'},
                saveTrainClassLesson:{method:'post',url:'/web/trainclass/trainClassLesson/0/saveTrainClassLesson'},


            })
        return trainClassLesson;
    }]
});

