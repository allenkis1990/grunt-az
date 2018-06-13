/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'admin.lesson.service', '$stateParams', function ($scope, service, $stateParams) {
            //加载初始化数据
            function initPageData() {
                service.findLessonDetails($stateParams.id).$promise.then(function (data) {
                    $scope.lesson = data.data;
                });
            }

            initPageData();
            /**
             *
             */
            $scope.backUp = function () {
                window.history.go(-1);
            }
            $scope.prev = function () {
                var index = $scope.lesson.index - 1;
                service.findLessonDetails({trainClassId: $stateParams.id,
                    index: index}).$promise.then(function (data) {
                        $scope.lesson = data.data;
                    });
            }
            $scope.next = function () {
                var index = $scope.lesson.index + 1;
                service.findLessonDetails({trainClassId: $stateParams.id,
                    index: index}).$promise.then(function (data) {
                        $scope.lesson = data.data;
                    });
            }
        }]
});

