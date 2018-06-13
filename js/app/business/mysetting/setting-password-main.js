/**
 * Created with IntelliJ IDEA.
 * User: ljl
 * Date: 15-1-15
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    var ctrl = require('./setting-password-ctrl'),
        service = require('./setting-password-service');
    require('jquery');
    require('angular');
    require('angular-resource');
    require('wijpager');
    require('wijinputdate');
    var kindEditor = require('../../directives/kindeditor');
    var a = require('angular-wijmo');

    var password = angular.module('business.mysetting.settingpassword', ['ngResource'])

        .controller('business.mysetting.settingpassword.ctrl', ctrl)

        .factory('business.mysetting.settingpassword.service', service);
    a.setModule(password);
    require('../../directives/validate').registerForm(password);
});