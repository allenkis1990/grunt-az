/**
 * author :dww
 * create on 15-1-25
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports = ['$http', '$resource', function($http, $resource) {
        var trainClassCode=
            $resource('/web/trainclass/trainClassStudent/:id/:action' ,{}, {
                loadUsers:{method:'post',url:'/web/trainclass/trainClassCode/0/loadCollegeUsers'},
                sendCode:{method:'get',url:'/web/trainclass/trainClassCode/0/sendCode'}

            })
        return trainClassCode;
    }]
});

