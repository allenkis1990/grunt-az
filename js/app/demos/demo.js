/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-8
 * Time: 下午3:15
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    'use strict';
    require('jquery');
    require('validateEngine');

    $.validationEngineLanguage.allRules.ajaxDemo = {
        // remote json service location
        "url": "/web/portal/account/0/validateAccount",
        // error
        "alertText": "* 此名称已被其他人使用",

        "alertTextOk": "* 此名称可以使用",
        // speaks by itself
        "alertTextLoad": "* 正在确认名称是否有其他人使用，请稍等。"
    }
    $('#myForm').validationEngine();

          window.setTimeout(function() {
              console.log($('#myForm').validationEngine('validate'));
          }, 2000);

});
