/**
 * Created by admin on 15-1-19.
 */





define(function (require, exports, module) {
    'use strict';

    require('jquery');

    module.exports =
        ['$scope','admin.commodity.modify.service', '$stateParams', '$state', function ($scope, service, $stateParams,$state) {
            angular.extend($scope, {
                commodity: {

                },
                //是否初始化完成
                isInitialize:false
            });

            service.toModifyCommodity({id:$stateParams.id}).$promise.then(function(data){
                $scope.commodity=data.data;
                if(data.data.state==='2'){
                    $scope.way='1';
                }else if(data.data.state==='1'&&data.data.riseTime!=''){
                    $scope.way='2';
                    $scope.showTime=true;
                }else if(data.data.state==='1'){
                    $scope.commodity.riseTime=new Date();
                    $scope.commodity.validity=new Date();
                    $scope.way='3';
                }
                $scope.isInitialize=true;
            })

            //默认图片地址

//            //默认图片资源ID
//            $scope.commodity.imageId = '912f68b35ebc4fe2bdc2e43a3e74762f';
//            //默认图片资源FileID
//            $scope.commodity.imageFileId = '05ef689ef5d0443fb50a8e6cca1214e1';
//            $scope.commodity.riseTime = getCurrentTime();
            //获去商品分类
            service.findCommodityTypes({parentId: '0'}).$promise.then(function (data) {
                $scope.commodityTypeList = buildTree(data.data);
            });
//            service.findTrainClass({trainClassId: $scope.commodity.resourceId}).$promise.then(function (data) {
//                $scope.trianClassEndTime = data.data.endTime;
//                $scope.commodity.resourceId = data.data.id;
//                $scope.commodity.putawayCount = data.data.putawayCount;
//
//            });

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
                $scope.showTime = false;
                $scope.commodity.riseTime = getCurrentTime();
            };
            $scope.showTime=false;
            //销售时间改变
            $scope.salesTimeChange = function (e, data) {
                if($scope.showTime==false||$scope.isInitialize==false){
                    return;
                }
                var st = dateFormat(data.text),
                    endTime = dateFormat($scope.commodity.trianClassEndTime),
                    temp=data.text,
                    nowTime = new Date().getTime(),
                    commodityEndTime = dateFormat($scope.commodity.validity);
                if (nowTime > st) {
                    $scope.showTipPrompt('start_time', '商品销售开始时间不能小于当前时间', 'false', true);
                    return false;
                }
                if (st > endTime) {
                    $scope.showTipPrompt('start_time', '销售开始时间不能比培训班结束时间还迟', 'false', true);
                    return false;
                }
                if (st > commodityEndTime) {
                    $scope.showTipPrompt('start_time', '销售开始时间不能大于销售结束时间', 'false', true);
                    return false;
                }
            };
            //结束时间改变
            $scope.endTimeChange = function (e, data) {
                if($scope.isInitialize==false){
                    return;
                }
                var endTime = dateFormat($scope.commodity.trianClassEndTime),
                    nowTime = new Date().getTime(),
                    startTime = dateFormat($scope.commodity.riseTime),
                    commodityTime = dateFormat(data.text);
                if (nowTime > commodityTime) {
                    $scope.showTipPrompt('end_time', '商品销售结束时间不能小于当前时间', 'false', true);
                    return false;
                }
                if (commodityTime > endTime) {
                    $scope.showTipPrompt('end_time', '销售结束时间不可比培训班结束时间还迟', 'false', true);
                    return false;
                }
                if (commodityTime < startTime) {
                    $scope.showTipPrompt('end_time', '销售结束时间不能小于销售开始时间!', 'false', true);
                    return false;
                }
            };

            $scope.setTime = function () {
                $scope.showTime = true;
            };
            $scope.putStorage = function () {
                $scope.showTime = false;
            };
            //监听上传文件事件
            $scope.$watch('uploadFile', function () {
                var uploadFile = $scope.uploadFile;
                if (!uploadFile) return;
                if (uploadFile.status) {
                    $scope.commodity.imageId = uploadFile.resourceId;
                    $scope.commodity.imageFileId = uploadFile.fileId;
                    $scope.commodity.src = uploadFile.url + uploadFile.fileId + '.jpg';
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

//            /*开班人数校验*/
//            $scope.checkCount=function(){
//                if(parseInt($scope.commodity.putawayCount) <parseInt($scope.commodity.sellCount)){
//                    $scope.showTipPrompt('number', '计划开班人数不能小于商品已销售数量', 'false', true);
//                }
//            }


            $scope.save = function () {
                if ($scope.getValidateResult) {
                    if($scope.way==='3'){
                        $scope.commodity.riseTime=null;
                        $scope.commodity.validity=null;
                    }else{
                        $scope.commodity.riseTime=formatTime($scope.commodity.riseTime)
                        $scope.commodity.validity=formatTime($scope.commodity.validity)
                        if ($scope.commodity.validity == null || $scope.commodity.validity == '') {
                            $scope.showTipPrompt('end_time', '培训班结束时间不能为空!', 'false', true);
                            return false;
                        }
                    }
                    if ($scope.commodity.describe == null || $scope.commodity.describe == '') {
                        $scope.showTipPrompt('underLine_des', '请填写培训班销售描述，不可为空！', 'false', true);
                        return false;
                    }
                    if ($scope.commodity.putawayCount < 1) {
                        $scope.showTipPrompt('number', '开班人数不能小于1!', 'false', true);
                        return false;
                    }
                    $scope.commodity.putawayCount=parseInt($scope.commodity.sellCount)+parseInt($scope.commodity.residueCount);
//                    if($scope.commodity.putawayCount<$scope.commodity.sellCount){
//                        $scope.showTipPrompt('number', '计划开班人数不能小于商品已销售数量', 'false', true);
//                        return false;
//                    }
                    $scope.commodity.type = 1;
                    service.modify({id:$stateParams.id,frontJSONData:JSON.stringify($scope.commodity),way:$scope.way}).$promise.then(function(data){
                        if(data.results==='true'){
                            window.location.href='/public/views/admin/#/commodity?'+data.code;
                        }else{
                            $scope.showTipPrompt('save', data.messages, 'false', true);
                        }
                    });
                }
            }
            //时间转换
            function dateFormat(str) {

                return new Date(str + ':00').getTime();

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

    }];

});