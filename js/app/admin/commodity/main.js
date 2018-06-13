/**
 * author :drj
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./commodity-ctrl'),
        service = require('./commodity-service'),
        $ = require('jquery');
    require('angular');
    require('angular-resource');
    require('wpfDialog');
    require('wijpager');
    require('wijtree');
    var uploadFile = require('../../directives/upload-file');
    var kindEditor =  require('../../directives/kindeditor');
    require('../../directives/dialog');
    require('../../directives/upload');

    var a = require('angular-wijmo');


    var commodityModule = angular.module('admin.commodity', ['ngResource'])



        .controller('admin.commodity.ctrl', ctrl)

        .factory('admin.commodity.service', service)


    a.setModule(commodityModule);
    require('../../directives/validate').registerForm(commodityModule);
    uploadFile.registerUploadWidget(commodityModule);

});
     
     