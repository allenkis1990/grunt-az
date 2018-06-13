///**
// * author :dww
// * create on 15-1-15
// *
// **/
define(function (require, exports, module) {
    'use strict';
    require('validateEngine');
    module.exports =
        ['$scope', 'admin.trainclass.sendCode.service','$state', '$stateParams','$http',function ($scope, service,$state, $stateParams,$http) {

            $scope.pageSize=8;
            $scope.pageNo=1;
            $scope.chooseUserList = [];
            $scope.chooseUserIds = [];
            $scope.allCodeNumber=0;
            $scope.userName=null;

            service.loadUsers({pageNo:1,
                pageSize: $scope.pageSize,
                frontJSONData:JSON.stringify({userIds:$scope.chooseUserIds,userName:$scope.userName})
            }).$promise.then(function (data) {
                    $scope.UserList = data.data;
                    $scope.totalResultsCount = data.totalSize;
                    $scope.totalSize = data.totalPageSize;
                });

            //选择操作
            $scope.chooseUser = function (user) {
                chooseSendCodeUser(user);
                //剔除被选中的user
                service.loadUsers({pageNo:$scope.pageNo,
                    pageSize: $scope.pageSize,
                    frontJSONData:JSON.stringify({userIds:$scope.chooseUserIds,userName:$scope.userName})
                }).$promise.then(function (data) {
                        if(data.data.length === 0){
                            $scope.pageNo = $scope.pageNo-1;
                            service.loadUsers({pageNo:$scope.pageNo,
                                pageSize: $scope.pageSize,
                                frontJSONData:JSON.stringify({userIds:$scope.chooseUserIds,userName:$scope.userName})
                            }).$promise.then(function (data) {
                                    $scope.UserList = data.data;
                                    $scope.totalResultsCount = data.totalSize;
                                    $scope.totalSize = data.totalPageSize;
                                });
                        }else{
                            $scope.UserList = data.data;
                            $scope.totalResultsCount = data.totalSize;
                            $scope.totalSize = data.totalPageSize;
                        }
                    });
            };
            //x单个操作
            $scope.removeUser = function (index, user) {
                console.log(index);
                console.log(user);
                removeSendCodeUser(index);
                //剔除被选中的user
                service.loadUsers().$promise.then(function (data) {
                    $scope.UserList = data.data;
                });
            };
            //确认操作
            $scope.confirmChoose = function () {
                if($scope.chooseUserList.length === 0){
                    return false;
                }else{
                    service.sendCode().$promise.then(function (data) {
                        if(data.results === 'true'){
                            $scope.showTipPrompt('confirm_id', data.messages, 'true',true);
                        }else{
                            $scope.showTipPrompt('confirm_id', data.messages, 'false',false);
                        }
                    });
                }

            };
            //删除操作
            $scope.removeAllChooseUser = function () {
                $scope.allCodeNumber=0;
                $scope.chooseUserIds = [];
                $scope.chooseUserList = [];
            };

            $scope.$watch('chooseUserList', function () {
                if($scope.chooseUserList.length>0){
                    var count = 0
                    angular.forEach($scope.chooseUserList,function (item,index) {
                        if(item.codeNumber !== ''){
                            count =  count + parseInt(item.codeNumber);
                        }
                    });

                    $scope.allCodeNumber = count;
                }
            }, true);
            //根据名称模糊查询学员
            $scope.findUsersByName = function () {

                service.loadUsers({pageNo:1,
                    pageSize: $scope.pageSize,
                    frontJSONData:JSON.stringify({userIds:$scope.chooseUserIds,userName:$scope.userName})
                }).$promise.then(function (data) {
                    $scope.UserList = data.data;
                    $scope.totalResultsCount = data.totalSize;
                    $scope.totalSize = data.totalPageSize;
                });
                $("#page_obj").wijpager({
                    pageIndex: 0
                });
            };
            //激活码+1操作
            $scope.addCode = function (chooseUser) {
                chooseUser.codeNumber =  chooseUser.codeNumber + 1;
            };
            //激活码-1操作
            $scope.reduceCode = function (chooseUser) {
                if(chooseUser.codeNumber === 0){
                    return false;
                }else{
                    chooseUser.codeNumber =  chooseUser.codeNumber - 1;
                }
            };
            $scope.pageIndexChange = function (e, data) {
                $scope.pageNo = data.newPageIndex+1;
                service.loadUsers({pageNo:data.newPageIndex+1,
                    pageSize: $scope.pageSize,
                    frontJSONData:JSON.stringify({userIds:$scope.chooseUserIds,userName:$scope.userName})
                }).$promise.then(function (data) {
                        $scope.UserList = data.data;
                        $scope.totalResultsCount = data.totalSize;
                        $scope.totalSize = data.totalPageSize;
                    });
            };
            function chooseSendCodeUser(user) {
                $scope.chooseUserIds.push(user.id);
                $scope.chooseUserList.push({id:user.id,name:user.name,codeNumber:1});
            };
            function removeSendCodeUser(index) {
                $scope.chooseUserIds.splice(index,1);
                $scope.chooseUserList.splice(index,1)
            };


        }];


});