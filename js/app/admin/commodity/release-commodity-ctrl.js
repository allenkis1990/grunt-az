/**
 * author :ljl
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
        'use strict';

        module.exports =
            ['$scope', 'admin.releasecommodity.service', '$stateParams', '$timeout' , function ($scope, service, $stateParams, $timeout) {
                angular.extend($scope, {
                        commodity: {
                            validity: null,
                            riseTime: null
                        }
                    }
                )
                ;


                $scope.putAwyStatus = 1;
                $scope.showEndTime=true;
//            $stateParams.id
                service.findTrainClass({trainClassId: $stateParams.id}).$promise.then(function (data) {
                    $scope.trianClassEndTime = data.data.endTime;
                    $scope.commodity.resourceId = data.data.id;
                    $scope.commodity.putawayCount = data.data.putawayCount;
                    $scope.url=data.data.url;
//             //默认图片地址
                    $scope.commodity.src = data.data.url + data.data.fileId + '.jpg';
                    //默认图片资源ID
                    $scope.commodity.imageId = data.data.resourceId;
                    //默认图片资源FileID
                    $scope.commodity.imageFileId = data.data.fileId;
                });

                //树的点击操作
                $scope.treeClick = function (e, data) {
                    if (data.options.params.parentId === '0') {
                        return false;
                    } else {
                        $scope.typeShow = false;
                        $scope.commodity.typeName = data.options.params.name;
                        $scope.commodity.classifyId = data.options.params.id;

                    }
                };
                //获去商品分类
                service.findCommodityTypes({parentId: '0'}).$promise.then(function (data) {
                    $scope.commodityTypeList = buildTree(data.data);
                });
                //树的展开操作
                $scope.treeExpanding = function (e, data) {
                    var url = '/web/admin/commodity/release/0/findCommodityTypes',
                        current = data.node,
                        parentId = current.options.params.id,
                    // 获取当前节点的子节点个数，作为异步获取数据的阀门
                        children = current.options.nodes.length;
                    if (children === 0) {
                        $.get(url, {parentId: parentId}, function (data) {
                            if (data.data.length > 0) {
                                $.each(data.data, function (index, item) {
                                    var appendNode = {
                                        hasChildren: true,
                                        text: item.name,
                                        params: item
                                    };
                                    current.add(appendNode);
                                });
                            } else {
                                current.options.params.hasAjax = true;
                                current.options.params.isParent = 'false';
                            }

                        }, 'json');
                    }
                };
                //设置销售时间为马上
                $scope.immediately = function () {
                    $scope.putAwyStatus = 1;
                    $scope.showTime = false;
                    $scope.showEndTime=true;
                };
                /**
                 * 设定时间
                 */
                $scope.setTime = function () {
                    $scope.putAwyStatus = 2;
                    $scope.showTime = true;
                    $scope.showEndTime=true;
                };
                /**
                 * 放入仓库
                 */
                $scope.putStorage = function () {
                    $scope.putAwyStatus = 3;
                    $scope.showTime = false;
                    $scope.showEndTime=false;
                    $scope.commodity.riseTime = null;
                };
                //监听上传文件事件
                $scope.$watch('uploadFile', function () {
                    var uploadFile = $scope.uploadFile;
                    if (!uploadFile) return;
                    if (uploadFile.status) {
                        $scope.commodity.imageId = uploadFile.resourceId;
                        $scope.commodity.imageFileId = uploadFile.fileId;
                        $scope.commodity.src = $scope.url + uploadFile.fileId + '.jpg';
//                    console.log(uploadFile);
                        $scope.showTipPrompt('file', '图片上传成功', 'true', true);
//                    angular.forEach(uploadFile.convertResult, function (item, index) {
//                        console.log(item);
//                        if (item.param.height === '')
//                            console.log();
////                            if(item.param){
////                            }
//                    });
                    } else {
                        $scope.showTipPrompt('file', '图片上传失败', 'false', true);
                    }
                }, true);

                $scope.save = function () {
                    if ($scope.getValidateResult() && validateTime()) {
                        if ($scope.describe == null || $scope.describe == '') {

                            $scope.showTipPrompt('intro', '请填写培训班销售描述，不可为空！', 'false', true);
                            return false;
                        }
                        if ($scope.commodity.putawayCount < 1) {
                            $scope.showTipPrompt('number', '开班人数不能小于1!', 'false', true);
                            return false;
                        }
                        if ($scope.putAwyStatus == 1) {
                            $scope.commodity.riseTime = getCurrentTime();
                        }
                        $scope.commodity.type = 1;
                        service.putAway({frontJSONData: JSON.stringify($scope.commodity), intro: $scope.describe, putAwyStatus: $scope.putAwyStatus}).$promise.then(function (data) {
                            if (data.results === 'true') {
//                                $.wpfAlert({
//                                    msg: data.messages + '5秒后为您自动跳转页面'
//                                });
                                $scope.showTipPrompt('put', data.messages + '5秒后为您自动跳转页面', 'true', true);
                                $timeout(function () {
                                    window.location.href = '/public/views/admin/#/commodity?'+data.code;
                                }, 5000);
                            } else {
                                $scope.showTipPrompt('put', data.messages, 'false', true);

                            }

                        });
                    }
                }
                //时间转换
                function dateFormat(str) {

                    return new Date(str + ':00').getTime();

                };
                /**
                 * 时间校验
                 * @returns {boolean}
                 */
                function validateTime() {
                    var status = $scope.putAwyStatus,
                        endTime = dateFormat($scope.commodity.validity),
                        nowTime = new Date().getTime(),
                        startTime = dateFormat($scope.commodity.riseTime),
                        trainEndTime = dateFormat($scope.trianClassEndTime);
                    if (status != 3) {
                        if ($scope.commodity.validity == null || $scope.commodity.validity == '') {
                            $scope.showTipPrompt('end_time', '培训班结束时间不能为空!', 'false', true);
                            return false;
                        } else {
                            if (nowTime > endTime) {
                                $scope.showTipPrompt('end_time', '商品销售结束时间不能小于当前时间', 'false', true);

                                return false;
                            }
                            if (trainEndTime < endTime) {

                                $scope.showTipPrompt('end_time', '销售结束时间不可比培训班结束时间还迟,培训班结束时间:'+$scope.trianClassEndTime, 'false', true);

                                return false;
                            }
                            $scope.commodity.validity = formatTime($scope.commodity.validity);
                        }
                    }
                    if (status == 2) {
                        if ($scope.commodity.riseTime == null || $scope.commodity.riseTime == '') {
                            $scope.showTipPrompt('start_time', '商品销售开始时间不能小于当前时间', 'false', true);
                            return false;
                        } else {
                            if (nowTime > startTime) {
                                $scope.showTipPrompt('start_time', '商品销售开始时间不能小于当前时间', 'false', true);
                                return false;
                            }
                            if (startTime > trainEndTime) {
                                $scope.showTipPrompt('start_time', '销售开始时间不能比培训班结束时间还迟,培训班结束时间:'+$scope.trianClassEndTime, 'false', true);
                                return false;
                            }
                            if (startTime > endTime) {
                                $scope.showTipPrompt('start_time', '销售开始时间不能大于销售结束时间', 'false', true);
                                return false;
                            }
                            $scope.commodity.riseTime = formatTime($scope.commodity.riseTime);
                        }
                    }
                    return true;
                };

                //构造商品分类
                function buildTree(data) {
                    var nodes = [];
                    for (var i = 0; i < data.length; i++) {
                        var node = {
                            text: data[i].name,
                            expanded: false,
                            hasChildren: true,
                            params: data[i]
                        }
                        nodes.push(node);
                    }
                    return nodes
                };
                //获取当前时间
                function getCurrentTime() {
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minutes = date.getMinutes();
                    var seconde = date.getSeconds();
                    var dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconde;
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
            }

            ]
        ;

    }
)
;

