/**
 * author :dww
 * create on 15-1-16
 *
 **/
define(function (require, exports, module) {
    'use strict';

    module.exports =
        ['$scope', 'admin.trainclass.learnData.service', '$stateParams', function ($scope, service, $stateParams) {
            $scope.pageNo = 1;
            $scope.pageSize = 8;
            $scope.trainClassId = $stateParams.id;
            $scope.studentName = null;
            $scope.studentList = [];
            //加载学员培训记录
            $scope.loadStudentLearnData = function (pageNo) {
                service.loadStudentLearnData({pageNo: pageNo,
                    pageSize: $scope.pageSize,
                    studentName: $scope.studentName,
                    progress: $scope.progress,
                    trainClassId: $stateParams.id}).$promise.then(function (data) {
                        $scope.totalSize = data.totalSize;
                        $scope.studentNum = data.studentNum;
                        $scope.startLearnNum = data.startLearnNum;
                        $scope.notStartLearnNum = data.notStartLearnNum;
                        $scope.studentList = data.data;
                    });
            };

            //分页查询
            $scope.pageIndexChange = function (e, data) {
                $scope.loadStudentLearnData(data.newPageIndex + 1);
            };

            //查询
            $scope.findStudentLearnData = function () {
                $scope.loadStudentLearnData($scope.pageNo);
            };

            $scope.loadStudentLearnData($scope.pageNo);

            $scope.outData = function () {
                service.loadStudentLearnData({pageNo: 1,
                    pageSize: $scope.pageSize,
                    studentName: $scope.studentName,
                    progress: $scope.progress,
                    trainClassId: $stateParams.id}).$promise.then(function (data) {
                        if (data.totalSize === '0') {
                            $.wpfAlert({msg: '查询结果没有数据不能导出'});
                        } else {
                            var studentUrl = '/web/admin/trainclass/trainClassStudentStatisticsExcelOut?trainClassId='
                                + $stateParams.id;
                            if ($scope.studentName) {
                                studentUrl += '&studentName=' + $scope.studentName;
                            }
                            if ($scope.progress) {
                                studentUrl += '&progress=' + $scope.progress;
                            }

                            $.fileDownload(studentUrl);
                        }
                    });
            }

        }];
});

