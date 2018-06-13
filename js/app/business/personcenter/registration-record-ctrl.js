/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';

    module.exports = ['$scope', '$rootScope', 'business.personcenter.record.service',

        function ($scope, $rootScope, service) {

            $rootScope.photoPath = 'http://192.168.1.228:8080/mfs//resource/file/6bc8027e869f47f892f0fab431e46953.jpg';

            ////////////////////////////////////////////////
            /*      域变量方法，以及配置信息      */
            ////////////////////////////////////////////////
            angular.extend($scope, {
                order: {
                },
                pageNo: 1,
                showCode: false,
                showAlert: false,
                showComments: false,
                startTime: null,
                endTime: null,
                dialog: {
                    width: '',
                    title: '提示',
                    msg: ""
                },
                pageSize: 5,
                orderList: [],

                ////////查看激活码//////
                showCodeFn: function (e, orderNo) {
                    $scope.showCode = true;
                    _queryCode(orderNo);
                    e.preventDefault;
                },

                addComments: function (e, orderNo) {
                    $scope.showComments = true;
                    e.preventDefault();
                },

                cancelRegistration: function (e, msg, orderNo) {
                    $scope.showAlert = true;
                    $scope.dialog.msg = msg;
                    $scope.cancelOrderNo = orderNo;
//                    var forwardUrl = "/public/views/mall/payment.html?" + g.data.commodityId + '-' + $.trim(g.node.plus.prev().val());
                    e.preventDefault();
                },

                doCancelOrder: function (e) {
                    $scope.showAlert = false;
                    $scope.showCloseMsg = true;

                },
                closeMsg: function () {
                    console.log($scope.message);
                    if ($scope.reasonId == null || $scope.reasonId === "") {
                        $.wpfAlert({msg: '请选择关闭原因'});
                        return false;
                    }
                    _cancelOrder($scope.cancelOrderNo, $scope.reasonId);
                },
                loadMore: function () {
                    $scope.showLoading = true;
                    $scope.pageNo++;
                    // ------>>>>>>>
                    _queryPageOrder(true);
                },

                editNumber: function () {
                    $scope.showText = true;
                }
            }, true);

            //// 根据订单id查询缓存中的订单列表对应的订单信息 //////
            function getOrderByOrderNo(orderNo) {
                var i = 0,
                    iLen = $scope.orderList.length,
                    result = {};
                bp:
                    for (i; i < iLen; i++) {
                        if ($scope.orderList[i].orderNo === orderNo) {
                            result = $scope.orderList[i];
                            break bp;
                        }
                    }
                return result;
            }

            //////////监听根作用域的相片对象， 发生变化则，为上传成功.//////////
            $scope.$watch('photo', function (newValue, oldValue) {
                if (newValue) {
                    var fileName = newValue.fileName,
                        suffix = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
                    $rootScope.photoPath = newValue.url + newValue['fileId'] + suffix;
                }
            });

            ///////查寻激活码////////
            function _queryCode(orderNo) {
                var defer = service.get({
                    id: orderNo,
                    action: 'queryCode' })

                    .$promise;

                defer.then(function (data) {
                    $scope.codes = data.data;
                });
            }

            $scope.buy = function (commodityId, number) {
                var forwardUrl = "/public/views/mall/payment.html?" + commodityId + '-' + number;
                window.location.href = forwardUrl;
            }
            ///修改购买人数////
            $scope.modifyPurchaseQuantity = function (no, type) {

                angular.forEach($scope.orderList, function (item, index) {
                    console.log(item.orderNo)
                    if (item.orderNo === no) {
                        if (item.subOrders != null && item.subOrders.length > 0) {
                            if (type === '+') {
                                item.subOrders[0].purchaseQuantity++
                                var totalAmount = parseInt(item.subOrders[0].totalAmount);
                                totalAmount += parseInt(item.subOrders[0].labelPrice);
                                item.subOrders[0].totalAmount = totalAmount;
                            } else if (type === '-') {
                                if (parseInt(item.subOrders[0].purchaseQuantity) < 2) {
                                    return
                                }
                                var totalAmount = parseInt(item.subOrders[0].totalAmount);
                                totalAmount -= parseInt(item.subOrders[0].labelPrice);
                                item.subOrders[0].totalAmount = totalAmount;
                                item.subOrders[0].purchaseQuantity--
                            }

                        }
                        return
                    }
                })
            }


            ///// 取消订单 ///////
            function _cancelOrder(orderNo, reasonId) {
                var defer = service.save({
                    id: orderNo,
                    reasonId: reasonId,
                    action: 'cancelOrder' })

                    .$promise;

                defer.then(function (data) {
                    if (data.results === 'true') {
                        $.wpfAlert({msg: data.messages})
                        getOrderByOrderNo(orderNo).orderStatus = '7';
                        $scope.showCloseMsg = false;
                    } else {
                        $scope.showTipAlert = true;
                        $scope.showCloseMsg = false;
                        $scope.errorContent = data.messages;
                    }
                });
            }

            // ------>>>>>>>
            _queryPageOrder();
            findUserName();
            findCloseMsg();

            //搜索

            $scope.search = function () {
                if (validateTime()) {
                    $scope.pageNo = 1;
                    _queryPageOrder();
//                    console.log($scope.order);
                }
            }
            /**
             * 获取当前登入用户名称
             */
            function findUserName() {
                service.findUserInfo(
                    ).$promise.then(function (data) {
                        $scope.name = data.data.name;
                    });
            }

            ////////////////查询订单列表 (分页) ////////////////
            function _queryPageOrder(add) {
                var defer = service.get({
                    id: 0,
                    action: 'queryOrderPage',
                    pageNo: $scope.pageNo,
                    pageSize: $scope.pageSize,
                    frontJSONData: JSON.stringify($scope.order),
                    orderStatus: $scope.orderStatus
                })

                    .$promise;

                defer.then(function (data) {
                    if (data.totalPageCount > data.currentPageNo) {
                        $scope.loading = true
                    } else {
                        $scope.loading = false
                    }
                    $scope.pageNo = data.currentPageNo;
                    if (add) {
                        $scope.orderList = $scope.orderList.concat(data.data);

                    } else {
                        $scope.orderList = data.data;
                    }
                    $scope.showLoading = false;

                });


            }

            function findCloseMsg() {
                service.get({
                    id: 0,
                    action: 'findCloseMsg'
                }).$promise.then(function (data) {
                        $scope.messages = data.data;
                        console.log($scope.messages);
                    });
            }

            /**
             * 时间校验
             * @returns {boolean}
             */
            function validateTime() {
                var endTime = dateFormat($scope.endTime),
                    startTime = dateFormat($scope.startTime);
                if ($scope.startTime != null && $scope.startTime != ''
                    && $scope.endTime != null && $scope.endTime != '') {
                    if (startTime > endTime) {
//                        $.wpfAlert({
//                            msg: '成交开始时间不能大于成交结束时间'
//                        });
                        $scope.showTipPrompt('start_time', '成交开始时间不能大于成交结束时间!', 'false', true);
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
        }
    ]
});