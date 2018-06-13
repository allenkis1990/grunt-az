/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'admin.trainclasslessondetails.service', '$stateParams', function ($scope, service, $stateParams) {
            $scope.pageSize = 5;
            $scope.currentPageNo = 1;
            $scope.totalResultsCount = 1;
            $scope.pageIndex = 0;

            /*分页培训班学员课程*/
            function findTrainLesson(pageNo, pageSize) {

                service.findClassLessonPage({pageNo: pageNo,
                    pageSize: pageSize,
                    trainClassId: $stateParams.trainClassId,
                    userId: $stateParams.userId, lessonName: $scope.lessonName}).$promise.then(function (data) {
                        $scope.lessons = data.data;
                        $scope.totalResultsCount = data.totalPageCount;
                        $scope.currentPageNo = data.currentPageNo;
                        $("#page").wijpager({
                            pageIndex: data.currentPageNo - 1
                        });
                    });
            };
            //加载初始化数据
            $scope.initPageData = function () {
                service.findStudentStudyCondition({trainClassId: $stateParams.trainClassId,
                    userId: $stateParams.userId}).$promise.then(function (data) {
                        $scope.trainLesson = data.data;
                    });
                findTrainLesson($scope.currentPageNo, $scope.pageSize);
            }
            $scope.initPageData();
            $scope.pageIndexChange = function (e, data) {
                var pageIndex = data.newPageIndex + 1;
                findTrainLesson(pageIndex, $scope.pageSize);
            };
            //搜索

            $scope.search = function () {
                $scope.currentPageNo = 1;
                findTrainLesson($scope.currentPageNo, $scope.pageSize);
//                    console.log($scope.order);

            }
            /**
             *
             */
            $scope.backUp = function () {
                window.history.go(-1);
            }
            /**
             * 导出数据
             */
            $scope.outData = function () {
                service.findClassLessonPage({pageNo: 1,
                    pageSize: 10,
                    trainClassId: $stateParams.trainClassId,
                    userId: $stateParams.userId, lessonName: $scope.lessonName}).$promise.then(function (data) {
                        if (data.totalPageCount === 0) {
                            $.wpfAlert({msg: '查询结果没有数据不能导出'});
                        } else {
                            var studentUrl = '/web/admin/trainclass/trainClassStudentLessonStatisticsExcelOut?classId='
                                + $stateParams.trainClassId + '&userId=' + $stateParams.userId;
                            if($scope.lessonName){
                                studentUrl+= '&lessonName=' + $scope.lessonName;
                            }

                            $.fileDownload(studentUrl);
                        }
                    });
            }


            /**
             * 时间校验
             * @returns {boolean}
             */
            function validateTime() {
                console.log($scope.activateEndTime);
                var applyStartTime = dateFormat($scope.applyStartTime),
                    applyEndTime = dateFormat($scope.applyEndTime),
                    activateStartTime = dateFormat($scope.activateStartTime),
                    activateEndTime = dateFormat($scope.activateEndTime);
                if ($scope.applyStartTime != null && $scope.applyStartTime != ''
                    && $scope.applyEndTime != null && $scope.applyEndTime != '') {
                    if (applyStartTime > applyEndTime) {

                        $scope.showTipPrompt('start_time', '报名开始时间不能大于报名结束时间!', 'false', true);
                        return false;
                    }

                }
                if ($scope.activateStartTime != null && $scope.activateStartTime != ''
                    && $scope.activateEndTime != null && $scope.activateEndTime != '') {
                    if (activateStartTime > activateEndTime) {

                        $scope.showTipPrompt('start_time', '激活开始时间不能大于激活结束时间!', 'false', true);
                        return false;
                    }

                }
                if ($scope.applyStartTime != null && $scope.applyStartTime != '') {
                    $scope.adminRedemptionCodeSearch.buyStartTime = formatTime($scope.applyStartTime);
                }
                if ($scope.applyEndTime != null && $scope.applyEndTime != '') {
                    $scope.adminRedemptionCodeSearch.buyEndTime = formatTime($scope.applyEndTime);
                }
                if ($scope.activateStartTime != null && $scope.activateStartTime != '') {
                    $scope.adminRedemptionCodeSearch.activationStartTime = formatTime($scope.activateStartTime);
                }
                if ($scope.activateEndTime != null && $scope.activateEndTime != '') {
                    $scope.adminRedemptionCodeSearch.activationEndTime = formatTime($scope.activateEndTime);
                }
                return true;
            };
            //时间转换
            function dateFormat(str) {
                return new Date(str).getTime();

            };
            //获取当前时间
            function getCurrentTime(date) {
                if (date === null || date == '') {
                    dateStr = null;
                } else {
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minutes = date.getMinutes();
                    var seconde = date.getSeconds();
                    var dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconde;
                }
                return dateStr;
            };
            //转换时间
            function formatTime(date) {
                var date = new Date(date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                var seconde = date.getSeconds();
                var dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconde;
                return dateStr;
            };
        }]
});

