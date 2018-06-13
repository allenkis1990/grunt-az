/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-23
 * Time: 下午3:11
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {

    'use strict';
    var ctrl = require('./ctrl'),
        service = require('./service'),
        $ = require('jquery');
    require('wpfDialog');
    require('angular');
    require('angular-resource');
    require('wijpager');
    require('wijinputdate');
    require('jquery-download');

    var registration = angular.module('admin.registration', ['ngResource'])
        .controller('admin.registration.ctrl', ctrl)
        .factory('admin.registration.service', service)
    require('angular-wijmo').setModule(registration);
    require('../../directives/validate').registerForm(registration);


});