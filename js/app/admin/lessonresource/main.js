/**
 * author :drj
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./lessonresource-ctrl'),
        service = require('./lessonresource-service');
    require('angular');
    require('angular-resource');
    require('wpfDialog');
    require('wijpager');

    var a = require('angular-wijmo');

    var lessonresourceModule = angular.module('admin.lessonresource', ['ngResource'])

        .controller('admin.lessonresource.ctrl', ctrl)

        .factory('admin.lessonresource.service', service)


    a.setModule(lessonresourceModule);
});
     
     