/**
 * Created with IntelliJ IDEA.
 * User: ljl
 * Date: 15-1-15
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    var ctrl = require('./code-ctrl'),
        service = require('./code-service');
    var dialog = require('../../directives/dialog');

    require('angular-resource');
    var code = angular.module('business.personcenter.code', ['ngResource'])

        .controller('business.personcenter.code.ctrl', ctrl)


        .factory('business.personcenter.code.service', service)

        .directive('dialog', dialog)

});