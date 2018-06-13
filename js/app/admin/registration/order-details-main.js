/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-23
 * Time: 下午3:11
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {

    'use strict';
    var ctrl = require('./order-details-ctrl'),
        service = require('./order-details-service'),
        $ = require('jquery');
    require('angular');
    require('wpfDialog');
    require('angular-resource');

    var a = require('angular-wijmo');


    var registration = angular.module('admin.registration.orderdetails', ['ngResource'])

        .controller('admin.registration.orderdetails.ctrl', ctrl)

        .factory('admin.registration.orderdetails.service', service)


});