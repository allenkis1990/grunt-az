/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-28
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    var g = {}, process = {}, event = {}, builder = {};

    var ctrl = require('./registration-record-ctrl'),
        service = require('./registration-record-service.js');


    var dialog = require('../../directives/dialog');
    require('wpfDialog');
    require('wijinputdate');
    require('angular-resource');

    var personcenter = angular.module('business.personcenter.record', ['ngResource'])

        .controller('business.personcenter.record.ctrl', ctrl)

        .factory('business.personcenter.record.service', service)

        .directive('dialog', dialog)

        .filter('getPropertyValue', [function() {
            // 根据传进来的参数json字符串， 并且指定哪个属性返回该属性的值
            return function(jsonString, what) {
                var specifiction = JSON.parse(jsonString);
                return specifiction[what];
            }
        }])

        ////// 根据传进来的时间戳， 来把时间戳转换成时间字符串格式 : yyyy-MM-dd HH:mm:ss //////////
        .filter('parseTimestamp2DateStr', [function() {
            return function(str) {
                var date = new Date(str);
                return date.getFullYear() + '-'
                    + (date.getMonth() + 1) + '-'
                    + date.getDate() + ' '
                    + date.getHours() + ':'
                    + date.getMinutes() + ':'
                    + date.getSeconds();
            }
        }])

        ///////////根据订单状态的字符串来转换成对应的展示字符
        //////////     1、2、3、4、5、6、7
        .filter('orderStatus', [function() {
            return function(status) {
                var result = '待付款';
                switch(status) {
                    case '1': case '2':
                        result = '待付款';
                        break;
                    case '3': case '4': case '5':
                        result = '等待卖家发货';
                        break;
                    case '6':
                        result = '报名成功';
                        break;
                    case '7':
                        result = '报名失败';
                        break;
                }
                return result;
            }
        }])
    require('angular-wijmo').setModule(personcenter);
    require('../../directives/validate').registerForm(personcenter);
    require('../../directives/upload-file').registerUploadWidget(personcenter);
});