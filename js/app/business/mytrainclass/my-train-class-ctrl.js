/**
 * Created with IntelliJ IDEA.
 * User: drj
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    module.exports = ['$scope','business.mytrainclass.service','$stateParams', function($scope,service,$stateParams) {
        $scope.mytrainclass={
            css:{},
            pageNo:1,
            pageSize:8
        }



        //获取培训班分页
        $scope. findMyTrainClass=function(pageNo,pageSize,add,name){
            service.findMyTrainClass({pageNo:pageNo,pageSize:pageSize,type:$scope.mytrainclass.type,name:name}).$promise.then(function(data){

                if (data.totalPageCount > data.currentPageNo) {
                    $scope.loading = true
                } else {
                    $scope.loading = false
                }
                if (add) {
                    setRankAndScheduleView(data.data)
                    $scope.mytrainclass.mytrainclass=$scope.mytrainclass.mytrainclass.concat(data.data);
                } else {
                    $scope.mytrainclass.mytrainclass = data.data;
                    setRankAndScheduleView($scope.mytrainclass.mytrainclass)
                }
            })
        }


        //设置进度为空和排名为空时的显示
        function setRankAndScheduleView(data){
            angular.forEach(data,function(item){
                if(item.classSchedule==null||item.classSchedule===''){
                    item.classSchedule='暂无学习进度';
                }else {
                    item.classSchedule=item.classSchedule+'%';
                }
                if(item.rank==null||item.rank===''){
                    item.rank='暂无排名';
                }else {
                    item.rank=item.rank+'/'+item.number
                }
            })
        }

        $scope.findMyTrainClass($scope.mytrainclass.pageNo,$scope.mytrainclass.pageSize)
//          $scope.searchWord = '';
        //切换培训班列表
        $scope.mytrainclass.css={a:'current'};
        $scope.xswitch=function(type){
            if(type==='0'){
                $scope.mytrainclass.css={a:'current'};
            }else if(type==='1'){
                $scope.mytrainclass.css={b:'current'};
            }else if(type==='2'){
                $scope.mytrainclass.css={c:'current'};
            }else if(type==='3'){
                $scope.mytrainclass.css={d:'current'};
            }
           $scope.mytrainclass.type=type
           $scope.findMyTrainClass(1,$scope.mytrainclass.pageSize);
        }

        //根据培训班名称查询
        $scope.search=function(){
            $scope.findMyTrainClass(1,$scope.mytrainclass.pageSize,false,$scope.name);
        }

        /**
         * 加载下页数据
         */
        $scope.loadMore = function () {
            $scope.mytrainclass.pageNo ++;
            $scope.findMyTrainClass($scope.mytrainclass.pageNo, $scope.mytrainclass.pageSize, true,$scope.name);
        }
    }]
});