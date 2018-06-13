/**
 * author :dww
 * create on 15-1-23
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var trainClass=
            $resource('/web/trainclass/trainClass/:id/:action' ,{}, {
                showTrainClassDetail: {method: 'get', url : '/web/trainclass/trainClass/0/showTrainClassDetail'},
                showTrainClassLesson:{method:'get',url:'/web/trainclass/trainClass/0/showTrainLesson'}
            })
        return trainClass;
    }]
});

