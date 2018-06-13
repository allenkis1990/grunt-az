/**
 * author :dww
 * create on 15-1-23
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./train-class-detail-ctrl'),
        service = require('./train-class-detail-service');

    require('angular');
    require('angular-resource');
    require('wijpager');

   var trainclassDetail = angular.module('admin.trainclass.detail', ['ngResource'])

        .controller('admin.trainclass.detail.ctrl', ctrl)

        .factory('admin.trainclass.detail.service', service)

       .filter('toHtml', ['$sce', function($sce) {
           return function(text) {
               return $sce.trustAsHtml(text);
           }
       }]);

    require('angular-wijmo').setModule(trainclassDetail);
});

