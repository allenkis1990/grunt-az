/**
 * Created with IntelliJ IDEA.
 * User: drj
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

    var mylesson = angular.module('business.mylesson', ['ngResource'])

        .controller('business.mylesson.ctrl', ctrl)

        .factory('business.mylesson.service', service)

    a.setModule(mylesson);
    require('../../directives/validate').registerForm(mylesson);
});