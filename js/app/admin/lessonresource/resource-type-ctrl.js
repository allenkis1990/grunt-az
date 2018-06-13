/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午10:59
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
        'use strict';

        module.exports = ['$scope', '$rootScope', 'admin.lessonresource.resourcetype.service',
            function ($scope, $rootScope, service) {

                //查询分页数据
                function findResourceType(parentId) {
                    if ($scope.typeDataMap.get(parentId) == null) {
                        service.findResourceType({parentId: parentId}).$promise.then(function (data) {
                            if (parentId === '0') {
                                $scope.resourceTypes = data.data;
                            } else {
                                $scope.typeDataMap.put(parentId, data.data);
                            }
                        });
                    }


                };
                function initData() {
                    /*存放分类是否展开逻辑值*/
                    $scope.typeMap = new Map();
                    $scope.typeDataMap = new Map();
                    //加载分类数据
                    findResourceType('0');
                }

                function init() {
                    //加载分类数据父分类数据
                    findResourceType('0');
                }

                initData();
                //删除分类
                $scope.deleteResourceType = function (id) {
                    service.deleteCourseCategory({categoryId: id}).$promise.then(function (data) {
                        if (data.results === 'false') {
                            $.wpfAlert({msg: data.messages});
                            return false;
                        } else {
//                            $.wpfAlert({msg: data.messages});
                            init();
                        }
                    });
                }
                //保存分类
                $scope.save = function () {

                    if ($scope.typeName == null || $scope.typeName === '') {
                        $scope.showTipPrompt('type_name', '分类名称不可为空！', 'false', true);
                        return false;
                    }
                    ;
                    service.addResourceType({parentId: $scope.parentId, name: $scope.typeName}).$promise.then(function (data) {
                        if (data.results === 'false') {
                            $scope.showTipPrompt('type_name', data.messages, 'false', true);
//                            $.wpfAlert({msg: data.messages});
                            return false;
                        } else {
                            $scope.addTypeWindow = false;
                            if ($scope.parentId === '0') {
                                init();
                            } else {
                                loadsubData($scope.parentId);
                            }
//                            $.wpfAlert({msg: data.messages});

                        }

                    });
                };
                /**
                 * 加载子分类数据
                 * @param parentId
                 */
                function loadsubData(parentId) {
                    service.findResourceType({parentId: parentId}).$promise.then(function (data) {
                        $scope.typeDataMap.put(parentId, data.data);
                    });
                };

                $scope.move = function (id, type, parentId) {
                    var resourceTypes = $scope.typeDataMap.get(parentId);
                    if (type === 'up') {
                        angular.forEach(resourceTypes, function (item, index) {
                            if (item.id === id) {
                                if (index > 0) {
                                    service.exchangeType({firstCategoryId: id, secondCategoryId: resourceTypes[index - 1].id}).
                                        $promise.then(function (data) {
                                            if (data.results === 'false') {
                                                $.wpfAlert({msg: data.messages});
                                            } else {
//                                                $.wpfAlert({msg: data.messages});
                                                loadsubData(parentId);
                                            }
                                        });
                                }
                            }
                        });
                    }
                    if (type === 'down') {
                        angular.forEach(resourceTypes, function (item, index) {
                            if (item.id === id) {
                                if (index < resourceTypes.length - 1) {
                                    service.exchangeType({firstCategoryId: id, secondCategoryId: resourceTypes[index + 1].id}).
                                        $promise.then(function (data) {
                                            if (data.results === 'false') {
                                                $.wpfAlert({msg: data.messages});
                                            } else {
                                                loadsubData(parentId);
                                            }
                                        });
                                }

                            }
                        });
                    }
                }

                $scope.tabbingOrder = function (id, type, e) {
                    if (type === 'top') {
                        if (id === $scope.resourceTypes[0].id) {

                            return false;
                        } else {
                            service.moveTypeTop({categoryId: id, sort: $scope.resourceTypes[0].sort}).$promise.then(function (data) {
                                if (data.results === 'false') {
                                    $.wpfAlert({msg: data.messages});
                                } else {
                                    init();
                                }
                            });
                        }


                    }
                    if (type === 'up') {
                        angular.forEach($scope.resourceTypes, function (item, index) {
                            if (item.id === id) {
                                if (index > 0) {
                                    service.exchangeType({firstCategoryId: id, secondCategoryId: $scope.resourceTypes[index - 1].id}).
                                        $promise.then(function (data) {
                                            if (data.results === 'false') {
                                                $.wpfAlert({msg: data.messages});
                                            } else {
//                                                $.wpfAlert({msg: data.messages});
                                                init();
                                            }
                                        });
                                }
                            }
                        });
                    }
                    if (type === 'down') {
                        angular.forEach($scope.resourceTypes, function (item, index) {
                            if (item.id === id) {
                                if (index < $scope.resourceTypes.length - 1) {
                                    service.exchangeType({firstCategoryId: id, secondCategoryId: $scope.resourceTypes[index + 1].id}).
                                        $promise.then(function (data) {
                                            if (data.results === 'false') {
                                                $.wpfAlert({msg: data.messages});
                                            } else {
//                                                $.wpfAlert({msg: data.messages});
                                                init();
                                            }
                                        });
                                }

                            }
                        });
                    }
                    if (type === 'bottom') {
                        if (id === $scope.resourceTypes[$scope.resourceTypes.length - 1].id) {
                            return false;
                        } else {
                            service.moveTypeBottom({categoryId: id, sort: $scope.resourceTypes[$scope.resourceTypes.length - 1].sort}).$promise.then(function (data) {
                                if (data.results === 'false') {
                                    $.wpfAlert({msg: data.messages});
                                } else {
                                    init();
                                }
                            });
                        }
                    }
                }
                $scope.deleteTrainType = function (id, parentId) {
                    $.wpfConfirm({
                        sure: function () {
                            service.deleteCourseCategory({
                                categoryId: id
                            }).$promise.then(function (data) {
                                    if (data.results === 'true') {
//                                        $.wpfAlert({msg: data.messages});
                                        if (parentId === '0') {
                                            init();
                                        } else {
                                            loadsubData(parentId);
                                        }

                                    } else {
                                        $.wpfAlert({msg: data.messages});
                                    }
                                });
                        },
                        msg: '是否确认删除该分类?'
                    });

                }
                $scope.updateType = function (id, name, parentId, sort) {
                    $scope.updateTypeWindow = true
                    $scope.categoryId = id;
                    $scope.update_name = name;
                    $scope.parentId = parentId;
                    $scope.sort = sort;
                }
                $scope.update = function () {

                    if ($scope.update_name == null || $scope.update_name === '') {
                        $scope.showTipPrompt('update_name', '分类名称不可为空！', 'false', true);
                        return false;
                    }
                    service.updateCourseCategory({ categoryId: $scope.categoryId, name: $scope.update_name, parentId: $scope.parentId, sort: $scope.sort }).$promise.then(function (data) {
                        if (data.results === 'true') {
//                            $.wpfAlert({msg: data.messages});
                            $scope.updateTypeWindow = false;
                            if ($scope.parentId === '0') {
                                init();
                            } else {
                                loadsubData($scope.parentId);
                            }
                        } else {
                            $scope.showTipPrompt('update_name', data.messages, 'false', true);
//                            $.wpfAlert({msg: data.messages});
                        }
                    });
                }
                $scope.subquery = function (type, id) {
                    if (type == 'notUnfold') {
                        $scope.typeMap.put(id, true);
                        findResourceType(id);
                    } else {
                        $scope.typeMap.put(id, false);
                    }
                }
                /*添加分类*/
                $scope.addResourceType = function (parentId) {
                    $scope.addTypeWindow = true;
                    $scope.parentId = parentId;
                    $scope.typeName = null;
                };
                /*封装map*/
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
            }
        ]
    }
)
;