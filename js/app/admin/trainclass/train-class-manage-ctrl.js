///**
// * author :dww
// * create on 15-1-15
// *
// **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'admin.trainclass.manage.service','$state', '$stateParams','$http',function ($scope, service,$state, $stateParams,$http) {
            $scope.trainBasicData = [];
            $scope.userList = [];
            $scope.learnRecordList = [];
            $scope.trainClassId = $stateParams.id;
            service.findTrainClassBasicData({trainClassId:$stateParams.id}).$promise.then(function (data) {
                $scope.trainBasicData = data.trainBasicData;
            });
            service.loadManageData({trainClassId:$stateParams.id}).$promise.then(function (data) {

                $scope.userList = data.userData;
                $scope.lessonList = data.lessonData;
                $scope.learnRecordList =data.learnRecordData;
            });

        }];


});