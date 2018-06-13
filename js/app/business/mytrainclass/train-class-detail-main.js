/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
   var trainClassDetailCtrl = require('./train-class-detail-ctrl'),
       trainClassDetailService = require('./train-class-detail-service');
    require('angular');
    require('angular-resource');
    require('jquery-download');
    var trainClassDetailModule =angular.module('business.mytrainclass.trainclassdetail', ['ngResource'])

        .controller('business.mytrainclass.train-class-detail.ctrl', trainClassDetailCtrl)

        .factory('business.mytrainclass.train-class-detail.service', trainClassDetailService);
    require('../../directives/validate').registerForm(trainClassDetailModule);
});