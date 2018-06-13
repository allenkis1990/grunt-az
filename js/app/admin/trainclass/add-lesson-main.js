/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {

    'use strict';
    require('angular');
    require('angular-resource');

    var ctrl = require('./train-class-lessonAdd-ctrl'),
        service = require('./train-class-lessonAdd-service');
    require('wijpager');
    require('wijinputdate');

    var lessonAddModule = angular.module('admin.trainclass.lessonAdd', ['ui.router', 'ngResource'])

        .controller('admin.trainclass.lessonAdd.ctrl', ctrl)

        .factory('admin.trainclass.lessonAdd.service', service)

    require('angular-wijmo').setModule(lessonAddModule);

    require('../../directives/validate').registerForm(lessonAddModule);
});

