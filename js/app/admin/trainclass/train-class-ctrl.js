/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope','admin.trainclass.service', function($scope, service) {
            /*每页大小*/

            $scope.pageSize=5;
            /*培训时间范围*/
            $scope.startTime=null;
            $scope.endTime=null;
            /*培训班标题*/
            $scope.trainName=null;

            /*分页是否渲染过数据*/
            $scope.numberOne=true;
            $scope.numberTwo=false;
            $scope.numberThree=false;
            $scope.numberFour=false;

            $scope.trainTypes=[];

            /*根类型排序最大顺序号*/
            $scope.maxSort=0;

            /*子分类排序最大顺序号*/
            $scope.seedMaxSort=0;
            /*存放分类是否展开逻辑值*/
            $scope.typeMap=new Map();
            /*存放展开子分类时是否发送请求逻辑*/
            $scope.isSub=new Map();
            $scope.maxSort=0;
            $scope.minSort=0;

            /*存在创建的分类*/
            $scope.createTrainType={

            };
            /*存放修改*/
            $scope.updateTrainType=[];

            /*是否全选*/
            $scope.isAllSelect=false;
            $scope.fatherSelect=false;
            $scope.childrenSelect=false;
            /*延期操作*/
            $scope.delayTime = null;
            $scope.trainClassId = null;

            /*获取培训班分页*/
            $scope.findTrainClassList=function(){
                if(typeof $scope.startTime === 'object' ){
                    $scope.startTime = getCurrentTime($scope.startTime);

                };
                if(typeof $scope.endTime === 'object' ){
                    $scope.endTime = getCurrentTime($scope.endTime);

                };
                var resultTime = validateTime($scope.startTime,$scope.endTime);
                if(!resultTime){
                    $scope.showTipPrompt('time_warn', '填写的开班时间大于结束时间，有误！', 'false',true);
                    return false;
                }
                service.loadTrainClass({pageNo:1,
                    pageSize: $scope.pageSize,
                    trainClassName:$scope.trainClassName,
                    status:$scope.status,
                    startTime:$scope.startTime,
                    endTime:$scope.endTime}).$promise.then(function(data){
                        $scope.trainClassList=data.data;
                        $scope.totalResultsCount=Math.ceil(data.totalResultsCount/5);
                    });
//                if(!($scope.startTime instanceof Date)){
//                    if($scope.startTime!=null && $scope.startTime!==''){
//                        var startTimeStr = $scope.startTime.replace(/-/g,"/");
//                        $scope.startTime = new Date(startTimeStr);
//                    }
//                };
//                if(!($scope.endTime instanceof Date)){
//                    if($scope.endTime!=null && $scope.endTime!==''){
//                        var  endTimeStr = $scope.endTime.replace(/-/g,"/");
//                        $scope.endTime = new Date(endTimeStr);
//                    }
//                }

            };
            $scope.deleteTrainClass = function(id){
                $.wpfConfirm({
                    sure: function() {
                        service.deleteTrainClassById({trainClassId:id}).$promise.then(function(data){
                            $.wpfAlert({
                                msg: data.messages
                            });
                            $scope.pageIndex = 1;
                            $scope.findTrainClassList();
                        });
                    },
                    msg: '是否删除?'
                });
            }
            $scope.findTrainClassList();
            $scope.pageIndexChange = function (e, data) {
                service.loadTrainClass({pageNo:data.newPageIndex+1,
                    pageSize: $scope.pageSize,

                    status:$scope.status}).$promise.then(function(data){
                        $scope.trainClassList=data.data;
                        $scope.totalResultsCount=Math.ceil(data.totalResultsCount/5);
                    });
            };
            $scope.changeStatus = function(status){
                $scope.status=status;
                $scope.trainClassName=null;
                $scope.startTime = null;
                $scope.endTime = null;
                $scope.findTrainClassList();
            };

            $scope.searchTrainClass = function(){
                $scope.findTrainClassList();
            };
            $scope.showTrainType = function (parentId,isSub){
                if(isSub){
                    $scope.findTrainTypes(parentId);
                }else{
                    if($scope.numberFour===false){
                        $scope.findTrainTypes(parentId);
                        $scope.numberFour=true;
                    }
                }
            };
            /*查询分类*/
            $scope.findTrainTypes = function(parentId) {
                service.findTrainTypes({parentId:parentId}).$promise.then(function(data){
                    if(parentId==='0'){
                        $scope.maxSort=data.maxSort;
                        $scope.trainTypes=[];
                    }else{
                        $scope.seedMaxSort=data.maxSort;
                    }
                    angular.forEach(data.data,function(item,index){
                        if(parentId==='0'){
                            $scope.typeMap.put(item.id, true);
                            $scope.trainTypes.push({
                                id:item.id,
                                name:item.name,
                                orgName:item.name,
                                parentId:item.parentId,
                                createTime:item.createTime,
                                seedType:[]
                            });
                        }else{
                            angular.forEach($scope.trainTypes,function(item2,index){
                                if(item2.id===item.parentId){
                                    item2.seedType.push($.extend(item, {orgName:item.name}));
                                }
                            })
                        };
                    });
                })
            }
            /*展开收起子分类*/
            $scope.unfold=true;
            $scope.subquery=function(where, id){
                if(where==='notUnfold'){
                    $scope.typeMap.put(id,false);
                    if(!$scope.isSub.get(id)){
                        $scope.showTrainType(id,true);
                        $scope.isSub.put(id,true);
                    }

                }else if(where==='unfold'){
                    $scope.typeMap.put(id,true);
                }

            }
            /*删除培训班分类*/
            $scope.deleteTrainType=function(trainTypeId,parentId){
                service.deleteTrainType({trainTypeId:trainTypeId}).$promise.then(function(data){
                    $scope.trainTypes=[];
                    $scope.isSub=new Map();
                    $scope.findTrainTypes('0');
                    $.wpfAlert({
                        msg: data.messages
                    });
                })
            }
            /*移动根分类排序顺序*/
            $scope.tabbingOrder=function(id,changeWay){
                //位置顶置
                $scope.changeId;
                if(changeWay==="1"||changeWay==="4"){
                    service.tabbingOrder({currentId:id,changeWay:changeWay}).$promise.then(function(data){
                        $scope.findTrainTypes('0');
                    });
                }else if(changeWay==="2"){
                    angular.forEach($scope.trainTypes,function(item,index){
                        if(item.id===id){
                            $scope.changeId=$scope.trainTypes[index-1].id
                        }
                    })
                    service.tabbingOrder({currentId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.findTrainTypes('0');
                    });
                }else if(changeWay==="3"){
                    angular.forEach($scope.trainTypes,function(item,index){
                        if(item.id===id){
                            $scope.changeId=$scope.trainTypes[index+1].id
                        }
                    });
                    service.tabbingOrder({currentId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.findTrainTypes('0');
                    });
                }
            }
            /*移动子分类排序顺序*/
            $scope.tabbingSeedOrder=function(id,changeWay,parentId){
                $scope.seed=[];
                angular.forEach($scope.trainTypes,function(item,index){
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
                    service.tabbingOrder({currentId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.initializeData(parentId)
                    });
                }else if(changeWay==="2"){
                    angular.forEach($scope.seed,function(item,index){
                        if(item.id===id){
                            $scope.changeId=$scope.seed[index-1].id
                        }
                    })
                    service.tabbingOrder({currentId:id,changeWay:changeWay,changeId:$scope.changeId}).$promise.then(function(data){
                        $scope.initializeData(parentId)
                    });
                }
            };
            /*移动完时初始化数据*/
            $scope.initializeData=function(parentId){
                $scope.typeMap.put(parentId,false);
                $scope.isSub.put(parentId,false);
                angular.forEach($scope.trainTypes,function(item,index){
                    if(item.id===parentId){
                        item.seedType=[];
                    }
                })
                $scope.findTrainTypes(parentId)
                $scope.isSub.put(parentId,true);
            };

            /*添加子培训班分类*/
            $scope.addTrainClassType=function(parentId){
                $scope.trainClassTypeWindow=true;
                $scope.createTrainType.parentId=parentId;
            };
            /*关闭添加商品分类窗口*/
            $scope.closeAddWindow=function(){
                $scope.trainClassTypeWindow=false;
                $scope.createTrainType.typeName="";
            }
            $scope.save = function(){
                if($scope.createTrainType.typeName==null||$scope.createTrainType.typeName===''){
                    $scope.showTipPrompt('type_name', '分类名称不可为空！', 'false', true);
                    return false;
                };
                service.saveTrainType({jsonData:JSON.stringify($scope.createTrainType)}).$promise.then(function(data){
                    $scope.isSub=new Map();
                    if(data.results === 'false'){
                        $scope.showTipPrompt('type_name', data.messages, 'false', true);
                        return false;
                    }else{
                        $scope.trainTypes=[];
                        $scope.closeAddWindow();
                        $scope.findTrainTypes('0');
                    }

                });
            };
            /*保存培训班分类*/
            $scope.updateTrainClassType=function(){
                if(!$scope.typeIsNullValidate($scope.trainTypes)){
                    return false;
                }
                angular.forEach($scope.trainTypes,function(item,index){
                    if(item.orgName !== item.name){
                        $scope.updateTrainType.push({id:item.id,typeName:item.name,parentId:item.parentId})
                    }
                    angular.forEach(item.seedType,function(itemUpdate,index){
                        if(itemUpdate.orgName!==itemUpdate.name){
                            $scope.updateTrainType.push({id:itemUpdate.id,typeName:itemUpdate.name,parentId:itemUpdate.parentId})
                        }
                    });
                });
                if($scope.updateTrainType.length>0){
                    service.updateTrainType({jsonData:JSON.stringify($scope.updateTrainType)}).$promise.then(function(data){
                        $scope.updateTrainType =[];
                        $scope.isSub=new Map();
                        if(data.results === 'false'){
                            $scope.showTipPrompt('update_type', data.messages, 'false', true);
                            return false;
                        }else{
                            $scope.trainTypes=[];
                            $scope.closeAddWindow();
                            $scope.findTrainTypes('0');
                        }
                    });
                }
            };

            $scope.textChange = function(item){
                //判断当前值是否发生改变验证
                if((item.name === undefined || item.name === '')){
                    // console.log('id_'+item.id);
                    $scope.showTipPrompt('id_'+item.id, '培训班分类名称不为空', 'false',true);
                }
            }
            //为空校验
            $scope.typeIsNullValidate = function (trainTypeList){
                var falg = 0;
                for(var i = 0; i<trainTypeList.length;i++){
                    if(trainTypeList[i].name=== undefined || trainTypeList[i].name === ''){
                        $scope.showTipPrompt('id_'+trainTypeList[i].id, '培训班分类名称不为空', 'false', true);
                        falg++
                    }
                    var seedType = trainTypeList[i].seedType;
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
            //培训班延期操作
            $scope.trainClassDelay = function (trainClass) {
                $scope.trainClassDelayWindow = true;
                $scope.trainClassEndTime =trainClass.endTime;
                $scope.trainClassId = trainClass.id;
            };
            $scope.closeDelayWindow = function (){
                $scope.delayTime = null;
                $scope.trainClassDelayWindow = false;
            };
            $scope.confirmDelay = function (id) {
                console.log($scope.delayTime);
                console.log($scope.trainClassEndTime);
                console.log(id);
                //验证延期时间
                if($scope.delayTime === null){
                    $scope.showTipPrompt('delay_time', '延期时间不可为空', 'false', true);
                    return false;
                }
                if(typeof $scope.delayTime === 'object' ){
                    $scope.delayTime = getCurrentTime($scope.delayTime);

                }
                if(!validateTime($scope.trainClassEndTime,$scope.delayTime)){
                    $scope.showTipPrompt('delay_time', '延期时间不能小于培训结束时间', 'false', true);
                    return false;
                }
                service.delayTrainClass({trainClassId:id,delayTime:$scope.delayTime}).$promise.then(function (data) {
                    if(data.results === 'false'){
                        $scope.delayTime = null;
                    }else{
                        $scope.closeDelayWindow();
                        $scope.findTrainClassList();
                        $("#page_obj").wijpager({
                            pageIndex: 0
                        });
                    }
                })
            }

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
            };
            //获取当前时间
            function getCurrentTime(date) {
                if(date === null || date == ''){
                    dateStr = null;
                }else{
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
            function validateTime(startTime, endTime) {
               if(startTime!==null && startTime !=='' && endTime!==null && endTime!==''){
                   var startTimeStr = startTime.replace(/-/g,"/"),
                        sTime = new Date(startTimeStr);
                   var endTimeStr = endTime.replace(/-/g,"/"),
                        eTime = new Date(endTimeStr);
                       if(sTime > eTime) {
                           return false;
                       }else{
                           return true;
                       }
                }else{
                           return true;
                     }
            }
        }];
});

     