/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'admin.redemptioncode.service', function ($scope, service) {
            angular.extend($scope, {
                adminRedemptionCodeSearch: {
                    status: 2
                }
            });
            $scope.applyStartTime = null;
            $scope.applyEndTime = null;
            $scope.activateStartTime = null;
            $scope.activateEndTime = null;
            $scope.pageSize = 5;
            $scope.currentPageNo = 1;
            $scope.totalResultsCount = 1;
            $scope.pageIndex = 0;

            service.findRedemptionCodeAdminMangeStatics().$promise.then(function (data) {
                $scope.redemptionCodeAdminMangeStaticsDto = data.data;
            });

            /*分页获取激活码*/
            function findCodes(pageNo, pageSize, data) {

                service.findAdminRedemptionCode({pageNo: pageNo,
                    pageSize: pageSize,
                    frontJSONData: JSON.stringify(data)}).$promise.then(function (data) {
                        $scope.redemptionCodes = data.data;
                        $scope.totalResultsCount = data.totalPageCount;
                        $scope.currentPageNo = data.currentPageNo;
                        $("#page").wijpager({
                            pageIndex: data.currentPageNo - 1
                        });
                    });
            };
            //加载初始化数据
            $scope.initPageData = function () {
//                ,$scope.order
                findCodes($scope.currentPageNo, $scope.pageSize, $scope.adminRedemptionCodeSearch);
            }
            $scope.initPageData();
            $scope.pageIndexChange = function (e, data) {
                var pageIndex = data.newPageIndex + 1;
//                $('#page').find("ul > li[title='" + pageIndex + "']").removeClass('ui-state-default').addClass('ui-state-active').siblings().removeClass('ui-state-active').addClass('ui-state-default');
//                $('#page').find("ul > li[title='2']").each(function (index, element) {
//                    console.log(element);
//                    if ($(element).children().prevObject.context.title == 2) {
////                     $(element).children().prevObject.context='true';
//                        console.log($(element).children());
//                    }
//
//                });
                findCodes(pageIndex, $scope.pageSize, $scope.adminRedemptionCodeSearch);
            };
            //搜索

            $scope.search = function () {
                if ($scope.getValidateResult() && validateTime()) {
                    $scope.currentPageNo = 1;
                    findCodes($scope.currentPageNo, $scope.pageSize, $scope.adminRedemptionCodeSearch);
//                    console.log($scope.order);
                }
            }
            $scope.outData = function () {
                if ($scope.getValidateResult() && validateTime()) {
                    service.findAdminRedemptionCode({pageNo: 1,
                        pageSize: 10,
                        frontJSONData: JSON.stringify($scope.adminRedemptionCodeSearch)}).$promise.then(function (data) {
                            if (data.totalPageCount === 0) {
                                $.wpfAlert({msg: '查询结果没有数据不能导出'});
                            } else {
                                var studentUrl = '/web/admin/redemptioncode/adminRedemptionCodeStatisticsExcelOut?frontJSONData=' + JSON.stringify($scope.adminRedemptionCodeSearch);
                                $.fileDownload(studentUrl);
                            }
                        });
                }

            }
            $scope.change = function (data) {
                $scope.currentPageNo = 1;
//                $scope.applyStartTime = null;
//                $scope.applyEndTime = null;
//                $scope.activateStartTime = null;
//                $scope.activateEndTime = null;
                $scope.adminRedemptionCodeSearch.username = null;
                $scope.adminRedemptionCodeSearch.email = null;
                $scope.adminRedemptionCodeSearch.redemptionCode = null;
                $scope.adminRedemptionCodeSearch.orderNo = null;
                $scope.adminRedemptionCodeSearch.username = null;
                $scope.adminRedemptionCodeSearch.buyStartTime = null;
                $scope.adminRedemptionCodeSearch.buyEndTime = null;
                $scope.adminRedemptionCodeSearch.activationStartTime = null;
                $scope.adminRedemptionCodeSearch.activationEndTime = null;
                $scope.searchContent = true;
                $scope.one = false;
                $scope.two = true;
                $scope.adminRedemptionCodeSearch.status = data;
                findCodes($scope.currentPageNo, $scope.pageSize, $scope.adminRedemptionCodeSearch);
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

