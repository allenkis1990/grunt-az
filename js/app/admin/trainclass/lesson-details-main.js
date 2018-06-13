/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-23
 * Time: 下午3:11
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
    'use strict';
    var ctrl = require('./lesson-details-ctrl'),
        service = require('./lesson-details-service'),
        $ = require('jquery');
    require('wpfDialog');
    require('angular');
    require('angular-resource');


    angular.module('admin.lesson', ['ngResource'])
        .controller('admin.lesson.ctrl', ctrl)
        .factory('admin.lesson.service', service);
});