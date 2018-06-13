/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-23
 * Time: 下午4:14
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {


    'use strict';

    angular.module('admin.exampaper', ['ui.router', 'oc.lazyLoad'])

        .controller('admin.exampaper.ctrl', ['$scope', function($scope) {
            console.log('exampaper') ;
        }])

});

