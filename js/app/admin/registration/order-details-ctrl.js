/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'admin.registration.orderdetails.service', '$stateParams', function ($scope, service, $stateParams) {

            $scope.initData = function () {
                service.findOrderDetails({orderNo: $stateParams.id}).$promise.then(function (data) {
                    if (data.data.payType) {
                        $scope.show = true;
                    }
                    $scope.order = data.data;
                });
            }
            //加载关闭原因
            service.findCloseOrderReasonList().$promise.then(function (data) {
                $scope.messages = data.data;
            });
            $scope.initData();
            //显示取消订单取消订单
            $scope.cancelOrder = function (orderNo) {
                $scope.orderNo = orderNo;
                $scope.content = null;
                $scope.showDialog = true;
            };

            /**
             * 跳转商品详情页
             * @param commodityId
             */
            $scope.toCommoddity = function (commodityId) {
                window.location.href = '/public/views/mall/commodity-detail.html?' + commodityId;
            };
            //提醒学员
            $scope.remind = function (orderNo, userId) {
                service.remind({orderNo: orderNo, userId: userId}).$promise.then(function (data) {
                    if (data.results === 'true') {
                        $.wpfAlert({msg: data.messages});
                    } else {
                        $.wpfAlert({msg: data.messages});
                        $scope.initData();
                    }
                });
            };


            $scope.closeOrder = function () {
                if($scope.reasonId==null||$scope.reasonId===''){
                    $.wpfAlert({msg:'请选择关闭原因'});
                    return false;
                }
                service.closeOrder({orderNo: $scope.orderNo, reasonId:$scope.reasonId}).$promise.then(function (data) {
                    if (data.results === 'true') {
                        $.wpfAlert({msg: data.messages});
                        $scope.showDialog = false;
                        $scope.initData();
//                        $scope.order.orderStatus = 7;
//                        $scope.order.cancelInfo = $scope.msg.name;
                    } else {
                        $.wpfAlert({msg: data.messages});
                    }
                });
            }
        }]
});

