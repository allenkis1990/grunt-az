/**
 * Created by admin on 15-1-19.
 */





define(function (require, exports, module) {
    'use strict';

    require('jquery');


    module.exports =
        ['$scope','admin.lessonresource.service', '$state', function ($scope, service,$state) {
            $scope.lessonresource={
                //课程分类
                lessonresourceType:[],
                //课程
                lessonresource:[],
                pageSize:5,
                pageNo:1,
                //课程类型
                type:0,
                //存放课程分类是否展开逻辑
                isLessonresourceType:new Map(),
                //存放课程分类样式
                lessonresourceTypeCss:new Map(),
                //查询课程，分类ID
                lessonTypeId:'',
                css:{}
            }
            var init=function(){
                //获取课程分类
                $scope.findLessonType();
                //初始自建课程列表
                $scope.findLessons($scope.lessonresource.pageNo,$scope.lessonresource.pageSize);
            }
            //获取课程分类
            $scope.findLessonType=function(){
                service.findLessonType({}).$promise.then(function(data){
                    angular.forEach(data.data,function(item){
                        if(item.parentId==='0'){
                            $scope.lessonresource.lessonresourceType.push({
                                id:item.id,
                                name:item.name,
                                parentId:item.parentId,
                                seedLessonresourceType:[]
                            });
                        }
                    });
                    angular.forEach(data.data,function(item){
                        if(item.parentId!='0'){
                            angular.forEach($scope.lessonresource.lessonresourceType,function(item2){
                                if(item2.id==item.parentId){
                                    item2.seedLessonresourceType.push({
                                        id:item.id,
                                        name:item.name,
                                        parentId:item.parentId
                                    });
                                }
                            })
                        }
                    });
                })
            }
            //获取课程分页
            $scope. findLessons=function(pageNo,pageSize){
                service.findLessons({pageNo:pageNo,pageSize:pageSize,type:$scope.lessonresource.type,lessonTypeId:$scope.lessonresource.lessonTypeId}).$promise.then(function(data){
                    $scope.lessonresource.lessonresource=data.data;
                    $scope.lessonresource.totalSize=data.totalResultsCount
                    $scope.lessonresource.totalResultsCount=Math.ceil(data.totalResultsCount/5);
                })
            }

            //删除课程
            $scope.deleteLesson=function(lessonId){
                $.wpfConfirm({
                    sure:function(){
                        service.deleteLesson({lessonId:lessonId}).$promise.then(function(data){
                            if(data.results==='false'){
                                $scope.showTipPrompt('delete', data.messages, 'false', true);
                                return;
                            }
                            $scope. findLessons($scope.lessonresource.pageNo,$scope.lessonresource.pageSize)
                        })
                    },
                    msg:'确定要删除吗?'
                });
            }
            //翻页
            $scope.pastDuePageIndexChange=function(e,data){
                $scope.findLessons(data.newPageIndex+1,$scope.lessonresource.pageSize);
            }
            //切换课程列表类型
            $scope.lessonresource.css={a:'current'};
            $scope.switch=function(type){
                if(type==='0'){
                    $scope.lessonresource.css={a:'current'};
                }else if(type==='1'){
                    $scope.lessonresource.css={b:'current'};
                }else if(type==='2'){
                    $scope.lessonresource.css={c:'current'};
                }else if(type==='3'){
                    $scope.lessonresource.css={d:'current'};
                }
                $scope.lessonresource.type=type
                $scope.findLessons($scope.lessonresource.pageNo,$scope.lessonresource.pageSize);
            }
            //条件查询
            $scope.inquire=function(lessonTypeId){
                $scope.lessonresource.lessonTypeId=lessonTypeId;
                $scope.seedLessonresourceTypeCss=new Map();
                $scope.seedLessonresourceTypeCss.put(lessonTypeId,'current');
                service.findLessons({pageNo:$scope.lessonresource.pageNo,pageSize:$scope.lessonresource.pageSize,
                    type:$scope.lessonresource.type,lessonName:$scope.lessonName,teacherName:$scope.teacherName,
                    lessonTypeId:lessonTypeId}).$promise.then(function(data){
                    $scope.lessonresource.lessonresource=data.data;
                    $scope.lessonresource.totalSize=data.totalResultsCount
                    $scope.lessonresource.totalResultsCount=Math.ceil(data.totalResultsCount/5);
                })
            }
            //展开课程分类
            $scope.unfoldLessonType=function(typeId){
                $scope.lessonresourceTypeCss=new Map();
                $scope.lessonresourceTypeCss.put(typeId,'current');
                if(!$scope.lessonresource.isLessonresourceType.get(typeId)){
                    $scope.lessonresource.isLessonresourceType.put(typeId,true);
                }else{
                    $scope.lessonresource.isLessonresourceType.put(typeId,false);
                }
            }
            init();
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