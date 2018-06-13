/**
 * author :drj
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    var ctrl = require('./lessonresource-modify-ctrl'),
        service = require('./lessonresource-modify-service'),
        $ = require('jquery');
    require('angular-resource');
    require('wijtree');
    var uploadFile = require('../../directives/upload-file');
    var kindEditor =  require('../../directives/kindeditor');
    require('../../directives/dialog');
    require('../../directives/upload');

    require('wijupload');

    var a = require('angular-wijmo');


    var lessonresourceModifyModule = angular.module('admin.lessonresource.modify', ['ngResource'])



        .controller('admin.lessonresource.modify.ctrl', ctrl)

        .factory('admin.lessonresource.modify.service', service)


    a.setModule(lessonresourceModifyModule);
    require('../../directives/validate').registerForm(lessonresourceModifyModule);
    uploadFile.registerUploadWidget(lessonresourceModifyModule);

});
     
     