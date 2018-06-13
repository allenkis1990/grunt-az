/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {

    'use strict';
    require('angular');
    require('angular-resource');

    var ctrl = require('./train-class-manage-ctrl'),
        service = require('./train-class-manage-service');
    var validate =  require('../../directives/validate');
    require('wijpager');
    require('wijinputdate');
    require('wpfDialog');

    var sendInvitationCodeModule = angular.module('admin.trainclass.manage', ['ui.router', 'ngResource', 'oc.lazyLoad'])

        .controller('admin.trainclass.manage.ctrl', ctrl)

        .factory('admin.trainclass.manage.service', service)

    require('angular-wijmo').setModule(sendInvitationCodeModule);

    validate.registerForm(sendInvitationCodeModule);
});

