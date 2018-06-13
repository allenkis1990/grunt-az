/**
 * Created by admin on 15-1-19.
 */





define(function (require, exports, module) {
    'use strict';

    require('jquery');


    module.exports =
        ['$scope','admin.commodity.service', '$state','$stateParams' ,function ($scope, service,$state,$stateParams) {


            angular.extend($scope, {
                commodityClass: {
                },
                commodityType: {
                }
            });

            /*每页大小*/
            $scope.pageSize=5;
            /*销量范围*/
            $scope.salesVolumeStart=null;
            $scope.salesVolumeEnd=null;
            /*商品标题*/
            $scope.name=null;
            /*出售中的ID集合*/
            $scope.commodityIds=[];
            /*仓库中的商品对象集合*/
            $scope.warehouseCommodity=[];
            /*历史中的商品ID集合*/
            $scope.historyCommodityIds=[]
            /*分类ID集合*/
            $scope.classifyIds=[]

            $scope.commodityType=[];

            $scope.nodeCommodityType=[];


            /*存放修改*/
            $scope.updateCommodityType=[];



            /*分页是否渲染过数据*/
            $scope.numberOne=true;
            $scope.numberTwo=false;
            $scope.numberThree=false;
            $scope.numberFour=false;

            /*存放分类是否展开逻辑值*/
            $scope.typeMap=new Map();


            /*存放展开子分类时是否发送请求逻辑*/
            $scope.isSub=new Map();

            /*根类型排序最大顺序号*/
            $scope.maxSort=0;

            /*子分类排序最大顺序号*/
            $scope.seedMaxSort=0;

            /*搜索栏是否显示，默认为不显示*/
            $scope.seekShow=false;
            $scope.totalSeekShow=true;

            /*出售中的商品全选是否被选中*/
            $scope.checkAll=false;
            /*仓库中的商品全选是否被选中*/
            $scope.warehouseWarehouse=false;
            /*历史商品全选是否被选中*/
            $scope.historyCheckAll=false;
            /*分类全选是否被选中*/
            $scope.classifyCheckAll=false;

            /*上传图片是否显示*/
            $scope.showDialog=false;

            /*需要保存的分类*/
            $scope.saveCommodityType=({
                parentId:'',
                path:''
            });


            /*图片路径前缀*/
            $scope.imagePrefix='http://res.93jishi.com:5082/mfs/resource/file/';

            /*要显示的分类图片模型*/
            $scope.commodityTypeImageModel;




            /*获取出售中的商品*/
            $scope.findSellCommodityPage=function(){
                service.findSellCommodityPage({pageNo:1, pageSize: $scope.pageSize}).$promise.then(function(data){
                    $scope.commoditys=data.data;
                    $scope.totalResultsCount=Math.ceil(data.totalResultsCount/5);

                });
            }

            /*获取仓库中的商品*/
            $scope.findWarehouseCommodityPage=function(){
                service.findWarehouseCommodityPage({pageNo:1, pageSize: $scope.pageSize}).$promise.then(function(data){
                    $scope.warehouseCommoditys=data.data;
                    $scope.warehouseTotalResultsCount=Math.ceil(data.totalResultsCount/5);
                });
            }
            /*获取历史中的商品*/
            $scope.findPastDueCommodityPage=function(){
                service.findPastDueCommodityPage({pageNo:1,pageSize:$scope.pageSize}).$promise.then(function(data){
                    $scope.pastDueCommoditys=data.data;
                    $scope.pastDueTotalResultsCount=Math.ceil(data.totalResultsCount/5);
                })

            }

            /*查询商品分类*/
            $scope.findCommodityType=function(parentId){
                service.findCommodityType({parentId:parentId}).$promise.then(function(data){

                    if(parentId==0){
                          $scope.maxSort=data.maxSort;
                        $scope.commodityType=[];

                    }else{
                           $scope.seedMaxSort=data.maxSort;

                    }
                    angular.forEach(data.data,function(item,index){
                        if(parentId==0){
                            $scope.typeMap.put(item.id, true);
                            $scope.commodityType.push({
                                id:item.id,
                                name:item.name,
                                parentId:item.parentId,
                                createTime:item.createTime,
                                path:item.searchPath,
                                orgName:item.name,
                                imageFileId:item.imageFileId,
                                seedType:[]
                            });
                        }else{
                            angular.forEach($scope.commodityType,function(item2,index){
                                if(item2.id==item.parentId){
                                    item2.seedType.push({
                                        id:item.id,
                                        name:item.name,
                                        parentId:item.parentId,
                                        createTime:item.createTime,
                                        path:item.searchPath,
                                        imageFileId:item.imageFileId,
                                        orgName:item.name
                                    });
                                }
                            })
                        }
                    });
                })
            }
            //初始化页面选择


            //监听上传文件事件
            $scope.$watch('uploadFile', function () {
                var uploadFile = $scope.uploadFile;
                if (!uploadFile) return;
                if (uploadFile.status) {
                    $scope.commodityTypeImageModel.imageId = uploadFile.resourceId;
                    $scope.commodityTypeImageModel.imageFileId = uploadFile.fileId;
                    $scope.commodityTypeImageModel.src = uploadFile.url + uploadFile.fileId + '.jpg';
                    $scope.showTipPrompt('file', '图片上传成功', 'true', true);
                    $scope.imageDone=true;
                } else {
                    $scope.showTipPrompt('file', '图片上传失败', 'false', true);
                }
            }, true);

            /*加载商品类别节点*/
            service.findCommodityType({parentId: '0'}).$promise.then(function(data){
               $scope.nodeCommodityType=buildTree(data.data);

            })
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
            $scope.treeExpanding = function (e, data) {
                var url = '/web/admin/commodity/commodity/0/findCommodityType',
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
            }

            $scope.treeClick = function (e, data) {
                    $scope.typeShow = false;
                    $scope.commodityType.typeName = data.options.params.name;
                    $scope.commodityClass.trainTypeId = data.options.params.id;
                    $scope.commodityClass.typePath = data.options.params.typePath;

            };
            /*查询界面获取商品分类*/
            service.findCommodityType({parentId:'0'}).$promise.then(function(data){
                $scope.commodityTypeQuery = buildTree(data.data);
            });
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
            $scope.findSellCommodityPage();
            /*出售中的商品点击页数发送请求*/
            $scope.pageIndexChange = function(e, data) {
                service.findSellCommodityPage({pageNo:data.newPageIndex+1, pageSize: $scope.pageSize}).$promise.then(function(data){
                    $scope.commoditys=data.data;
                    $scope.totalResultsCount=Math.ceil(data.totalResultsCount/5);
                });
            }
            $scope.warehousePageIndexChange = function(e, data) {
                service.findWarehouseCommodityPage({pageNo:data.newPageIndex+1, pageSize: $scope.pageSize}).$promise.then(function(data){
                    $scope.warehouseCommoditys=data.data;
                    $scope.warehouseTotalResultsCount=Math.ceil(data.totalResultsCount/5);
                });
            }
            $scope.pastDuePageIndexChange = function(e, data) {
                service.findPastDueCommodityPage({pageNo:data.newPageIndex+1, pageSize: $scope.pageSize}).$promise.then(function(data){
                    $scope.pastDueCommoditys=data.data;
                    $scope.pastDueTotalResultsCount=Math.ceil(data.totalResultsCount/5);

                });
            }
            /*删除仓库中的商品*/
            $scope.deleteCommodity = function() {
                if($scope.warehouseCommodity.length<1){
                    $.wpfAlert({
                        msg:'请至少选择一个商品'
                    })
                    return
                }
                $.wpfConfirm({
                    sure:function(){
                        angular.forEach($scope.warehouseCommodity,function(item,index){
                            angular.forEach($scope.warehouseCommoditys,function(item2,index2){
                                if(item.id===item2.warehouseId){
                                    item.warehouseResidueCount=item2.warehouseResidueCount;
                                }
                            })
                        });
                        service.remove({id: 0, action: 'delete',warehouseCommodity:JSON.stringify($scope.warehouseCommodity)}).$promise.then(function() {
                            $scope.findWarehouseCommodityPage();
                        });
                        $scope.warehouseWarehouse=false;

                    },
                    msg:"确认删除？"
                })

            }
            /*删除商品分类*/
            $scope.deleteCommodityType=function(id,parentId){
                $.wpfConfirm({
                    sure: function() {
                        service.deleteCommodityType({id:id}).$promise.then(function(data){
                            if(data.results==='false'){
                                $.wpfAlert({
                                    msg:data.messages
                                })
                            }
                            if(parentId==="0"){
                                $scope.findCommodityType(parentId);
                                $scope.isSub=new Map();
                            }else{
                                $scope.initializeData(parentId)
                            }
                        })
                    },
                    msg: '确认删除？'
                })
            }
            $scope.batchDeleteCommodityType=function(){
                if($scope.classifyIds.length<1){
                    return
                }
                $.wpfConfirm({
                    sure:function(){
                        service.batchDeleteCommodityType({classifyIds:JSON.stringify($scope.classifyIds)}).$promise.then(function(data){
                            $scope.findCommodityType(0);
                            $.wpfAlert({
                                msg:data.messages
                            })
                        })
                        $scope.numberTwo=false;

                    },
                    msg:"确定要删除吗？"
                })


            }
            /*删除历史中的商品*/
            $scope.deleteHistoryCommodity=function(){
                if($scope.historyCommodityIds.length<1){
                    $.wpfAlert({
                        msg:'请至少选择一个商品'
                    })
                    return
                }
                $.wpfConfirm({
                    sure:function(){
                        service.deleteHistoryCommodity({historyCommodityIds:JSON.stringify($scope.historyCommodityIds)}).$promise.then(function(data){
                            $scope.findPastDueCommodityPage();
                            $.wpfAlert({
                                msg:data.messages
                            })
                            $scope.historyCheckAll=false;
                        })
                        $scope.numberTwo=false;

                    },
                    msg:"确定要删除吗？"
                })
            }

            /*条件查询*/
            $scope.conditionQuery=function(){
                if($scope.sailing){
                    service.findSellCommodityPage({pageNo:1, pageSize: $scope.pageSize,
                        start:$scope.salesVolumeStart,end:$scope.salesVolumeEnd,name:$scope.name,classifyId:$scope.commodityClass.trainTypeId}).$promise.then(function(data){
                            $scope.commoditys=data.data;
                            $scope.totalResultsCount=Math.ceil(data.totalResultsCount/5);
                    });
                }else if($scope.store){
                        service.findWarehouseCommodityPage({pageNo:1, pageSize: $scope.pageSize,
                            start:$scope.salesVolumeStart,end:$scope.salesVolumeEnd,name:$scope.name,classifyId:$scope.commodityClass.trainTypeId}).$promise.then(function(data){
                            $scope.warehouseCommoditys=data.data;
                            $scope.warehouseTotalResultsCount=Math.ceil(data.totalResultsCount/5);
                        });
                }else if($scope.sailed){
                    service.findPastDueCommodityPage({pageNo:1,pageSize:$scope.pageSize,
                        start:$scope.salesVolumeStart,end:$scope.salesVolumeEnd,name:$scope.name,classifyId:$scope.commodityClass.trainTypeId}).$promise.then(function(data){
                        $scope.pastDueCommoditys=data.data;
                        $scope.pastDueTotalResultsCount=Math.ceil(data.totalResultsCount/5);
                    })
                }


            }

            /*移动根分类排序顺序*/
            $scope.tabbingOrder=function(id,changeWay){
                //位置顶置
                $scope.changeId;
                if(changeWay==="1"||changeWay==="4"){
                    service.tabbingOrder({frontId:id,changeWay:changeWay}).$promise.then(function(data){
                        $scope.isSub=new Map();
                        $scope.findCommodityType("0")
                    });
                }else if(changeWay==="2"){
                    angular.forEach($scope.commodityType,function(item,index){
                        if(item.id===id){
                            $scope.changeId=$scope.commodityType[index-1].id
                        }
                    })
                    service.tabbingOrder({frontId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.isSub=new Map();
                        $scope.findCommodityType("0")
                    });
                }else if(changeWay==="3"){
                    angular.forEach($scope.commodityType,function(item,index){
                        if(item.id===id){
                            $scope.changeId=$scope.commodityType[index+1].id
                        }
                    })
                    service.tabbingOrder({frontId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.isSub=new Map();
                        $scope.findCommodityType("0")
                    });
                }
            }
            /*移动子分类排序顺序*/
            $scope.tabbingSeedOrder=function(id,changeWay,parentId){
                $scope.seed=[];
                angular.forEach($scope.commodityType,function(item,index){
                    if(item.id===parentId){
                        $scope.seed=item.seedType;
                    }
                })
                if(changeWay==="3"){
                    angular.forEach($scope.seed,function(item,index){
                        if(item.id===id){
                            $scope.changeId=$scope.seed[index+1].id
                        }
                    })
                    service.tabbingOrder({frontId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.initializeData(parentId)
                    });
                }else if(changeWay==="2"){
                    angular.forEach($scope.seed,function(item,index){
                        if(item.id===id){
                            $scope.changeId=$scope.seed[index-1].id
                        }
                    })
                    service.tabbingOrder({frontId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.initializeData(parentId)
                    });
                }
            }

            /*移动完时初始化数据*/
            $scope.initializeData=function(parentId){
                $scope.typeMap.put(parentId,false);
                $scope.isSub.put(parentId,false);
                angular.forEach($scope.commodityType,function(item,index){
                    if(item.id===parentId){
                        item.seedType=[];
                    }
                })
                $scope.findCommodityType(parentId)
                $scope.isSub.put(parentId,true);
            }

            /*当被选中时，添加商品ID到集合里*/
            $scope.addSellCommodityId=function($event,id){
                if($event.target.checked==true){
                    for(var i=0;i<$scope.commodityIds.length;i++){
                        if($scope.commodityIds[i]===id){
                            return
                        }
                    }
                    $scope.commodityIds.push(id)
                } else {
                    for(var i=0;i<$scope.commodityIds.length;i++){
                        if($scope.commodityIds[i]===id){
                            $scope.commodityIds.splice(i,1)
                            return
                        }
                    }
                }
            }

            /*当商品类型被选中时，添加商品类型ID到集合里*/
            $scope.addCommodityType=function($event,id){
                if($event.target.checked==true){
                    for(var i=0;i<$scope.classifyIds.length;i++){
                        if($scope.classifyIds[i]===id){
                            return
                        }
                    }
                    $scope.classifyIds.push(id)
                } else {
                    for(var i=0;i<$scope.classifyIds.length;i++){
                        if($scope.classifyIds[i]===id){
                            $scope.classifyIds.splice(i,1)
                            return
                        }
                    }
                }
            }

            /*当历史中的商品被选中时，添加历史中的商品ID到集合里*/
            $scope.addHistoryCommodity=function($event,id){
                if($event.target.checked==true){
                    for(var i=0;i<$scope.historyCommodityIds.length;i++){
                        if($scope.historyCommodityIds[i]===id){
                            return
                        }
                    }
                    $scope.historyCommodityIds.push(id)
                } else {
                    for(var i=0;i<$scope.historyCommodityIds.length;i++){
                        if($scope.historyCommodityIds[i]===id){
                            $scope.historyCommodityIds.splice(i,1)
                            return
                        }
                    }
                }
            }


            /*当仓库中的商品被选中时，添加商品对象到集合里*/
            $scope.addWarehouseCommodity=function($event,id, warehouseResidueCount){
                if($event.target.checked==true){
                    for(var i=0;i<$scope.warehouseCommodity.length;i++){
                        if($scope.warehouseCommodity[i].id===id){
                            return
                        }
                    }
                    $scope.warehouseCommodity.push(
                        {
                            id: id,
                            warehouseResidueCount: warehouseResidueCount
                        }
                    );
                } else {
                    for(var i=0;i<$scope.warehouseCommodity.length;i++){
                        if($scope.warehouseCommodity[i].id===id){
                            $scope.warehouseCommodity.splice(i,1)
                            return
                        }
                    }
                }
            }

            /*下架商品*/
            $scope.soldOut=function(){
                if($scope.commodityIds.length<1){
                    $.wpfAlert({
                        msg:'请至少选择一个商品'
                    })
                    return
                }
                $.wpfConfirm({
                    sure:function(){
                        service.soldOutCommodity({commodityIds:JSON.stringify($scope.commodityIds)}).$promise.then(function(data){
                            $scope.findSellCommodityPage();
                            if(data.results==='false'){
                                $.wpfAlert({
                                    msg:data.messages
                                })
                            }
                            $scope.checkAll=false;
                        })
                        $scope.numberTwo=false;

                    },
                    msg:"确定要下架吗？"
                })


            }
            /*上架商品*/
            $scope.putawayCommodity=function(){
                if($scope.warehouseCommodity.length<1){
                    $.wpfAlert({
                        msg:'请至少选择一个商品'
                    })
                    return
                }
                angular.forEach($scope.warehouseCommodity,function(item,index){
                    angular.forEach($scope.warehouseCommoditys,function(item2,index2){
                        if(item.id===item2.warehouseId){
                            item.warehouseResidueCount=item2.warehouseResidueCount;

                        }
                    })
                });
                for(var i=0;i<$scope.warehouseCommodity.length;i++){
                    if(parseInt($scope.warehouseCommodity[i].warehouseResidueCount)<1){
                        $scope.showTipPrompt('putaway'+$scope.warehouseCommodity[i].id, '库存需要大于零才能上架', 'false', true);
                        return false;
                    }
                }
                $.wpfConfirm({
                    sure:function(){

                        service.putawayCommodity({warehouseCommodity:JSON.stringify($scope.warehouseCommodity)}).$promise.then(function(data){
                            $scope.findWarehouseCommodityPage();
                            $.wpfAlert({
                                msg:data.messages
                            })
                        })
                        $scope.numberOne=false;
                        $scope.warehouseWarehouse=false;
                    },
                    msg:"确认上架吗？"
                })

            }

            /*单个商品上架方式*/
            $scope.putaway=function(residueCount,id){
                if(residueCount<1){
                    $scope.showTipPrompt('putaway'+id, '库存需要大于零才能上架', 'false', true);
                    return;
                }

            $.wpfConfirm({
                sure:function(){
                    $scope.warehouseCommodity=[]
                    $scope.warehouseCommodity.push(
                        {
                            id: id,
                            warehouseResidueCount: residueCount
                        }
                    );
                    service.putawayCommodity({warehouseCommodity:JSON.stringify($scope.warehouseCommodity)}).$promise.then(function(data){
                        $scope.findWarehouseCommodityPage();
                        $.wpfAlert({
                            msg:data.messages
                        })
                    })
                    $scope.numberOne=false;
                },
                msg:"确认上架吗？"

                })

            }


            var url = window.location.href,
                params = url.substring(url.lastIndexOf('?') + 1, url.length).replace('#', ''),
                viewType = params.split('-')[0];
            if(viewType==='1'){
                $scope.findWarehouseCommodityPage();
                $scope.numberOne=false;
                $scope.sailing=false;
                $scope.store=true;
                $scope.sailingCss='';
                $scope.storeCss='current';
            }else{
                $scope.sailing = true;
                $scope.sailingCss='current';
            }
            $scope.toggle = function(where) {
                $scope.sailing              = where === 'sailing' ? true : false;
                $scope.store                = where === 'store' ? true : false;
                $scope.sailed               = where === 'sailed' ? true : false;
                $scope.productCategories    = where === 'productCategories' ? true : false;
                if(where==='sailing'&&$scope.numberOne==false){
                    $scope.findSellCommodityPage();
                }else if(where==='store'&&$scope.numberTwo==false){
                    $scope.findWarehouseCommodityPage();
                    $scope.numberTwo=true;
                }else if(where==='sailed'&&$scope.numberThree==false){
                    $scope.findPastDueCommodityPage();
                    $scope.numberThree=true;
                }else if(where==='productCategories'&&$scope.numberFour==false){
                    $scope.findCommodityType(0);
                    $scope.numberFour=true;
                }
                $scope.storeCss=null;
                $scope.sailedCss=null;
                $scope.productCategoriesCss=null;

                if($scope.sailing){
                    $scope.sailingCss='current';
                    $scope.numberOne=true;
                }
                if($scope.store ){
                    $scope.sailingCss='';
                    $scope.storeCss='current';
                    $scope.numberTwo=true;
                }
                if($scope.sailed){
                    $scope.sailingCss='';
                    $scope.sailedCss='current';
                    $scope.numberThree=true;
                }
                if($scope.productCategories){
                    $scope.sailingCss='';
                    $scope.productCategoriesCss='current';
                    $scope.numberFour=true;
                }

                if(where==='productCategories'){
                    $scope.totalSeekShow=false;
                }else{
                    $scope.totalSeekShow=true;
                }
            };


            function _findInSubmitArray(id) {
                var resultObj = {};
                angular.forEach($scope.warehouseCommodity, function(item, index) {
                    if(item.id === id) {
                        resultObj = item;
                        return;
                    }
                });
                return resultObj;
            }

            $scope.numberKeyPress = function(id, e) {
                var value = e.target.value,
                    findedObj = _findInSubmitArray(value);

                findedObj.warehouseResidueCount = value - 0;
            };
            /*展开收起子分类*/
            $scope.unfold=true;
            $scope.subquery=function(where, id){
                if(where==='notUnfold'){
                    $scope.typeMap.put(id,false);
                    if(!$scope.isSub.get(id)){
                        $scope.findCommodityType(id);
                        $scope.isSub.put(id,true);
                    }

                }else if(where==='unfold'){
                    $scope.typeMap.put(id,true);
                }

            }


            /*关闭添加商品分类窗口*/
            $scope.closeAddWindow=function(){
                $scope.addCommodityTypeWindow=false;
                $scope.saveCommodityType.name="";
            }

            /*添加商品分类*/
//            $scope.id=1;
            $scope.addClassify=function(name){
                $scope.addCommodityTypeWindow=true;
                $scope.saveCommodityType.parentId="0";
                $scope.saveCommodityType.path="0";
//                $scope.commodityType.push({
//                    id:$scope.id++,
//                    name:name,
//                    parentId:0,
//                    sort:++$scope.maxSort,
//                    path:0,
//                    seedType:[]
//                });
            }
            /*添加子商品分类*/
//            $scope.seedId=1;
            $scope.addSubClassiFication=function(parentId,id,name){
                $scope.addCommodityTypeWindow=true;
                $scope.saveCommodityType.parentId=parentId;
                $scope.saveCommodityType.path="1";
//                angular.forEach($scope.commodityType,function(item,index){
//                    if(parentId==item.id){
//                        item.seedType.push({
//                            id:id,
//                            parentId:parentId,
//                            path:1,
//                            name:name,
//                            sort:++$scope.seedMaxSort
//                        })
//                    }
//                })
            }

            $scope.goToDetail=function(id){

                location.href='/public/views/mall/commodity-detail.html?'+id;

            }
            /*异步校验*/
            $scope.checkValidateName=function(){
                service.checkValidateName({frontJSONData:JSON.stringify($scope.saveCommodityType)}).$promise.then(function(data){
                    if(data.results==='false'){
                        $scope.showTipPrompt('name', data.messages, 'false', true);
                    }
                })
            }
//            /*商品类别名称框鼠标离开事件*/
//            $scope.mouseleave=function(parentId,name,id){
//                if( $scope.batchCheckValidateName(parentId,name)){
//                    console.log("............")
//                    $scope.showTipPrompt('updateName', "类型名称重复", 'false', true);
//                }
//
//            }


//            /*商品分类批量修改时本地校验名称是否重复*/
//            $scope.batchCheckValidateName=function(parentId,name,id){
//                if(parentId==='0'){
//                    angular.forEach($scope.commodityType,function(item,index){
//                        if(name===item.name){
//                            return true;
//                        }
//                    });
//                    return false;
//                }else{
//                    angular.forEach($scope.commodityType,function(item,index){
//                        if(item.id===parentId){
//
//                            var temp=[];
//                            angular.forEach(item.seedType,function(item2,index){
//                                if(!(temp.indexOf(name)>-1&&id==item2.id)){
//                                    $scope.showTipPrompt('updateName', "类型名称重复", 'false', true);
//                                    return;
//                                }
//                                temp.push(item2.name);
//                            });
//                            ;
//                        }
//                    });
//                    return false;
//                }
//            }

            /*修改商品分类*/
            $scope.updateType=function(){
                        /*需要修改的商品分类*/
                        if(!$scope.typeIsNullValidate($scope.commodityType)){
                            return false;
                        }
                        angular.forEach($scope.commodityType,function(item,index){
                            if(item.orgName !== item.name){
                                $scope.updateCommodityType.push({id:item.id,name:item.name,parentId:item.parentId})
                            }
                            angular.forEach(item.seedType,function(itemUpdate,index){
                                if(itemUpdate.orgName!==itemUpdate.name){
                                    $scope.updateCommodityType.push({id:itemUpdate.id,name:itemUpdate.name,parentId:itemUpdate.parentId})
                                }
                            });
                        });
                        service.updateCommodityType({updateCommodityType:JSON.stringify($scope.updateCommodityType)})
                            .$promise.then(function(data){
                                $scope.updateCommodityType =[];
                                $scope.isSub=new Map();
                                if(data.results === 'false'){
                                    $scope.showTipPrompt('update_type', data.messages, 'false', true);
                                    return false;
                                }else{
                                    $scope.commodityType=[];
                                    $scope.closeAddWindow();
                                    $scope.findCommodityType('0');
                                }


                        });
            }

            /*保存分类*/
            $scope.save=function(){
                if($scope.saveCommodityType.name==null||$scope.saveCommodityType.name===''){
                    $scope.showTipPrompt('name', '分类名称不可为空！', 'false', true);
                    return false;
                }
                service.checkValidateName({frontJSONData:JSON.stringify($scope.saveCommodityType)}).$promise.then(function(data){
                    if(data.results==='false'){
                        $scope.showTipPrompt('name', data.messages, 'false', true);
                        return ;
                    } else {
                        service.saveCommodityType({frontJSONData:JSON.stringify($scope.saveCommodityType)}).$promise.then(function(data){
                            if(data.results==='true'){
                                $scope.findCommodityType(0);
                            }
                            if($scope.parentId!="0"){
                                $scope.isSub=new Map();
                            }
                            if(data.results==='false'){
                                $.wpfAlert(
                                    {
                                        msg:data.messages
                                    }
                                )
                            }
                            $scope.saveCommodityType.name="";
                            $scope.addCommodityTypeWindow=false;
                        });

                    }

                })
                /*---------------不使用批量保存------------------*/

//                $.wpfConfirm({
//                    sure:function(){
//                        /*需要创建的商品分类*/
//                        $scope.createCommodityType=[];
//                        /*需要修改的商品分类*/
//                        $scope.updateCommodityType=[];
//
//                        angular.forEach($scope.commodityType,function(item,index){
//                            if(item.orgName==null){
//                                $scope.createCommodityType.push({
//                                    id:null,
//                                    name:item.name,
//                                    parentId:item.parentId,
//                                    sort:item.sort,
//                                    path:item.path,
//                                    seedType:item.seedType
//                                })
//                            }
//                            else if(item.orgName!=item.name){
//                                $scope.updateCommodityType.push({
//                                    id:item.id,
//                                    name:item.name,
//                                    parentId:item.parentId,
//                                    searchPath:item.searchPath
//                                })
//                                angular.forEach(item.seedType,function(item2,index2){
//                                    if(item2.orgName==null&&item2.parentId!=null){
//                                        $scope.createCommodityType.push({
//                                            id:null,
//                                            name:item2.name,
//                                            parentId:item2.parentId,
//                                            path:item2.path,
//                                            sort:item2.sort
//                                        })
//                                    }
//                                    else if(item2.orgName!=item2.name){
//                                        $scope.updateCommodityType.push({
//                                            id:item2.id,
//                                            name:item2.name,
//                                            parentId:item2.parentId
//                                        })
//                                    }
//                                })
//                            }else if(item.orgName===item.name){
//                                angular.forEach(item.seedType,function(item2,index2){
//                                    if(item2.orgName==null&&item2.parentId!=null){
//                                        $scope.createCommodityType.push({
//                                            id:null,
//                                            name:item2.name,
//                                            parentId:item2.parentId,
//                                            path:item2.path,
//                                            sort:item2.sort
//                                        })
//                                    }
//                                    else if(item2.orgName!=item2.name){
//                                        $scope.updateCommodityType.push({
//                                            id:item2.id,
//                                            name:item2.name,
//                                            parentId:item2.parentId
//                                        })
//                                    }
//                                })
//                            }
//
//                        })
//                        service.saveCommodityType({createCommodityType:JSON.stringify($scope.createCommodityType),
//                            updateCommodityType:JSON.stringify($scope.updateCommodityType)}).$promise.then(function(data){
//                            $scope.commodityType=[];
//                            $scope.isSub=new Map();
//                            $scope.findCommodityType(0);
//                            $.wpfAlert(
//                                {
//                                    msg:data.messages
//                                }
//                            )
//                        });
//                    },
//                    msg:'确认保存？'
//                })

            }
            /*设置搜索栏是否显示*/
            $scope.setSeekShow=function(){
                if($scope.seekShow){
                    $scope.seekShow=false;
                }else{
                    $scope.seekShow=true;
                }
            }

            /*当全选按钮被选中时*/
            $scope.checkAllButton=function(type){
                if(type==='1'){
                    if($scope.checkAll){
                        $scope.commodityIds=[]
                        $scope.checkAll=false;
                    }else{
                        $scope.commodityIds=[]
                        angular.forEach($scope.commoditys,function(item,index){
                            $scope.commodityIds.push(item.id)
                        })
                        $scope.checkAll=true;
                    }
                }else if(type==='2'){
                    if($scope.warehouseWarehouse){
                        $scope.warehouseCommodity=[]
                        $scope.warehouseCommodityIds=[]
                        $scope.warehouseWarehouse=false;
                    }else{
                        $scope.warehouseCommodity=[]
                        angular.forEach($scope.warehouseCommoditys,function(item,index){
                            $scope.warehouseCommodity.push({
                                id:item.warehouseId,
                                warehouseResidueCount:item.warehouseResidueCount

                            })
                        })
                        $scope.warehouseWarehouse=true;
                    }
                }else if(type==='3'){
                    if($scope.historyCheckAll){
                        $scope.historyCommodityIds=[]
                        $scope.historyCheckAll=false;
                    }else{
                        $scope.historyCommodityIds=[]
                        angular.forEach($scope.pastDueCommoditys,function(item,index){
                            $scope.historyCommodityIds.push(item.pastDueId)
                        })
                        $scope.historyCheckAll=true;
                    }
                }else if(type==='4'){
                    if($scope.classifyCheckAll){
                        $scope.classifyIds=[]
                        $scope.classifyCheckAll=false;
                    }else{
                        $scope.classifyIds=[]
                        angular.forEach($scope.commodityType,function(item,index){
                            $scope.classifyIds.push(item.id)
                        })
                        $scope.classifyCheckAll=true;
                    }
                }

            }


            //为空校验
            $scope.typeIsNullValidate = function (commodityType){
                var falg = 0;
                for(var i = 0; i<commodityType.length;i++){
                    if(commodityType[i].name=== undefined || commodityType[i].name === ''){
                        $scope.showTipPrompt('id_'+commodityType[i].id, '培训班分类名称不为空', 'false', true);
                        falg++
                    }
                    var seedType = commodityType[i].seedType;
                    for(var j =0;j<seedType.length;j++){
                        if(seedType[j].name=== undefined || seedType[j].name === ''){
                            $scope.showTipPrompt('id_'+seedType[j].id, '培训班分类名称不为空', 'false', true);
                            falg++
                        }
                    }

                }
                if(falg ===0){
                    return true;
                }else{
                    return false;
                }
            };
            /*控制上传图片口是显示*/
            $scope.isDialogShow=function(id){
                if(id!=null){
                    service.findCommodityTypeImageModel({id:id}).$promise.then(function(data){
                        $scope.commodityTypeImageModel=data.data;
                    })
                }else{
                    $scope.commodityTypeImageModel=null;
                }
                if($scope.showDialog==false){
                    $scope.showDialog=true;
                }else{
                    $scope.showDialog=false;
                }

            }
            /*保存分类图片*/
            $scope.imageDone=false;
            $scope.saveImage=function(){
                if($scope.imageDone==false){
                    $scope.showTipPrompt('done', '图片还未上传完成', 'false', false);
                    return;
                }
                service.saveCommodityTypeImage({frontJSONData:JSON.stringify($scope.commodityTypeImageModel)}).$promise.then(function(data){
                    $scope.showDialog=false;
                    $scope.findCommodityType(0);
                    $scope.isSub=new Map();
                    $scope.imageDone=false;
                })
            }

            $scope.addImgShow=false;
            $scope.isImgShow=function(e, id,testShow){
                var pageX = e.pageX;
                var pageY = e.pageY;
                angular.extend($scope.photoContainerStyle, {
                    left: pageX + 'px',
                    top: pageY + 'px'
                });
                if(id!=null){
                    service.findCommodityTypeImageModel({id:id}).$promise.then(function(data){
                        $scope.commodityTypeImageModel=data.data;
                    })
                }else{
                    $scope.commodityTypeImageModel=null;
                }

                if(testShow==='1'){
                    $scope.addImgShow=false;
                }else if(testShow==='2'){
                    $scope.addImgShow=true;
                }

//                if($scope.imgShow==false){
//                    $scope.imgShow=true;
//                }else if($scope.imgShow==true){
//                    $scope.imgShow=false;
//                }

            }

            /*删除图片*/
            $scope.deleteImg=function(id){
                                $.wpfConfirm({
                                    sure:function(){
                                        service.deleteImg({id:id}).$promise.then(function(data){
                                            $scope.findCommodityType(0);
                                            $scope.isSub=new Map();
                                        })
                                    },
                                    msg:"确定要删除吗"
                                })
            }

            $scope.photoContainerStyle = {
                zIndex: 1000
            };





            /*封装map*/
             function Map() {
                var struct = function(key, value) {
                    this.key = key;
                    this.value = value;
                }
                var put = function(key, value){
                    for (var i = 0; i < this.arr.length; i++) {
                        if ( this.arr[i].key === key ) {
                            this.arr[i].value = value;
                            return;
                        }
                    }
                    this.arr[this.arr.length] = new struct(key, value);
                }

                var get = function(key) {
                    for (var i = 0; i < this.arr.length; i++) {
                        if ( this.arr[i].key === key ) {
                            return this.arr[i].value;
                        }
                    }
                    return null;
                }

                var remove = function(key) {
                    var v;
                    for (var i = 0; i < this.arr.length; i++) {
                        v = this.arr.pop();
                        if ( v.key === key ) {
                            continue;
                        }
                        this.arr.unshift(v);
                    }
                }

                var size = function() {
                    return this.arr.length;
                }

                var isEmpty = function() {
                    return this.arr.length <= 0;
                }
                this.arr = new Array();
                this.get = get;
                this.put = put;
                this.remove = remove;
                this.size = size;
                this.isEmpty = isEmpty;
            }

        }];

});