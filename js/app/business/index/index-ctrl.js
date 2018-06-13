/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';

    module.exports = ['$scope','business.index.service', function($scope,service) {
        service.findUserInfo().$promise.then( function(data){
           $scope.name=data.name;
            $scope.image=data.image;
        });
    }]
});