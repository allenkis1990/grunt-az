/**
 * Created with IntelliJ IDEA.
 * User: ljl
 * Date: 15-1-15
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    var ctrl = require('./collect-ctrl'),
        service = require('./collect-service');
    var dialog = require('../../directives/dialog');

    require('angular-resource');
    var cole = angular.module('business.personcenter.mycollect', ['ngResource'])

        .controller('business.personcenter.mycollect.ctrl', ctrl)


        .factory('business.personcenter.mycollect.service', service)

        .directive('dialog', dialog)

    require('../../directives/upload-file').registerUploadWidget(cole);


});