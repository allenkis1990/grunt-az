/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./train-class-edit-ctrl'),
        service = require('./train-class-edit-service');

    require('angular');
    require('angular-resource');
    var uploadFile = require('../../directives/upload-file');
    require('wijeditor');
    require('wijwizard');
    require('wijinputdate');
    require('wijtree');

    var trainClassEdit = angular.module('admin.trainclass.edit', ['ngResource', 'ui.router'])


        .controller('admin.trainclass.edit.ctrl', ctrl)

        .factory('admin.trainclass.edit.service', service)


    require('angular-wijmo').setModule(trainClassEdit);

    require('../../directives/validate').registerForm(trainClassEdit);

    uploadFile.registerUploadWidget(trainClassEdit);

    require('../../directives/kindeditor').registerKindEditor(trainClassEdit);


});

