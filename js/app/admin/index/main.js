/**
 * author :翁鹏飞
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {


    'use strict';

    angular.module('admin.index', ['ui.router', 'oc.lazyLoad'])

        .controller('admin.index.ctrl', ['$scope', function($scope) {
            console.log('index') ;
        }])

});
     
     