/**
 * author :drj
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./modify-commodity-ctrl'),
        service = require('./modify-commodity-service'),
        $ = require('jquery');
    require('angular');
    require('angular-resource');
    require('wpfDialog');
    require('wijpager');
    require('wijeditor');
    require('wijwizard');
    require('wijinputdate');
    require('wijtree');
    var kindEditor =  require('../../directives/kindeditor');
    var uploadFile = require('../../directives/upload-file');

    var a = require('angular-wijmo');


    var commodityModule = angular.module('admin.commodity.modify', ['ngResource'])

        .controller('admin.commodity.modify.ctrl', ctrl)

        .factory('admin.commodity.modify.service', service)


    a.setModule(commodityModule);

    require('angular-wijmo').setModule(commodityModule);

    require('../../directives/validate').registerForm(commodityModule);

    require('../../directives/kindeditor').registerKindEditor(commodityModule);

    uploadFile.registerUploadWidget(commodityModule);


});
     
     