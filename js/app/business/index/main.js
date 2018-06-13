/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';

    var indexCtrl = require('./index-ctrl'),
        indexService = require('./index-service');
    require('jquery');
    require('angular-resource');
    var index = angular.module('business.index', ['ngResource'])

        .controller('business.index.ctrl', indexCtrl)

        .factory('business.index.service', indexService)
});

