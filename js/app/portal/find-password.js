define(function(require) {
    'use strict';
    require('jquery');
    require('validateEngine');
    require('validateEngineLang');
    var g = {};
    var builder;
    var process;
    var event;

    g.node = {
        checkAccount: $('#check_account'),
        mainOperation: $('#main_operation'),
        main: $('#main'),
        choosePath: $('#choose_path'),
        chooseEmail: $('#choose_email'),
        choosePhone: $('#choose_phone'),
        rebuildCode: $('#rebuild_code'),
        resetSuccess: $('#reset_success'),
        accountForm: $('#account_form'),
        phoneForm: $('#phone_form'),
        emailForm: $('#email_form'),
        rebuildForm: $('#rebuild_form'),
        receiveMessage: $('#receive_message'),
        timeOut: $('#time_out')
    };

    g.config = {
        validationEventTrigger: 'blur',
        showPrompts: true,
        promptPosition: 'topRight',
        autoHidePrompt: true,
        autoHideDelay: 10000,
        showOneMessage: true,
        onFailure: false,
        focusFirstField: true
    };

    g.data = {
        timeOut: 0
    };

    builder = {
        installFormValidation: function() {
            g.node.accountForm.validationEngine('attach', g.config);
            g.node.phoneForm.validationEngine('attach', g.config);
            g.node.emailForm.validationEngine('attach', g.config);
            g.node.rebuildForm.validationEngine('attach', g.config);
        },

        mainBind: function() {
            g.node.main.click(function(event) {
                var node = $(event.target).closest('a');
                process.clickNextStep(node);
            });
        },

        checkAccountBind: function() {
            g.node.checkAccount.find('[data-status=input_account]').mouseenter(function() {
                builder.checkAccount();
            });
        },

        checkAccount: function() {
            var status = 'free';
            if (g.node.accountForm.validationEngine('validate') == false) {
                status = 'lazy';
            }
            if (status == 'free') {
                g.node.checkAccount.find('[data-status=input_account]').css('background-color', '#389ed8');
                builder.mainBind();
            } else if (status == 'lazy') {
                g.node.checkAccount.find('[data-status=input_account]').css('background-color', 'gray');
                g.node.main.unbind('click');
            }
        },

        checkPhone: function() {
            var status = 'free';
            if (g.node.phoneForm.validationEngine('validate') == false) {
                status = 'lazy';
            }
            if (status == 'free') {
                g.node.choosePhone.find('[data-status=input_code]').css('background-color', '#389ed8');
                builder.mainBind();
            } else if (status == 'lazy') {
                g.node.choosePhone.find('[data-status=input_code]').css('background-color', 'gray');
                g.node.main.unbind('click');
            }
        },

        checkPhoneBind: function() {
            g.node.choosePhone.find('[data-status=input_code]').mouseenter(function() {
                builder.checkPhone();
            });
        },

        rebuildCode: function() {
            var status = 'free';
            if (g.node.rebuildForm.validationEngine('validate') == false) {
                status = 'lazy';
            }
            if (status == 'free') {
                g.node.rebuildCode.find('[data-status=reset_password]').css('background-color', '#389ed8');
                builder.mainBind();
            } else if (status == 'lazy') {
                g.node.rebuildCode.find('[data-status=reset_password]').css('background-color', 'gray');
                g.node.main.unbind('click');
            }
        },

        rebuildCodeBind: function() {
            g.node.rebuildCode.find('[data-status=reset_password]').mouseenter(function() {
                builder.rebuildCode();
            });
        }
    };

    process = {
        init: function() {
            event.listen();
        },

        commonMethod: function() {
            g.node.checkAccount.parent().addClass('hide');
            g.node.mainOperation.removeClass('hide');
        },

        sendCookie: function() {
                var date = new Date();
                g.data.timeOut = date.getTime() + 10 * 60 * 1000;
                date.setTime(date.getTime() + 15 * 60 * 1000);
                document.cookie = 'hasSendEmail=true; expires=' + date.toGMTString();
        },

        skipRebuildPassword: function() {
            var date = new Date();
            if (document.cookie.indexOf('hasSendEmail=true') != -1) {
                process.commonMethod();
                g.node.rebuildCode.parent().siblings().addClass('hide');
                g.node.rebuildCode.parent().removeClass('hide');
            } else if (document.cookie.indexOf('hasSendEmail=true') != -1 && g.data.timeOut < date.getTime()) {
                process.commonMethod();
                g.node.timeOut.parent().siblings().addClass('hide');
                g.node.timeOut.parent().removeClass('hide');
                date.setTime(date.getTime() - 1000000);
                document.cookie = 'hasSendEmail=true; expires=' + date.toGMTString();
            }
        },

        clickNextStep: function(node) {
            var path = node.data('path');
            var status = node.data('status');
            if (status == 'input_account') {
                process.commonMethod();
                g.node.choosePath.parent().removeClass('hide');
                g.node.mainOperation.removeClass('hide');
            } else if (status == 'choose_path') {
                process.commonMethod();
                if (path == 'email') {
                    g.node.chooseEmail.parent().removeClass('hide');
                    g.node.chooseEmail.parent().siblings().addClass('hide');
                    process.sendCookie();
                } else if (path == 'phone') {
                    g.node.choosePhone.parent().removeClass('hide');
                    g.node.choosePhone.parent().siblings().addClass('hide');
                }
            } else if (status == 'input_code') {
                process.commonMethod();
                g.node.rebuildCode.parent().siblings().addClass('hide');
                g.node.rebuildCode.parent().removeClass('hide');
            } else if (status == 'reset_password') {
                process.commonMethod();
                g.node.resetSuccess.parent().siblings().addClass('hide');
                g.node.resetSuccess.parent().removeClass('hide');
                var date = new Date();
                date.setTime(date.getTime() - 1000000);
                document.cookie = 'hasSendEmail=true; expires=' + date.toGMTString();
            } else if (status == 'change_account') {
                g.node.mainOperation.children().eq(2).children().addClass('hide');
                g.node.mainOperation.addClass('hide');
                g.node.checkAccount.parent().removeClass('hide');
            } else if (status == 'choose_other_path') {
                g.node.choosePath.parent().removeClass('hide');
                g.node.choosePath.parent().siblings().addClass('hide');
            }
        }
    };

    event = {
        listen: function() {
            builder.mainBind();
            builder.checkAccountBind();
            builder.checkPhoneBind();
            builder.rebuildCodeBind();
            builder.installFormValidation();
        }
    };

    process.init();
    process.skipRebuildPassword();
});
