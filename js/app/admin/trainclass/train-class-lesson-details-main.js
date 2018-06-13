/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-23
 * Time: 下午3:11
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
    'use strict';
    var ctrl = require('./train-class-lesson-details-ctrl'),
        service = require('./train-class-lesson-details-service'),
        $ = require('jquery');
    require('wpfDialog');
    require('jquery-download');
    require('angular');
    require('angular-resource');
    require('wijpager');
    require('wijinputdate');


    var trainclasslessondetails = angular.module('admin.trainclasslessondetails', ['ngResource'])
        .controller('admin.trainclasslessondetails.ctrl', ctrl)
        .factory('admin.trainclasslessondetails.service', service)
    require('angular-wijmo').setModule(trainclasslessondetails);
    require('../../directives/validate').registerForm(trainclasslessondetails);
});