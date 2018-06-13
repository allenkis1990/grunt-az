/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    require('wpfDialog');
    module.exports = ['$scope', 'business.personcenter.code.service',
        function ($scope, service) {
            /*分页获取激活码*/
            function findCodes(pageNo, pageSize, data, add) {

                service.findUserRedemptionCode({pageNo: pageNo,
                    pageSize: pageSize,
                    status: data}).$promise.then(function (data) {
                        $scope.showLoading = false;
                        if (data.totalPageCount > data.currentPageNo) {
                            $scope.loading = true
                        } else {
                            $scope.loading = false
                        }
                        if (add) {
                            $scope.redemptionCodes = $scope.redemptionCodes.concat(data.data);
                        } else {
                            $scope.redemptionCodes = data.data;
                        }

                        $scope.totalResultsCount = data.totalPageCount;
                        $scope.currentPageNo = data.currentPageNo;

                    });
            };
            /**
             * 用户激活码统计
             */
            function findUserCodeStatics() {
                service.findRedemptionCodeUserMangeStatics().$promise.then(function (data) {
                    $scope.redemptionCodeUserMangeStaticsDto = data.data;
                });
            }

            init();
            /**
             * 初始化数据
             */
            function init() {
                $scope.pageSize = 8;
                $scope.currentPageNo = 1;
                $scope.totalResultsCount = 1;
                findUserCodeStatics();
                findCodes($scope.currentPageNo, $scope.pageSize);
            }

            /**
             * 兑换激活码
             * @param code
             */
            $scope.exchangeCode = function (code) {
                $.wpfConfirm({
                    sure: function () {
                        service.exchangeCode({
                            code: code
                        }).$promise.then(function (data) {
                                if (data.results === 'true') {
                                    $.wpfAlert({msg: data.messages});
                                    findUserCodeStatics();
                                    $scope.currentPageNo = 1;
                                    findCodes($scope.currentPageNo, $scope.pageSize, $scope.status);
                                } else {
                                    $.wpfAlert({msg: data.messages});
                                }
                            });
                    },
                    msg: '确定兑换激活码吗?'
                });
            }
            $scope.change = function (data) {
                if (data > 0) {
                    $scope.show = false;
                }
                $scope.currentPageNo = 1;
                $scope.status = data;
                findCodes($scope.currentPageNo, $scope.pageSize, $scope.status);
            }
            /**
             * 加载下页数据
             */
            $scope.loadMore = function () {
                $scope.showLoading = true;
                $scope.currentPageNo += 1;
                findCodes($scope.currentPageNo, $scope.pageSize, $scope.status, true);
            }
        }];
});
     
     