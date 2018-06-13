/**
 * Created with IntelliJ IDEA.
 * User: drj
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    module.exports = ['$scope','business.mytrainclass.train-class-detail.service','$stateParams', function($scope,service,$stateParams) {
        $scope.trainclassdetail={
            lessons:[],
            reviews:[],
            learnUser:[],
            classId:$stateParams.classId,
            myclassdetail:{},
            //是否有排名
            isSort:false,
            //是否有进度
            isPlan:false,
            sort:0

        }
        $scope.page={
            reviewPageNo:1,
            reviewPageSize:3,
            lessonPageNo:1,
            lessonPageSize:5,
            userPageNo:1,
            userPageSize:3
        }
        var init=function(){
            $scope.findTrainClassDetail();
            $scope.findReviewPage($scope.page.reviewPageNo,$scope.page.reviewPageSize);
            $scope.inquireUserReview();
            $scope.findLessonPage($scope.trainclassdetail.lessonName,$scope.trainclassdetail.sort,$scope.status);
            $scope.findRecentLearnUserPage();
        }
        $scope.findTrainClassDetail=function(){
            service.findTrainClassDetail({classId:$scope.trainclassdetail.classId}).$promise.then(function(data){
                $scope.trainclassdetail.myclassdetail=data.data;
                if($scope.trainclassdetail.myclassdetail.rank!=''&&$scope.trainclassdetail.myclassdetail.rank!=null){
                    $scope.trainclassdetail.isSort=true;
                }
                if($scope.trainclassdetail.myclassdetail.plan!=''&&$scope.trainclassdetail.myclassdetail.plan!=null){
                    $scope.trainclassdetail.isPlan=true;
                }
            });
        };
        $scope.findLessonPage=function(lessonName,sort,status,add){
            service.findLessonPage({pageNo:$scope.page.lessonPageNo,
                pageSize:$scope.page.lessonPageSize,classId:$scope.trainclassdetail.classId,
                lessonName:lessonName,sort:sort,status:status}).$promise.then(function(data){

                    if (data.totalPageCount > data.currentPageNo) {
                        $scope.lessonLoading = true
                    } else {
                        $scope.lessonLoading = false
                    }
                    if (add) {
                        $scope.trainclassdetail.lessons=$scope.trainclassdetail.lessons.concat(data.data);
                    } else {
                        $scope.trainclassdetail.lessons = data.data;
                    }
            });
        };
        $scope.findReviewPage=function(pageNo,pageSize,add){
            service.findReviewPage({pageNo:pageNo,pageSize:pageSize,classId:$scope.trainclassdetail.classId}).$promise.then(function(data){
                $scope.totalResultsCount=data.totalResultsCount;

                if (data.totalPageCount > data.currentPageNo) {
                    $scope.loading = true
                } else {
                    $scope.loading = false
                }
                if (add) {
                    $scope.trainclassdetail.reviews=$scope.trainclassdetail.reviews.concat(data.data);
                } else {
                    $scope.trainclassdetail.reviews = data.data;
                }
                angular.forEach($scope.trainclassdetail.reviews,function(item){
                    item.scoreStyle={
                        width:item.score*20
                    }
                })
            });
        };
        $scope.findRecentLearnUserPage=function(add){
            service.findRecentLearnUserPage
            ({pageNo:$scope.page.userPageNo,pageSize:$scope.page.userPageSize,classId:$scope.trainclassdetail.classId})
                .$promise.then(function(data){
                if (data.totalPageCount > data.currentPageNo) {
                    $scope.learnUserLoading = true
                } else {
                    $scope.learnUserLoading = false
                }
                if (add) {
                    $scope.trainclassdetail.learnUser=$scope.trainclassdetail.learnUser.concat(data.data);
                } else {
                    $scope.trainclassdetail.learnUser = data.data;
                }
            })
        }
        $scope.submitReview=function(){
            service.submitReview({ReviewContext:$scope.ReviewContext,classId:$scope.trainclassdetail.classId}).$promise.then(function(data){
                if(data.results==='false'){
                    $scope.showTipPrompt('submit', data.messages, 'false', true);
                }else if(data.results==='true'){
                    $scope.findReviewPage($scope.page.reviewPageNo, $scope.page.reviewPageSize);
                    $scope.inquireUserReview();
                }
            });
        }

        //查询用户是否已经评论过
        $scope.inquireUserReview=function(){
            service.inquireUserReview({classId:$scope.trainclassdetail.classId}).$promise.then(function(data){
              if(data.results==='true'){
                  $scope.addReview=true;
              }
            })
        }

        //            数据导出
        $scope.outData = function () {

            service.findLessonPage({pageNo:$scope.page.lessonPageNo,
                pageSize:$scope.page.lessonPageSize,classId:$scope.trainclassdetail.classId,
                lessonName:$scope.trainclassdetail.lessonName,
                sort:$scope.trainclassdetail.sort,
                status:$scope.status}).$promise.then(function(data){
                    if (data.totalPageCount === 0) {
                        $.wpfAlert({msg: '导出结果没有数据不能导出'});
                    } else {
                        if($scope.trainclassdetail.lessonName!=null){
                            var studentUrl = '/web/business/mytrainclass/userTrainClassLessonStatisticsExcelOut?classId='
                                + $scope.trainclassdetail.classId + '&lessonName=' + $scope.trainclassdetail.lessonName+
                                '&sort='+$scope.trainclassdetail.sort+'&status='+$scope.status;
                            $.fileDownload(studentUrl);
                        }else{
                            var studentUrl = '/web/business/mytrainclass/userTrainClassLessonStatisticsExcelOut?classId='
                                + $scope.trainclassdetail.classId + '&sort='+$scope.trainclassdetail.sort+'&status='+$scope.status;
                            $.fileDownload(studentUrl);
                        }
                    }
                })

                service.findOrders({reviewPageNo: 1,
                    lessonPageSize: 10,
                    frontJSONData: JSON.stringify($scope.order)}).$promise.then(function (data) {
                        if (data.totalPageCount === 0) {
                            $.wpfAlert({msg: '导出结果没有数据不能导出'});
                        } else {
                            var studentUrl = '/web/admin/order/adminOrderStatisticsExcelOutAction?frontJSONData=' + JSON.stringify($scope.order);
                            $.fileDownload(studentUrl);
                        }
                    });

        }

        //切换课程列表类型
        $scope.css={a:'current'};
        $scope.status=0
        $scope.switch=function(type){
            $scope.page.lessonPageNo=1;
            if(type==='0'){
                $scope.css={a:'current'};
            }else if(type==='1'){
                $scope.css={b:'current'};
            }else if(type==='2'){
                $scope.css={c:'current'};
            }else if(type==='3'){
                $scope.css={d:'current'};
            }
            $scope.status=type
            $scope.findLessonPage($scope.trainclassdetail.lessonName,$scope.trainclassdetail.sort,$scope.status);
        }
        //条件查询
        $scope.inquire=function(){
            $scope.findLessonPage($scope.trainclassdetail.lessonName,$scope.trainclassdetail.sort,$scope.status);
        }
        //排序
        $scope.scheduleCss='up'
        $scope.sort=function(){
            $scope.page.lessonPageNo=1
            if($scope.trainclassdetail.sort==0){
                $scope.trainclassdetail.sort=1
                $scope.scheduleCss='down'
            }else if($scope.trainclassdetail.sort==1){
                $scope.trainclassdetail.sort=2
                $scope.scheduleCss='up'
            }else if($scope.trainclassdetail.sort==2){
                $scope.trainclassdetail.sort=1
                $scope.scheduleCss='down'
            }
            $scope.findLessonPage($scope.trainclassdetail.lessonName,$scope.trainclassdetail.sort,$scope.status);
        }

        /**
         *加载下页数据
         */
        $scope.loadMore = function (type) {
            if(type==='1'){
                $scope.page.reviewPageNo ++;
                $scope.findReviewPage($scope.page.reviewPageNo, $scope.page.reviewPageSize, true);
            }else if(type==='2'){
                $scope.page.lessonPageNo ++;
                $scope.findLessonPage($scope.trainclassdetail.lessonName,$scope.trainclassdetail.sort,$scope.status,true);
            }else if(type==='3'){
                $scope.page.userPageNo ++;
                $scope.findRecentLearnUserPage(true);
            }
        }



        init();
    }]
});