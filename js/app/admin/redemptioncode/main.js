/**
 * Created with IntelliJ IDEA.
 * User: ljl
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
    require('jquery-download');
    require('angular');
    require('angular-resource');
    require('wijpager');
    require('wijinputdate');


    var redemptioncode = angular.module('admin.redemptioncode', ['ngResource'])
        .controller('admin.redemptioncode.ctrl', ctrl)
        .factory('admin.redemptioncode.service', service)
    require('angular-wijmo').setModule(redemptioncode);
    require('../../directives/validate').registerForm(redemptioncode);
});