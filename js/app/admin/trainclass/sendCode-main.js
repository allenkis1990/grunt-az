/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {

    'use strict';
    require('angular');
    require('angular-resource');

    var ctrl = require('./train-class-sendCode-ctrl'),
        service = require('./train-class-sendCode-service');
    require('wijpager');
    require('wijinputdate');

    var sendInvitationCodeModule = angular.module('admin.trainclass.sendCode', ['ui.router', 'ngResource'])

        .controller('admin.trainclass.sendCode.ctrl', ctrl)

        .factory('admin.trainclass.sendCode.service', service)

    require('angular-wijmo').setModule(sendInvitationCodeModule);

    require('../../directives/validate').registerForm(sendInvitationCodeModule);
});

