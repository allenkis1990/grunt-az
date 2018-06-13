/**
 * Created with IntelliJ IDEA.
 * User: drj
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    var url='/web/business/mytrainclass/myTrainClassDetail/';
    module.exports = [ '$resource', function( $resource) {
        var mytrainclassdetail= $resource(url+':id/:action' ,{id: '@id', action: '@action'}, {
            findTrainClassDetail: {method: 'get', url : url+'0/findTrainClassDetail'},
            findReviewPage: {method: 'get', url : url+'0/findReviewPage'},
            submitReview: {method: 'get', url : url+'0/submitReview'},
            inquireUserReview: {method: 'get', url : url+'0/inquireUserReview'},
            findLessonPage: {method: 'get', url : url+'0/findLessonPage'},
            findRecentLearnUserPage: {method: 'get', url : url+'0/findRecentLearnUserPage'}
        });
        return mytrainclassdetail;
    }]
});