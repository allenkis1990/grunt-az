/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    module.exports = ['$resource', function($resource) {
        var url = '/web/business/BusinessPersonCenter/:id/:action';
        return $resource(url, {id: '@id', action: '@action'}, {
            queryPageOrder: { method: 'get', isArray: true},
            findUserInfo: {method: 'get', url : '/web/business/mysetting/userInfo/0/findUserInfo'}
        })
    }]
});