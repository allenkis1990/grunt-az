/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-28
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    var g = {}, process = {}, event = {}, builder = {};

    var ctrl = require('./resource-type-ctrl.js'),
        service = require('./resource-type-service.js');
    var dialog = require('../../directives/dialog');
    require('wpfDialog');
    require('wijinputdate');
    require('angular-resource');
    var resourceType = angular.module('admin.lessonresource.resourcetype', ['ngResource'])
        .controller('admin.lessonresource.resourcetype.ctrl', ctrl)
        .factory('admin.lessonresource.resourcetype.service', service)
        .directive('dialog', dialog);
    require('angular-wijmo').setModule(resourceType);
    require('../../directives/validate').registerForm(resourceType);
});