/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var trainClass=
            $resource('/web/trainclass/trainClass/:id/:action' ,{}, {
                loadTrainClass: {method: 'get', url : '/web/trainclass/trainClass/0/loadTrainClass'},
                deleteTrainClassById:{method:'post',url:'/web/trainclass/trainClass/0/delete'},
                findTrainTypes:{method:'get',url:'/web/trainclass/trainClass/0/findTrainClassType'},
                deleteTrainType:{method:'post',url:'/web/trainclass/trainClass/0/deleteTrainType'},
                tabbingOrder:{method:'get',url:'/web/trainclass/trainClass/0/moveTrainType'},
                saveTrainType:{method:'post',url:'/web/trainclass/trainClass/0/createTrainType'},
                updateTrainType:{method:'post',url:'/web/trainclass/trainClass/0/updateTrainType'},
                delayTrainClass:{method:'post',url:'/web/trainclass/trainClass/0/trainClassDelay'}
            })
        return trainClass;
    }]
});
     
     