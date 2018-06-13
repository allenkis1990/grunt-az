/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'admin.registration.service', function ($scope, service) {
            angular.extend($scope, {
                order: {
                }
            });
            $scope.startTime = null;
            $scope.endTime = null;
            $scope.pageSize = 5;
            $scope.currentPageNo = 1;
            $scope.totalResultsCount = 1;
            $scope.pageIndex = 0;

            /*获取订单分页*/
            function findOrders(pageNo, pageSize, data) {

                service.findOrders({pageNo: pageNo,
                    pageSize: pageSize,
                    frontJSONData: JSON.stringify(data)}).$promise.then(function (data) {
                        $scope.orders = data.data;
                        $scope.totalResultsCount = data.totalPageCount;
                        $scope.currentPageNo = data.currentPageNo;
                        $("#page").wijpager({
                            pageIndex: data.currentPageNo - 1
                        });
                    });
            };
            //加载关闭原因
            service.findCloseOrderReasonList().$promise.then(function (data) {
                $scope.messages = data.data;
            });
            //加载初始化数据
            $scope.initPageData = function () {

//                ,$scope.order
                findOrders($scope.currentPageNo, $scope.pageSize);
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
                findOrders(pageIndex, $scope.pageSize, $scope.order);
            };
            //搜索

            $scope.search = function () {
                if (validateTime('start_time')) {
                    $scope.currentPageNo = 1;
                    findOrders($scope.currentPageNo, $scope.pageSize, $scope.order);
//                    console.log($scope.order);
                }
            }

            //结束时间
            $scope.salesEndTimeChange = function (e, data) {
                var st = dateFormat(data.text),
                    startTime = $scope.order.completeFromTime;
                if (startTime == null || startTime === '') {
                    $scope.order.completeToTime = data.text;
                } else {
                    var orderTime = dateFormat(startTime);
                    if (st < orderTime) {
                        $.wpfAlert({
                            msg: '成交结束时间不能小于成交开始时间'
                        })
                        return false;
                    } else {
                        $scope.order.completeToTime = data.text;
                    }
                }
            };
//            数据导出
            $scope.outData = function () {
                if (validateTime('out_data')) {
                    service.findOrders({pageNo: 1,
                        pageSize: 10,
                        frontJSONData: JSON.stringify($scope.order)}).$promise.then(function (data) {
                            if (data.totalPageCount === 0) {
                                $.wpfAlert({msg: '导出结果没有数据不能导出'});
                            } else {
                                var studentUrl = '/web/admin/order/adminOrderStatisticsExcelOutAction?frontJSONData=' + JSON.stringify($scope.order);
                                $.fileDownload(studentUrl);
                            }
                        });
                }

            }
            //发送激活码
            $scope.sendCode = function (data) {
                service.sendCode({orderNo: data}).$promise.then(function (data) {
                    if (data.results === 'true') {
                        $.wpfAlert({msg: data.messages});
                        findOrders($scope.currentPageNo, $scope.pageSize);
                    } else {
                        $.wpfAlert({msg: data.messages});
                    }
                });
            };
            //查看激活码
            $scope.lookCode = function (data) {
                service.findCode({subOrderNo: data}).$promise.then(function (data) {
                    $scope.showDialog1 = true;
                    $scope.codes = data.data;
                });
            };
            //显示取消订单取消订单
            $scope.cancelOrder = function (orderNo) {
                $scope.orderNo = orderNo;
                $scope.content = null;
                $scope.showDialog = true;
            };
            //控制是否显示关闭订单
            $scope.isShow = function () {
                if ($scope.order.hideCloseOrder) {
                    $scope.order.hideCloseOrder = false;
                } else {
                    $scope.order.hideCloseOrder = true;
                }
            };
            $scope.closeOrder = function () {
                if ($scope.reasonId == null || $scope.reasonId === '') {
                    $.wpfAlert({msg: '请选择关闭原因'});
                    return false;
                }
                service.closeOrder({orderNo: $scope.orderNo, reasonId: $scope.reasonId}).$promise.then(function (data) {
                    if (data.results === 'true') {
                        $.wpfAlert({msg: data.messages});
                        $scope.showDialog = false;
                        findOrders($scope.currentPageNo, $scope.pageSize);
                    } else {
                        $.wpfAlert({msg: data.messages});
                    }
                });
            }
            /**
             * 跳转商品详情页
             * @param commodityId
             */
            $scope.toCommoddity = function (commodityId) {
                console.log(commodityId);
                window.location.href = '/public/views/mall/commodity-detail.html?' + commodityId;
            }

            $scope.upPage = function () {
                findOrders($scope.currentPageNo - 1, $scope.pageSize, $scope.order);
            };
            $scope.nextPage = function () {
                findOrders($scope.currentPageNo + 1, $scope.pageSize, $scope.order);
            };

            $scope.useInfoList = {};
            //鼠标离开
            $scope.leave = function (e, data) {
                $(e.target).next().hide();
            };
            //鼠标进入名字事件
            $scope.access = function (e, userId) {
                $(e.target).closest('tr').siblings().find('a[data-action="tip"]').next().hide();
                var value = $scope.useInfoList[userId];
                if (value) {
                    $scope.userInfo = value;
                } else {
                    service.findUserInfo({userId: userId}).$promise.then(function (data) {
                        $scope.useInfoList[userId] = data.data;
                        $scope.userInfo = data.data;
                    });
                }
                $(e.target).next().show();
            };
            /**
             * 时间校验
             * @returns {boolean}
             */
            function validateTime(type) {
                var endTime = dateFormat($scope.endTime),
                    startTime = dateFormat($scope.startTime);
                if ($scope.startTime != null && $scope.startTime != ''
                    && $scope.endTime != null && $scope.endTime != '') {
                    if (startTime > endTime) {
//                        $.wpfAlert({
//                            msg: '成交开始时间不能大于成交结束时间'
//                        });
                        $scope.showTipPrompt(type, '成交开始时间不能大于成交结束时间!', 'false', true);
                        return false;
                    }

                }
                if ($scope.startTime != null && $scope.startTime != '') {
                    $scope.order.completeFromTime = formatTime($scope.startTime);
                }
                if ($scope.endTime != null && $scope.endTime != '') {
                    $scope.order.completeToTime = formatTime($scope.endTime);
                }

                return true;
            };
            //时间转换
            function dateFormat(str) {
                return new Date(str).getTime();

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

