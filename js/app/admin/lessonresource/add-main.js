/**
 * author :drj
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./lessonresource-add-ctrl'),
        service = require('./lessonresource-add-service'),
        $ = require('jquery');
    require('angular-resource');
    require('wijtree');
    var uploadFile = require('../../directives/upload-file');
    var kindEditor =  require('../../directives/kindeditor');
    require('../../directives/dialog');
    require('../../directives/upload');

    require('wijupload');

    var a = require('angular-wijmo');


    var lessonresourceAddModule = angular.module('admin.lessonresource.add', ['ngResource'])



        .controller('admin.lessonresource.add.ctrl', ctrl)

        .factory('admin.lessonresource.add.service', service)


    a.setModule(lessonresourceAddModule);
    require('../../directives/validate').registerForm(lessonresourceAddModule);
    uploadFile.registerUploadWidget(lessonresourceAddModule);

});
     
     