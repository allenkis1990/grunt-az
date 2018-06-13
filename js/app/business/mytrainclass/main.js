/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
   var myTrainClassCtrl = require('./my-train-class-ctrl'),
       myTrainClassService = require('./my-train-class-service');
    require('angular');
    require('angular-resource');
    angular.module('business.mytrainclass', ['ngResource'])

        .controller('business.mytrainclass.ctrl', myTrainClassCtrl)

        .factory('business.mytrainclass.service', myTrainClassService);
});