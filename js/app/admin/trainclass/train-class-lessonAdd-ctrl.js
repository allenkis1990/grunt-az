///**
// * author :dww
// * create on 15-1-15
// *
// **/
define(function (require, exports, module) {
    'use strict';
    require('validateEngine');
    module.exports =
        ['$scope', 'admin.trainclass.lessonAdd.service','$state', '$stateParams','$http',function ($scope, service,$state, $stateParams,$http) {
            $scope.selectLessonIds = [];
            $scope.lessonTypeList = [];
            $scope.lessonList = [];
            $scope.trainLessonName = null;
            $scope.trainLessonList = [];
            $scope.colLessonName=null;
            $scope.typeId=null;
            $scope.subTypeId = null;
            $scope.resourceType = 1;//1:平台类型 0:自建类型
            /*存放分类是否展开逻辑值*/
            $scope.typeMap = new Map();
            //加载分类
            $scope.loadLessonType = function () {
                service.loadLessonType().$promise.then(function (data) {
                    angular.forEach(data.data,function (item,index) {
                        if(item.parentId === '0'){
                            $scope.lessonTypeList.push({
                                id:item.id,
                                name:item.name,
                                parentId:item.parentId,
                                subTypeList:[]
                            });
                        }
                    });
                    angular.forEach(data.data,function (item,index) {
                        if(item.parentId !== '0'){
                            angular.forEach($scope.lessonTypeList,function (item2,index) {
                                if(item.parentId === item2.id){
                                    item2.subTypeList.push({
                                        id:item.id,
                                        name:item.name,
                                        parentId:item.parentId
                                    });
                                }
                            })
                        }
                    });

                });
            };
            //加载课程
            $scope.loadLesson  = function () {
                service.loadLesson({frontJSONData:JSON.stringify({resourceType:$scope.resourceType,
                    colLessonName:$scope.colLessonName,
                    typeId:$scope.subTypeId,
                    lessonIds:$scope.selectLessonIds})}).$promise.then(function (data) {
                    $scope.lessonList = data.data;
                });
            };
            //加载培训班课程
            $scope.loadTrainClassLesson = function () {
                service.loadTrainClassLesson({trainClassId:$stateParams.id}).$promise.then(function(data){
                    angular.forEach(data.data,function (item,index) {
                        buildRightTrainLesson(item,1);
                        $scope.selectLessonIds.push(item.lessonId);
                    });
                    //然后获取没被选中的课程
                    $scope.loadLesson();
                })
            }
            //展开课程分类
            $scope.expandChildNodes = function(typeId){
                $scope.typeId = typeId
                if(!$scope.typeMap.get(typeId)){
                    $scope.typeMap.put(typeId,true);
                }else{
                    $scope.typeMap.put(typeId,false);
                }
            };
            //查询课程
            $scope.findLesson = function (subTypeId,resourceType) {
                if(subTypeId !== null){
                    $scope.subTypeId = subTypeId;
                }
                if(resourceType!== null){
                    $scope.resourceType = resourceType;
                    $scope.subTypeId = null;
                    $scope.typeMap = new Map();
                }
                $scope.loadLesson();
            };
            //查询培训班课程
            $scope.findSelectLesson = function () {
                $scope.trainLessonList = [];
                service.loadTrainClassLesson({trainClassId:$stateParams.id,lessonName: $scope.trainLessonName}).$promise.then(function (data) {
                        angular.forEach(data.data,function (item,index){
                            buildRightTrainLesson(item,1);
                        })
                    });
            };
            //添加课程
            $scope.addLesson = function (lesson, index) {
                buildRightTrainLesson(lesson,2);
                $scope.lessonList.splice(index, 1);
                var postion = $.inArray(lesson.lessonId, $scope.selectLessonIds);
                if (postion === -1) {
                    $scope.selectLessonIds.push(lesson.lessonId);
                }
            };
            //去除课程
            $scope.deleteLesson = function(typeId,lesson,index){
                for(var i =0;i< $scope.trainLessonList.length;i++){
                    var lessonTypeId = $scope.trainLessonList[i].typeId;
                    if(typeId===lessonTypeId){
                        $scope.trainLessonList[i].lessons.splice(index, 1);
                        var postion = $.inArray(lesson.lessonId, $scope.selectLessonIds);
                        $scope.selectLessonIds.splice(postion, 1);
                        $scope.lessonList.push(lesson);
                        if($scope.trainLessonList[i].lessons.length===0){
                            $scope.trainLessonList.splice(i, 1);
                        }
                    }
                }
            };
            //全选课程
            $scope.selectAllLesson = function () {
                console.log($scope.lessonList.length);
                for(var i =0;i<$scope.lessonList.length;i++){
                    buildRightTrainLesson($scope.lessonList[i],2);
                    var postion = $.inArray($scope.lessonList[i].lessonId, $scope.selectLessonIds);
                    if(postion === -1){
                        $scope.selectLessonIds.push($scope.lessonList[i].lessonId);
                    }
                }
                $scope.lessonList=[];

            };
            //清空课程
            $scope.clearAllLesson = function() {
                angular.forEach($scope.trainLessonList,function (item,index) {
                    angular.forEach(item.lessons,function (item2,index) {
                        $scope.lessonList.push({lessonId:item2.lessonId,
                            lessonName:item2.lessonName,
                            typeId:item2.typeId,
                            typeName:item2.typeName});
                    });
                });
                $scope.trainLessonList = [];
                $scope.selectLessonIds = [];
            };

            //保存培训班课程
            $scope.saveTrainClassLesson = function () {
                //验证是否添加课程
                if($scope.selectLessonIds.length === 0){
                    $scope.showTipPrompt('save_id', '培训班课程不可为空，请选择课程', 'false',true);
                    return false;
                }
                service.saveTrainClassLesson({frontJSONData:JSON.stringify({trainClassId:$stateParams.id,
                    lessonIds:$scope.selectLessonIds})}).$promise.then(function (data) {
                        if(data.results === 'true'){
                            $state.go('trainclass');
                        }else{
                            $scope.showTipPrompt('save_id', '保存失败', 'false',true);
                        }
                })
            };
            $scope.load = function () {
                $scope.loadLessonType();
                $scope.loadTrainClassLesson();
            };

            function init(){
                $scope.load();
            };
            //构造培训班课程数据
            function buildRightTrainLesson(lessonData,type) {
                var ornlength = $scope.trainLessonList.length;
                if (ornlength > 0) {
                    for (var i = 0; i < ornlength; i++) {
                        var typeId = $scope.trainLessonList[i].typeId;
                        if (lessonData.typeId === typeId) {
                            //查询构造时 type=1
                            if(type === 1){
                                $scope.trainLessonList[i].lessons.push({typeId:lessonData.typeId,typeName:lessonData.typeName,lessonId: lessonData.lessonId, lessonName: lessonData.lessonName});
                            }else{
                                var postion = $.inArray(lessonData.lessonId, $scope.selectLessonIds);
                                if(postion===-1){
                                    $scope.trainLessonList[i].lessons.push({typeId:lessonData.typeId,typeName:lessonData.typeName,lessonId: lessonData.lessonId, lessonName: lessonData.lessonName});
                                }
                            }
                            break;
                        }
                        if (i === ornlength-1) {
                            $scope.trainLessonList.push({typeId: lessonData.typeId,
                                typeName: lessonData.typeName,
                                lessons: [
                                    {typeId:lessonData.typeId,typeName:lessonData.typeName,lessonId: lessonData.lessonId, lessonName: lessonData.lessonName}
                                ]});
                        }
                    }
                } else {
                    $scope.trainLessonList.push({typeId: lessonData.typeId,
                        typeName: lessonData.typeName,
                        lessons: [
                            {typeId:lessonData.typeId,typeName:lessonData.typeName,lessonId: lessonData.lessonId, lessonName: lessonData.lessonName}
                        ]});
                }
            };
            function Map() {
                var struct = function (key, value) {
                    this.key = key;
                    this.value = value;
                }
                var put = function (key, value) {
                    for (var i = 0; i < this.arr.length; i++) {
                        if (this.arr[i].key === key) {
                            this.arr[i].value = value;
                            return;
                        }
                    }
                    this.arr[this.arr.length] = new struct(key, value);
                }

                var get = function (key) {
                    for (var i = 0; i < this.arr.length; i++) {
                        if (this.arr[i].key === key) {
                            return this.arr[i].value;
                        }
                    }
                    return null;
                }

                var remove = function (key) {
                    var v;
                    for (var i = 0; i < this.arr.length; i++) {
                        v = this.arr.pop();
                        if (v.key === key) {
                            continue;
                        }
                        this.arr.unshift(v);
                    }
                }

                var size = function () {
                    return this.arr.length;
                }

                var isEmpty = function () {
                    return this.arr.length <= 0;
                }
                this.arr = new Array();
                this.get = get;
                this.put = put;
                this.remove = remove;
                this.size = size;
                this.isEmpty = isEmpty;
            };

            init();
        }];


});