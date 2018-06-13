/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {


    'use strict';
    require('angular');
    require('angular-resource');

    var ctrl = require('./train-class-ctrl'),
        service = require('./train-class-service');
    var validate =  require('../../directives/validate');
    require('wijpager');
    require('wijinputdate');
    require('wpfDialog');

    var trainclassModule = angular.module('admin.trainclass', ['ui.router', 'ngResource', 'oc.lazyLoad'])

        .controller('admin.trainclass.ctrl', ctrl)

        .factory('admin.trainclass.service', service)

    require('angular-wijmo').setModule(trainclassModule);

    validate.registerForm(trainclassModule);
});
     
     