/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./train-class-add-ctrl'),
        service = require('./train-class-add-service');

    require('angular');
    require('angular-resource');
    var kindEditor =  require('../../directives/kindeditor');
    var uploadFile = require('../../directives/upload-file');
    require('wijeditor');
    require('wijwizard');
    require('wijinputdate');
    require('wijtree');


    var trainClassAdd = angular.module('admin.trainclass.add', ['ngResource', 'ui.router'])


        .controller('admin.trainclass.add.ctrl', ctrl)

        .factory('admin.trainclass.add.service', service)




    require('angular-wijmo').setModule(trainClassAdd);
    require('../../directives/validate').registerForm(trainClassAdd);

    require('../../directives/kindeditor').registerKindEditor(trainClassAdd);

    require('../../directives/upload-file').registerUploadWidget(trainClassAdd);

});
     
     