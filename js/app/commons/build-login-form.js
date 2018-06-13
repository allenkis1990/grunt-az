/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-13
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
    'use strict';

    var ve = require('../../lib/validation/lite-validate');

    var options = {
        context: null,
        initLogonContextUrl: '/web/mall/login/0/loadLogonContext'
    };

    var g = {
        node: {
            form: null,
            loginInput: null,
            password: null
        }
    };

    var process = {

        /**
         * 初始化登陆的上下文，主要是获取登陆必须的4个ID
         * @private
         */
        __initLogonContext: function(targetUrl) {
            options.targetUrl = targetUrl;

            $.get(options.initLogonContextUrl, function(data) {
                if (200 == data.code) {
                    options.context = data.data;
                    // console.log(options.context);
                    process.__loadSSOScript();
                }
            }, 'json');
        },

        /**
         * 加载单点认证的脚本
         * @private
         */
        __loadSSOScript: function() {
            $(document.body).append('<script type="text/javascript" src="' + options.context.casDomain + '/login?TARGET=' + options.context.currentDomain + '/web/sso/auth&js"></script>');
        },

        /**
         * 关闭窗体
         * @param dialog
         * @private
         */
        __closeDialog: function (dialog) {
            dialog.unbind().remove();
            $(document.body).css({ overflow: 'auto'});
        },

        __buildWrap: function () {

            var html = [],
                dialogId = 'dialog_' + new Date().getTime();
            html.push('<div id="' + dialogId + '" style="width: 100%;height: 100%;position: fixed;top: 0;z-index: 1000000;background: rgba(0, 0, 0, 0.71);"></div>');
            $(document.body).append(html.join());
            return $('#' + dialogId);
        },

        /**
         * 注册跳转
         * @param dialog
         * @private
         */
        _registerPage:function () {
            window.location.href = '/web/mall/account/';
        },



        /**
         * 事件绑定
         * */
        __eventBinding: function (dialog) {
            var loginUrl = '';
            dialog.on('click', function (e) {
                var $this = $(e.target);
                if ($this.closest('#login_form').length <= 0 || $this.closest('#close').length > 0) {
                    process.__closeDialog(dialog);
                } else if ($this.closest('#login_btn_').length > 0) {
                    if(g.node.form.validationEngine('validate')){
                        if(!$this.hasClass('btn-disable')) {
                            $('#login_btn_').addClass('btn-disable');
                            //请求登录
                            var context = options.context;
                            $.ajax({
                                url: '/web/sso/preAuth',
                                type: 'post',
                                data: {
                                    "accountType":'2',
                                    "account": g.node.loginInput.val(),
                                    "password": g.node.password.val()
                                },
                                asnyc:false,
                                dataType: 'json',
                                success: function (data) {
                                    if (data.isSuccess){
                                        ssoLogin.login(
                                            context.platformId, context.platformVersionId,
                                            context.projectId, context.subProjectId,
                                            '2', g.node.loginInput.val(), g.node.password.val(),
                                            "{'portalType':'mall', 'targetUrl': '" + options.targetUrl + "'}"
                                        );
                                    }else{
                                        ve.showPrompt(g.node.loginInput, {
                                            content: data.message,
                                            type: 'error'
                                        });

                                    }
                                }
                            });

                            setTimeout(function () {
                                $('#login_btn_').removeClass('btn-disable');
                            },5000)
                        }
                        e.preventDefault();
                    }
                } else if($this.closest('#now_register').length>0){
                    process._registerPage();
                }
            });
        },

        __buildValidateForm: function (dialog) {
            g.node.form = dialog.find('#login_form_');
            g.node.form.validationEngine({ scroll: false });
        },

        __animateForm: function (dialog) {
            dialog.find('#login_form')
                .css({ marginTop: '-300px' })
                        .stop()
                .animate({ marginTop: '-' + 190 + 'px' });
        }
    };

    module.exports = {

        createLoginDialog: function (forwardUrl) {
            process.__initLogonContext(forwardUrl);
            // process.__loadSSOScript();
            var instance = process.__buildWrap(),
                promise = $.get('/public/templates/htmls/login-tpl.html', function (data) {
                    instance.html(data);
                }, 'text');


            promise.done(function () {
                g.node.loginInput = $('#login_input');
                g.node.password = $('#password');

                process.__animateForm(instance);
                process.__buildValidateForm(instance);
                process.__eventBinding(instance);
            });

            // 隐藏body的滚动条
            promise.done(function () {
                $(document.body).css({ overflow: 'hidden' });
            });
        }
    }
});