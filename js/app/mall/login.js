define(function (require) {
    'use strict';
    require('jquery');
    require('validateEngine');
    require('validateEngineLang');
    require('wpfDialog');
    var ve = require('../../lib/validation/lite-validate');
    var cookie = require('../../lib/util/cookie');
    var g = {};
    var builder;
    var process;
    var event;

    g.node = {
        mainOperation: $('#main_operation'),
        loginButton: $('#login_button'),
        account: $('#account'),
        password: $('#password'),
        isLogin: $('#is_login')
    };
    g.data = {
        account: '',
        password: ''

    }
    g.config = {
        validationEventTrigger: 'blur',
        showPrompts: true,
        scroll: false,
        promptPosition: 'topRight',
        autoHidePrompt: true,
        autoHideDelay: 10000,
        showOneMessage: true,
        onFailure: false,
        focusFirstField: true
    };

    builder = {
        initValidationEngine: function () {
            g.node.mainOperation.validationEngine('attach', g.config);
        },
        initData: function () {
            var cookiePassword = cookie.get('password'),
                cookieAccount = cookie.get('account');
            if (cookiePassword) {
                if (cookiePassword !== null && cookiePassword !== '') {
                    g.node.password.val(cookiePassword);
                    g.data.password = cookiePassword;
                }
            }
            if (cookieAccount) {
                if (cookieAccount !== null && cookieAccount !== '') {
                    g.node.account.val(cookieAccount);
                    g.data.account = cookieAccount;
                    g.node.isLogin.prop('checked', true);
//                    process.tologin();
                }
            }
        }
    };

    process = {
        init: function () {
            builder.initValidationEngine();
            builder.initData();
            event.listen();
        },

        getValidateResult: function () {
            return g.node.mainOperation.validationEngine('validate');
        },


        login: function () {
            process.saveData();
            process.preLogin();
            /*$.post('/web/mall/login/0/login', {account: g.data.account, password: g.data.password}, function (data) {
                if (data.code === '200') {

//                window.location.href='/web/mall/account';
                }
                else {
                    $.wpfAlert({
                        msg: data.message
                    })
                }
            }, 'json');*/
        },

        preLogin: function(){
            var account= document.getElementById("account").value;
            var password= document.getElementById("password").value;
            var accountType="2";
            $.ajax({
                url: '/web/sso/preAuth',
                type: 'post',
                data: {
                    "accountType":accountType,
                    "account":account,
                    "password":password
                },
                asnyc:false,
                dataType: 'json',
                success: function (data) {
                    if (data.isSuccess){
                        process.doSsoLogin(account,password);
                    }else{
                        ve.showPrompt(g.node.account, {
                            content: data.message,
                            type: 'error'
                        });
//                        $.wpfAlert({msg:data.message});
//                        alert(data.message);
                    }
                }
            });
        },

        doSsoLogin: function(account,password){
            submit(account,password);
        },

        tologin: function () {
            if (process.getValidateResult() === true) {
                g.node.loginButton.css('background', 'gray').html('登陆中...');
                window.setTimeout(function () {
                    g.node.loginButton.removeAttr('style').html('登陆');
                }, 1500);

                process.login();
            }

        },

        // 记住密码保存cookie
        rememberThePwd: function () {
            var account = $.trim(g.node.account.val()),
                password = $.trim(g.node.password.val());
            cookie.set('account', account, { expires: 7 });
            cookie.set('password', password, { expires: 7 });
        },
        //删除cookie
        removeCookie: function () {
            cookie.remove('account');
            cookie.remove('password');
        },
        //保存数据
        saveData: function () {
            if (g.node.isLogin.is(':checked')) {
                process.rememberThePwd();
            } else {
                process.removeCookie();
            }
        }
    };

    event = {
        listen: function () {
            g.node.loginButton.click(function () {
                process.tologin();
            });

            //页面enter事件
            $(document).keydown(function (e) {
                if (e.keyCode === 13) {
                    process.tologin();
                }
            });

        }
    };
    process.init();
});
