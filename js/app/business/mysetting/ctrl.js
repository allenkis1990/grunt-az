/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'business.mysetting.service', '$interval', function ($scope, service, $interval) {
            angular.extend($scope, {
                user: {
                }
            });
            service.findUserInfo().$promise.then(function (data) {
                $scope.user.email = data.data.email;
                if (data.data.activated=='true') {
                    $scope.showActivation = false;
                } else {
                    $scope.showActivation = true;
                }
                $scope.user.userId = data.data.id;
                $scope.user.phoneNumber = data.data.phoneNumber;
                $scope.user.nickname = data.data.name;
                if (data.data.sex === '2') {
                    $scope.woman = true;
                    $scope.user.sex = '2';
                } else {
                    $scope.man = true;
                    $scope.user.sex = '1';
                }
//
            });
            $scope.saveUserInfo = function () {
                if ($scope.getValidateResult()) {
                    service.updateUserInfo({frontJSONData:JSON.stringify($scope.user)})
                        .$promise.then(function (data) {
                            $scope.showTipPrompt('update_info', data.messages, data.results);

                        });
                }

            };
            $scope.setMan = function () {
                $scope.user.sex = '1';
            };
            $scope.setWo = function () {
                $scope.user.sex = '2';
            };
            $scope.activation = function () {
//                $scope.showActivation = false;
//                $scope.show = true;
//                $scope.time = 10;
//                $scope.timerIntervalId = $interval(timer, 1000).$$intervalId;
                service.activation().$promise.then(function (data) {
                    if(data.code=='200'){
                        $scope.showActivation = false;
                        $scope.show = true;
                        $scope.time = 120;
                        $scope.timerIntervalId = $interval(timer, 1000).$$intervalId;
                        $scope.showTipPrompt('activation', data.message, 'true');
                    }else{
                        $scope.showTipPrompt('activation', data.message, 'false');
                    }

                });

            };
            function timer() {
                $scope.time -= 1;
                if ($scope.time == 0) {
                    $scope.showActivation = true;
                    $scope.show = false;
                    window.clearInterval($scope.timerIntervalId);
                }
            };
        }];

});
     
     