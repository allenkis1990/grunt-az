/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./release-commodity-ctrl'),//引入控制器
        service = require('./release-commodity-service');//引入服务
    require('wpfDialog');
    require('angular');
    require('angular-resource');
    var uploadFile = require('../../directives/upload-file');
    require('wijeditor');
    require('wijwizard');
    require('wijinputdate');
    require('wijtree');

    var releasecommodityModule = angular.module('admin.releasecommodity', ['ngResource'])


        .factory('admin.releasecommodity.service', service)

        .controller('admin.releasecommodity.ctrl', ctrl)


    require('angular-wijmo').setModule(releasecommodityModule);

    require('../../directives/validate').registerForm(releasecommodityModule);

    require('../../directives/kindeditor').registerKindEditor(releasecommodityModule);

    uploadFile.registerUploadWidget(releasecommodityModule);

});
     
     