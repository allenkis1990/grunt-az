/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-24
 * Time: 下午1:11
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    require('validateEngine');

    var config = {
        timer: null,
        content: '提示',
        type: 'error',
        position: 'topRight',
        showArrow: true,
        delayClose: 3000
    };

    module.exports = {
        registerForm: function (mod) {

            mod.directive('validateForm', ['$http', '$timeout', function ($http, $timeout) {

                return {

                    link: function (scope, elem, attr, controller) {
                        scope.$validateForm = $(elem);
                        if (attr.ajax && attr.ajax !== '') {
                            var ajaxes = JSON.parse(attr.ajax);

                            angular.forEach(ajaxes, function (item, index) {
                                $.validationEngineLanguage.allRules[item.name] = {
                                    url: item.url,
                                    "alertText": "* 验证通过",
                                    "alertTextOk": "* 验证失败",
                                    "alertTextLoad": "* 正在确认名称是否有其他人使用,请稍等..."
                                }
                            });
                        }
                        $(elem).validationEngine({
                            scroll: false,
                            promptPosition: config.position
                        });

                        scope.$parent.showTipPrompt = function (id, msg, showWhat, showArrow) {
                            window.clearTimeout(config.timer);
                            var type = showWhat === 'true' ? 'pass' : 'error',
                                msg = msg ? msg : '提示',
                                node = $('#' + id);

                            node.validationEngine('showPrompt',
                                msg,
                                type,
                                config.position,
                                showArrow
                            );

                            // 定时延迟关闭
                            config.timer = $timeout(function () {
                                scope.$validateForm.validationEngine('hide');
                            }, config.delayClose).$$timeoutId;
                        };

                        scope.$parent.hideAllPrompt = function () {
                            scope.$validateForm.validationEngine('hide');
                        };

                        scope.$parent.hideOne = function (id) {
                            $('#' + id).validationEngine('hide');
                        };

                        scope.$parent.getValidateResult = function () {
                            return scope.$validateForm.validationEngine('validate');
                        }
                    }
                }
            }])
        }

    }

});
