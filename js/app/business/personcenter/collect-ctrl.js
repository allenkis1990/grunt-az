/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    require('wpfDialog');
    module.exports = ['$scope', 'business.personcenter.mycollect.service',

        function ($scope, service) {

            angular.extend($scope, {
                pageNo: 1,
                pageSize: 5
            }, true);

            function findMyCollect(add) {
                service.get({
                    id: 0,
                    action: 'queryCollects',
                    pageNo: $scope.pageNo,
                    pageSize: $scope.pageSize
                }).$promise.then(function (data) {
                        $scope.showLoading = false;
                        if (data.totalPageCount > data.currentPageNo) {
                            $scope.loading = true
                        } else {
                            $scope.loading = false
                        }
                        if (add) {
                            $scope.commoditys = $scope.commoditys.concat(data.data);
                        } else {
                            $scope.commoditys = data.data;
                        }
                    });
            }

            ////// 初始化加载收藏量 //////
            init();

            function init() {

                findMyCollect();
            }


            ////// 取消收藏 //////
            $scope.cancel = function (id) {
                $.wpfConfirm({
                    sure: function () {
                        service.cancelCollect({
                            commodityCollectId: id
                        }).$promise.then(function (data) {
                                if (data.results === 'true') {
                                    console.log(data.messages);
                                    $.wpfAlert({msg: data.messages});
                                    $scope.pageNo = 1;
                                    ////// 取消收藏成功后刷新整个model
                                    init();
                                }else{
                                    $.wpfAlert({msg: data.messages});
                                }
                            });
                    },
                    msg: '确定要取消收藏这个培训班吗?'
                });
            };
            $scope.loadMore = function () {
                $scope.showLoading = true;
                $scope.pageNo++;
                // ------>>>>>>>
                findMyCollect(true);
            };
        }];
});
     
     