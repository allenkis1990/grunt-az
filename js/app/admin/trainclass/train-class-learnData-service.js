/**
 * author :dww
 * create on 15-3-9
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var trainClass=
            $resource('/web/trainclass/trainClassManage/:id/:action' ,{}, {
                loadStudentLearnData:{method:'get',url:'/web/trainclass/trainClassManage/0/loadStudentLearnData'}
            })
        return trainClass;
    }]
});
