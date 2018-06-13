/**
 * Created by admin on 15-1-19.
 */





define(function (require, exports, module) {
    'use strict';

    require('jquery');


    module.exports =
        ['$scope','admin.lessonresource.modify.service', '$state','$stateParams', function ($scope, service,$state,$stateParams) {
            $scope.lessonResource={
                lessonType:[],
                //新建的课程
                updateLesson:{
                    //课程类型暂无
                    courseCategory:'1'
                },
                //课件
                courseware:[]
            }
            $scope.fileType=1;
            var init=function(){
                //获取课程类型
                service.findLessonTypeByParentId({parentId:'0'}).$promise.then(function(data){
                    $scope.lessonResource.nodeLessonType=buildTree(data.data)
                })
                //获取课程
                service.findLesson({lessonId:$stateParams.id}).$promise.then(function(data){
                    $scope.lessonResource.updateLesson=data.data;
                    $scope.orgName=data.data.name;
                    angular.forEach(data.data.coursewareList,function(item){
                        $scope.lessonResource.courseware.push({
                            id:item.id,
                            fileName:item.name
                        })
                    })
                    $scope.lessonResource.updateLesson.courseCategory=data.data.categoryDto.id
                    $scope.lessonResource.lessonType.typeName=data.data.categoryDto.name
                    console.log($scope.lessonResource.courseware)
                });
            }
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
            $scope.treeClick = function (e, data) {
                if (data.options.params.parentId === '0') {
                    return false;
                }else{
                    $scope.typeShow = false;
                    $scope.lessonResource.lessonType.typeName = data.options.params.name;
                    $scope.lessonResource.updateLesson.courseCategory = data.options.params.id;
                    $scope.lessonResource.lessonType.typePath = data.options.params.typePath;
                }
            };
            $scope.treeExpanding = function (e, data) {
                var url = '/web/admin/lessonresource/lessonResource/0/findLessonTypeByParentId',
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

            //重名校验
            $scope.check=function(){
                if($scope.lessonResource.updateLesson.name!=null&&$scope.lessonResource.updateLesson.name!=''&&$scope.lessonResource.updateLesson.name!=$scope.orgName){
                    service.checkLessonName({lessonName:$scope.lessonResource.updateLesson.name}).$promise.then(function(data){
                        if(data.results==='false'){
                            $scope.showTipPrompt('name', data.messages, 'false', true);
                            return;
                        }else if(data.results==='true'){
                            $scope.showTipPrompt('name', data.messages, 'true', true);
                            return;
                        }
                    });
                }
            }

            //保存
            $scope.save=function(){
                if($scope.lessonResource.updateLesson.name==null||$scope.lessonResource.updateLesson.name===''){
                    $scope.showTipPrompt('name', '课程名称不能为空', 'false', true);
                    return;
                }
                if($scope.lessonResource.updateLesson.teacherInfo==null||$scope.lessonResource.updateLesson.teacherInfo===''){
                    $scope.showTipPrompt('teacher', '讲师名称不能为空', 'false', true);
                    return;
                }
                if($scope.lessonResource.updateLesson.period==null||$scope.lessonResource.updateLesson.period===''){
                    $scope.showTipPrompt('period', '学分不能为空', 'false', true);
                    return;
                }
                if($scope.lessonResource.updateLesson.courseCategory==null||$scope.lessonResource.updateLesson.courseCategory===''){
                    $scope.showTipPrompt('type', '请选择一个课程分类', 'false', true);
                    return;
                }

                if($scope.lessonResource.updateLesson.expandData.toTheCrowd==null||$scope.lessonResource.updateLesson.expandData.toTheCrowd===''){
                    $scope.showTipPrompt('toTheCrowd', '使用人群不能为空', 'false', true);
                    return;
                }
                if($scope.lessonResource.courseware.length<=0){
                    $scope.showTipPrompt('courseware', '请至少上传一个课件', 'false', true);
                    return;
                }
                service.modify({'updateLesson':JSON.stringify($scope.lessonResource.updateLesson),'map':JSON.stringify($scope.lessonResource.courseware)}).$promise.then(function(data){
                    if(data.results==='false'){
                        $scope.showTipPrompt('add', data.messages, 'false', true);
                        return;
                    }else{
                        $state.go('lessonresource')
                    }
                })
            }

            $scope.position=1;
            $scope.uploadProgress = function(event, position, total, percentComplete) {
                console.log(event);
                $scope.position=position;
                console.log($scope.position)
                $scope.total=total/1024;
                $scope.percentComplete=percentComplete;

            };


            //监听图片上传文件事件
            $scope.$watch('upImage', function () {
                var uploadFile = $scope.upImage;
                if (!uploadFile) return;
                if (uploadFile.status) {
                    $scope.lessonResource.updateLesson.iconPath = uploadFile.url;
                    $scope.lessonResource.updateLesson.src = 'http://192.168.1.228:8080/mfs/resource/file/' + uploadFile.fileId + '.jpg';
                    $scope.showTipPrompt('file', '图片上传成功', 'true', true);
                    console.log(uploadFile)
                } else {
                    $scope.showTipPrompt('file', '图片上传失败', 'false', true);
                }
            }, true);


            //监听课件上传文件事件
            $scope.$watch('upCourseWare', function () {
                var uploadFile = $scope.upCourseWare;
                if (!uploadFile) return;
                $scope.lessonResource.courseware.push({
                    fileName:uploadFile.fileName,
                    newPath:uploadFile.newPath
                })
                $scope.showTipPrompt('courseware', '课件上传成功', 'true', true);
            }, true);

            $scope.deleteCourseWare=function(newPath){
                angular.forEach($scope.lessonResource.courseware,function(item,index){
                    if(newPath===item.newPath){
                        $scope.lessonResource.courseware.splice(index,1);
                    }
                })
            }
            init();
        }];

});