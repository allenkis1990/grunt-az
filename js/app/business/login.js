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
        mainOperation: $('#main_operation'),
        loginButton: $('#login_button')
    };

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
        initValidationEngine: function() {
            g.node.mainOperation.validationEngine('attach', g.config);
        }
    };

    process = {
        init: function() {
            builder.initValidationEngine();
            event.listen();
        },

        getValidateResult: function() {
            return g.node.mainOperation.validationEngine('validate');
        },

        login: function() {

        }
    };

    event = {
        listen: function() {
            g.node.loginButton.click(function(e) {
                var $this = $(this);
                if (process.getValidateResult() === false) {
                    $this.css('background', 'gray').html('登陆中...');
                    window.setTimeout(function() {
                        $this.removeAttr('style').html('登陆');
                    }, 1500);
                }
            });
        }
    };

    process.init();
});
