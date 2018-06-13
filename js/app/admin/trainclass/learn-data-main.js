/**
 * author :dww
 * create on 15-1-23
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./train-class-learnData-ctrl'),
        service = require('./train-class-learnData-service');

    require('angular');
    require('jquery-download');
    require('angular-resource');
    require('wijpager');
    require('wpfDialog');

    var trainclassLearnData = angular.module('admin.trainclass.learnData', ['ngResource'])

        .controller('admin.trainclass.learnData.ctrl', ctrl)

        .factory('admin.trainclass.learnData.service', service);

    require('angular-wijmo').setModule(trainclassLearnData);
});

