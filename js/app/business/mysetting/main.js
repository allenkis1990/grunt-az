/**
 * Created with IntelliJ IDEA.
 * User: ljl
 * Date: 15-1-15
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    var ctrl = require('./ctrl'),
        service = require('./service');
    require('jquery');
    require('angular');
    require('angular-resource');
    require('wijpager');
    require('wijinputdate');
    var kindEditor = require('../../directives/kindeditor');

    var a = require('angular-wijmo');

    var mysetting = angular.module('business.mysetting', ['ngResource'])

        .controller('business.mysetting.ctrl', ctrl)

        .factory('business.mysetting.service', service)

    a.setModule(mysetting);
    require('../../directives/validate').registerForm(mysetting);
});