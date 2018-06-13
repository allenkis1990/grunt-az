define(function (require) {
    'use strict';
    require('jquery');
    require('wpfDialog')
    var ve = require('../../lib/validation/lite-validate');
    var g = {};
    var builder;
    var process;
    var event;
    var isshow = false;

    g.node = {
        regTab: $('#reg_tab'),
        emailOperation: $('#email_operation'),
        phoneOperation: $('#phone_operation'),
        emailRegister: $('#email_register'),
        phoneRegister: $('#phone_register'),
        emailRegisterButton: $('#email_register_button'),
        phoneRegisterButton: $('#phone_register_button'),
        changeCodeImage: $('#change_validate_code_img'),
        validateImg: $('#validateImg'),
        password: $('#password'),
        email: $('#email'),
        name: $('#name'),
        show: $('#show'),
        emailCheck: $('#email_check'),
        validateCode: $('#validate_code')


    };

    g.data = {
        isLogin: false,
        accountRegister: {
            email: '',
            name: '',
            password: '',
            accountType: '2'

        },
        pass: false,
        emailPass: false,
        register: false
    }

    g.config = {
        showPrompts: true,
        autoHidePrompt: true,
        autoHideDelay: 10000,
        showOneMessage: true,
        onFailure: false,
        focusFirstField: true
    };

    builder = {
        initFormValidate: function () {
//            $.validationEngineLanguage.allRules.ajaxEmail = {
//                "url": "/web/mall/account/0/validateAccount?accountType=2",
//                "alertTextOk": "* 此邮箱可以使用",
//                "alertText": "* 此邮箱已被其他人使用",
//                // speaks by itself
//                "alertTextLoad": "* 正在确认邮箱是否有其他人使用，请稍等。"
//            };
            g.node.emailRegister.validationEngine('attach', g.config);

//            g.node.phoneRegister.validationEngine('attach', g.config);
            // 注册校验引擎
        },

        checkEmailRegisterResult: function () {
            var isChecked = $('input:checkbox:eq(0)').prop('checked');
            var isCheckPass = g.node.emailRegister.validationEngine('validate');
            var status = 'free';
            if (isChecked == false || isCheckPass == false || g.data.emailPass == false) {
                if (isChecked == false) {

                    ve.showPrompt(g.node.emailCheck, {
                        content: '请接受《集师网用户协议》',
                        type: 'error'
                    });

                }
                if (g.data.emailPass == false) {
                    ve.showPrompt(g.node.email, {
                        content: '请填写有效邮箱',
                        type: 'error'
                    });
                }
            } else {
                g.data.register = false;
//                node.removeAttr('style');
//                node.addClass('button');

                builder.save();
            }
        },

        checkPhoneRegisterResult: function () {
            var isChecked = $('input:checkbox:eq(1)').prop('checked');
            var isCheckPass = g.node.phoneRegister.validationEngine('validate');
            var status = 'free';
            if (isChecked == false || isCheckPass == false) {
                if (isChecked == false) {
                    $.wpfAlert({
                        msg: '请接受《集师网用户协议》'
                    });
                }
            } else {

                builder.save();
            }
        },
        buildValidateCode: function () {
            g.node.validateImg.attr('src', "/web/mall/validateCode/0/getValidateCode?" + Math.random());
        },
        /**
         * 显示明文事件
         * @param e
         */
        clericalDisplay: function () {
            if (isshow) {    //判断
                isshow = false;
                g.node.password.attr('type', 'password');
            } else {
                isshow = true;
                g.node.password.attr('type', 'text');

            }
        },
        save: function () {
            g.data.accountRegister.email = g.node.email.val();
            g.data.accountRegister.name = g.node.name.val();
            g.data.accountRegister.password = g.node.password.val();
            $.post('/web/mall/account/0/create', {frontJSONData: JSON.stringify(g.data.accountRegister)}, function (data) {
                if (data.code === '200') {
                    $.wpfAlert({
                        msg: data.message + '五秒后为您自动跳转'
                    });
                    window.setTimeout(function () {
                        window.location.href = '/web/mall/login';
                    }, 5000);
                }
                else {
                    ve.showPrompt(g.node.emailRegisterButton, {
                        content: data.message,
                        type: 'error'
                    });
                    g.data.pass = false;
                    builder.buildValidateCode();
                }

            }, 'json');
        },

        validateEmail: function () {
            var email = g.node.email.val();
            var url = '/web/mall/account/0/validateAccount?accountType=2';
            $.ajax({
                type: 'get',
                dataType: 'json',
                data: {
                    email: email
                },
                url: url,
                success: function (data) {
                    if (data[1] === 'true') {
                        ve.showPrompt(g.node.email, {
                            content: '此邮箱可用',
                            type: 'pass'
                        })
                        g.data.emailPass = true;

                    } else {
                        g.data.pass = false;
                        ve.showPrompt(g.node.email, {
                            content: data[2],
                            type: 'error'
                        })

                    }
                }
            });
        },
        validateValidationCode: function () {
            var code = $.trim(g.node.validateCode.val());
            var url = '/web/mall/validateCode/0/validationLogin';
            $.ajax({
                type: 'get',
                dataType: 'json',
                data: {
                    fieldValue: code
                },
                url: url,
                success: function (data) {
                    if (data[1] === 'true') {
                        g.data.pass = true;
                        ve.showPrompt(g.node.validateCode, {
                            content: data[2],
                            type: 'pass'

                        });
                        if (g.data.register) {
                            builder.checkEmailRegisterResult()
                        }
                    } else {
                        ve.showPrompt(g.node.validateCode, {
                            content: data[2],
                            type: 'error'

                        })
                        g.data.pass = false;
                    }
                }
            });
        },
        toSave: function () {
            g.data.register = true;
            if (g.data.pass) {
                builder.checkEmailRegisterResult()
            } else {
                builder.validateValidationCode();

            }
        }


    };

    process = {
        init: function () {
            builder.initFormValidate();
            builder.buildValidateCode();
            event.listen();
        },

        choosePath: function (e) {
            var node = $(e.target).closest('a');
            if (node.html().trim().indexOf('邮箱注册') != -1) {
                node.addClass('current').siblings().removeClass('current');
                g.node.emailOperation.removeClass('hide');
                g.node.phoneOperation.addClass('hide');
            } else if (node.html().trim().indexOf('手机注册') != -1) {
                node.addClass('current').siblings().removeClass('current');
                g.node.phoneOperation.removeClass('hide');
                g.node.emailOperation.addClass('hide');
            }

            g.node.emailRegisterButton.removeAttr('style');
            g.node.phoneRegisterButton.removeAttr('style');
            ve.hideAllPrompt();
        }
    };

    event = {
        listen: function () {
            g.node.regTab.click(function (e) {
                process.choosePath(e);
            });
            g.node.emailRegisterButton.click(function () {
                builder.toSave();
            });
            g.node.validateCode.blur(function () {
                builder.validateValidationCode();
            });
            g.node.email.blur(function () {
                var value = g.node.email.val();
                if (value === '') {
                    ve.showPrompt(g.node.email, {
                        content: '此处不能为空白',
                        type: 'error'
                    })
                } else {
                    var reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
                    if (reg.test(value)) {
                        builder.validateEmail();
                    } else {
                        ve.showPrompt(g.node.email, {
                            content: '邮箱地址无效',
                            type: 'error'
                        })
                    }

                }


            });


            g.node.phoneRegisterButton.click(function () {
                builder.checkPhoneRegisterResult($(this));
            });
            g.node.changeCodeImage.click(function () {
                builder.buildValidateCode();
            });
            g.node.validateImg.click(function () {
                builder.buildValidateCode();
            });
            //页面enter事件
            $(document).keydown(function (e) {
                if (e.keyCode === 13) {
                    builder.toSave();
                }
            });


            g.node.show.click(function () {
                builder.clericalDisplay();
            })
        }
    };

    process.init();
})
;
