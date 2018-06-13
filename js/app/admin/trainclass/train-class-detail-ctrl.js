/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope','admin.trainclass.detail.service', '$stateParams', function($scope, service, $stateParams) {
            $scope.trainLesson=[];
            $scope.pageNo=1;
            $scope.pageSize=10;
            /*分页是否渲染过数据*/
            $scope.trainClassTip=true;
            $scope.lessonTip=false;
            $scope.showTrainClass = function() {
                service.showTrainClassDetail({trainClassId:$stateParams.id}).$promise.then(function(data){
                    $scope.trainClass=data.data;
                });
            };
            $scope.showTrainLesson = function(){
                service.showTrainClassLesson({trainClassId:$stateParams.id,pageNo:$scope.pageNo,pageSize: $scope.pageSize}).$promise.then(function(data){
                    $scope.trainLesson=data.data;
                    $scope.totalsCount =data.totalResultsCount;
                    $scope.totalResultsCount=Math.ceil(data.totalResultsCount/$scope.pageSize);
                });
            };
            $scope.showTrainClass();
            $scope.toggle = function(where) {
                $scope.trainClassTip             = where === 'trainClassTip' ? true : false;
                $scope.lessonTip               = where === 'lessonTip' ? true : false;
                if(where==='trainClassTip'){
                    $scope.showTrainClass();
                    $scope.trainClassTip=true;
                }else if(where==='lessonTip'){
                    $scope.showTrainLesson();
                    $scope.lessonTip=true;
                }
            };
            $scope.pageIndexChange = function (e, data) {
                service.showTrainClassLesson({trainClassId:$stateParams.id,pageNo:data.newPageIndex+1,pageSize: $scope.pageSize}).$promise.then(function(data){
                    $scope.totalResultsCount = data.totalResultsCount;
                    $scope.trainLesson=data.data;
                    $scope.totalResultsCount=Math.ceil(data.totalResultsCount/$scope.pageSize);
                });
            };


//            function buildLessonData(lessonData) {
//                var lesson = [];
//                for(var i=0;i<lessonData.length;i++){
//                    if((i+1)%3===0){
//                        lesson.push(lessonData[i]);
//                        $scope.trainLesson.push(lesson);
//                        lesson=[];
//                    }else{
//                        lesson.push(lessonData[i]);
//                        if(lessonData.length-i===1){
//                            $scope.trainLesson.push(lesson);
//                        }
//                    }
//                }
//            }
        }];
});

