/**
 * author :dww
 * create on 15-1-25
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var trainClass=
            $resource('/web/trainclass/trainClassManage/:id/:action' ,{}, {
                findTrainClassBasicData:{method:'get',url:'/web/trainclass/trainClassManage/0/findTrainClassBasicData'},
                loadManageData:{method:'get',url:'/web/trainclass/trainClassManage/0/loadManageData'}
            })
        return trainClass;
    }]
});

