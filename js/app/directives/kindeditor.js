/**
 * author :dww
 * create on 15-1-19
 *
 **/
define(function (require, exports, module) {
    'use strict';
    require('jquery');
    require('kindEditor');

    var basePath = '/public/js/lib_ext/kindeditor';
    module.exports = {
        registerKindEditor:function (mod) {
            mod.directive('kindEditor',function () {
                return {
                    require: 'ngModel',
                    scope: {
                        config: '=config'
                    },
                    link: function (scope, elm, attr, ctrl) {

                        if (typeof KindEditor === "undefined") {
                            console.error('Please import the local resources of kindeditor!(无法获取到kindeditor资源包！)');
                            return;
                        }
                        var _config = {
                            uploadJson: '/h',
                            autoHeightMode: false,
                            afterCreate: function () {
                                this.loadPlugin('autoheight');
                            },
                            items: [
                                'fontname', 'fontsize', '|',
                                'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'removeformat', '|',
                                'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', 'wordpaste', '|',
                                'emoticons',
//                                'image',
                                'link', 'unlink'
                            ],
                            width: 600,
                            height: 200,
                            themesPath: basePath + '/themes/',
                            langPath: basePath + '/lang/',
                            pluginsPath: basePath + '/plugins/'
                        };
                        var editorId = elm[0];
                        var editorConfig = scope.config || _config;

                        editorConfig.afterChange = function () {

                            if (!scope.$$phase) {
                                ctrl.$setViewValue(this.html());
                                scope.$apply();

                            }
                        }

                        setTimeout(function(){

                            KindEditor.create(editorId,editorConfig);
                        },1000);

                        ctrl.$parsers.push(function (viewValue) {
                            ctrl.$setValidity('keditor', viewValue);
                            return viewValue;
                        });
                    }
                }
            })
        }
    }

});
     
     