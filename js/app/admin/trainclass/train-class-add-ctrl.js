///**
// * author :dww
// * create on 15-1-15
// *
// **/
define(function (require, exports, module) {
    'use strict';
    var allLesson = [];
    require('validateEngine');



    module.exports =
        ['$scope', 'admin.trainclass.add.service', '$timeout', '$window','$location', '$state','$http', function ($scope, service, $timeout, $window,$location,$state,$http) {

            angular.extend($scope, {
                trainClass: {
                    trainStartTime:null,
                    trainEndTime:null
                },
                trainRuleOne: {
                    isCheck:false,
                    warnDays:null,
                    progress:null
                },
                trainRuleTwo: {
                    isCheck:false,
                    days:null
                },
                trainType: {
                },
                one: 'show',
                oneTip: true,

                lessonTypeList:[],
                selectLessonIds:[],
                trainLessonList: [],
                lessonList:[],
                urlPic:null,
                typeId:null,
                subTypeId:null

            });
            $scope.typeMap = new Map()

            service.findTrainClassTypes({parentId: '0'}).$promise.then(function (data) {
                $scope.urlPic = data.url;
                $scope.trainClass.src = data.url + data.fileId + '.jpg';
                $scope.trainClass.logoId = data.resourceId;
                $scope.trainClass.logoFifeId =  data.fileId;
                $scope.trainClassTypeList = buildTree(data.data);
            });
            $scope.validateField = false;


            $scope.validateTrainName = function () {

                if($scope.trainClass.name !=='' && $scope.trainClass.name !== undefined){
                    if(!($scope.trainClass.name.length >30)){
                        $http.get('/web/trainclass/trainClass/0/validateTrainName?trainClassName='+$scope.trainClass.name).success(function(data) {
                            if(data[0] === 'true'){
                                $scope.showTipPrompt('train_name', data[1], 'true',true);
                                $scope.validateField = true;
                            }else{
                                $scope.showTipPrompt('train_name', data[1], 'false',true);
                                $scope.validateField = false;
                            }
                        });
                    }
                }
            }
            $scope.treeExpanding = function (e, data) {
                var url = '/web/trainclass/trainClass/0/findTrainClassType',
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
            };

            $scope.treeClick = function (e, data) {
                if (data.options.params.parentId=== '0') {
                    return false;
                } else {
                    $scope.trainType.typeName = data.options.params.name;
                    $scope.trainClass.trainTypeId = data.options.params.id;
                    $scope.trainClass.typePath = data.options.params.typePath;
                    $scope.typeShow = false;
                    $scope.hideOne('type_name');
                }
            };
            //监听上传文件事件
            $scope.$watch('uploadFile', function () {
                var uploadFile = $scope.uploadFile;
                if (!uploadFile) return;
                if (uploadFile.status) {
                    $scope.trainClass.logoId = uploadFile.resourceId;
                    $scope.trainClass.logoFifeId = uploadFile.fileId;
                    $scope.trainClass.src = $scope.urlPic + uploadFile.fileId + '.jpg';
                    $scope.showTipPrompt('file', '图片上传成功', 'true', true);
                } else {
                    $scope.showTipPrompt('file', '图片上传失败', 'false', true);
                }
            }, true);


            //展开课程分类
            $scope.expandChildNodes = function(typeId){
                $scope.typeId = typeId;
                if(!$scope.typeMap.get(typeId)){
                    $scope.typeMap.put(typeId,true);
                }else{
                    $scope.typeMap.put(typeId,false);
                }
            };

            $scope.saveDraft = function () {
                //保存草稿状态
                $scope.trainClass.status = 1;

                if ($scope.getValidateResult()) {
                    if($scope.trainClass.name !=='' && $scope.trainClass.name.length < 30){
                        if(!$scope.validateField){
                            $scope.showTipPrompt('train_name', '该名称已重复！', 'false',true);
                            return false;
                        }
                    }
                    var resultTime = validateTrainTime($scope.trainClass.trainStartTime,$scope.trainClass.trainEndTime);
                    if(resultTime){
                        if(typeof $scope.trainClass.trainStartTime === 'object' ){
                            $scope.trainClass.trainStartTime = getCurrentTime($scope.trainClass.trainStartTime);
                        }
                        if(typeof $scope.trainClass.trainEndTime === 'object' ){
                            $scope.trainClass.trainEndTime = getCurrentTime($scope.trainClass.trainEndTime);
                        }
                        var resultInfo = validateTrainInfo($scope.trainClass.mode);
                        if(resultInfo){
                            var rules = buildRules($scope.trainRuleOne, $scope.trainRuleTwo);
                            service.createTrainDraft({jsonData: JSON.stringify({trainClass: $scope.trainClass, rules: rules,lessonList:$scope.selectLessonIds}),
                                    underLineServiceDes: $scope.underLineServiceDes,
                                    intro: $scope.intro}).$promise.then(function (data) {
                                if(data.results === 'false'){
                                    $.wpfAlert({
                                        msg: data.messages
                                    });
                                }else{
                                    $state.go('trainclass');
                                }
                            });
                        }
                    }
                }



            };

            //加载课程
            $scope.loadLesson  = function () {
                service.loadLesson({jsonData:JSON.stringify({resourceType:$scope.resourceType,
                    colLessonName:$scope.colLessonName,
                    typeId:$scope.subTypeId,
                    lessonIds:$scope.selectLessonIds})}).$promise.then(function (data) {
                        $scope.lessonList = data.data;
                    });
            };

            //查询课程
            $scope.findLesson = function (subTypeId,resourceType,lessonName) {
                if(lessonName === null) {
                    $scope.colLessonName = lessonName;
                }
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

            /**
             * 添加课程
             * @param data
             * @returns {Array}
             */
            $scope.addLesson = function (lesson, index) {
                buildRightTrainLesson(lesson,2);
                $scope.lessonList.splice(index, 1);
                var postion = $.inArray(lesson.lessonId, $scope.selectLessonIds);
                if (postion === -1) {
                    $scope.selectLessonIds.push(lesson.lessonId);
                }
                if($scope.lessonList.length === 0){
                    $scope.isLessonSearch = false;
                }
            };

            /**
             * 去除课程
             * @param lesson
             * @param index
             */
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
                if($scope.trainLessonList.length === 0){
                    $scope.isSearch = false;
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
                $scope.isLessonSearch = false;
                $scope.lessonList=[];

            };
            //清空
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
            /**
             * 创建培训班
             * @constructor
             */
            $scope.createTrainClass = function () {
                //保存
                if(typeof $scope.trainClass.trainStartTime === 'object' ){
                    $scope.trainClass.trainStartTime = getCurrentTime($scope.trainClass.trainStartTime);
                }
                if(typeof $scope.trainClass.trainEndTime === 'object' ){
                    $scope.trainClass.trainEndTime = getCurrentTime($scope.trainClass.trainEndTime);
                }
                if ($scope.getValidateResult()) {
                    if($scope.trainClass.name !=='' && $scope.trainClass.name.length < 30){
                        if(!$scope.validateField){
                            $scope.showTipPrompt('train_name', '该名称已重复！', 'false',true);
                            return false;
                        }
                    }
                    var resultTime = validateTrainTime($scope.trainClass.trainStartTime,$scope.trainClass.trainEndTime);
                    if(resultTime){
                        if(typeof $scope.trainClass.trainStartTime === 'object' ){
                            $scope.trainClass.trainStartTime = getCurrentTime($scope.trainClass.trainStartTime);
                        }
                        if(typeof $scope.trainClass.trainEndTime === 'object' ){
                            $scope.trainClass.trainEndTime = getCurrentTime($scope.trainClass.trainEndTime);
                        }
                        var resultInfo = validateTrainInfo($scope.trainClass.mode);
                        if(resultInfo){
                            var rules = buildRules($scope.trainRuleOne, $scope.trainRuleTwo);
                            $scope.trainClass.status = 2;
                            service.save({jsonData: JSON.stringify({trainClass: $scope.trainClass, rules: rules,lessonList:$scope.selectLessonIds}),
                                underLineServiceDes: $scope.underLineServiceDes,
                                intro: $scope.intro})
                                .$promise.then(function (data) {
                                    if(data.results === 'false'){
                                        $.wpfAlert({
                                            msg: data.messages
                                        });
                                    }else{
                                        $state.go('trainclass');
                                    }
                                });
                        }
                    }
                }
            };

            /**
             * 发布商品
             * @constructor
             */
            $scope.publishTrainClass = function(){
                $scope.trainClass.status = 2;
                if ($scope.getValidateResult() || $scope.validateField) {
                    var resultTime = validateTrainTime($scope.trainClass.trainStartTime,$scope.trainClass.trainEndTime);
                    if(resultTime){
                        var resultInfo = validateTrainInfo($scope.trainClass.mode);
                        if(resultInfo){
                            var rules = buildRules($scope.trainRuleOne, $scope.trainRuleTwo);
                            service.save({jsonData: JSON.stringify({trainClass: $scope.trainClass, rules: rules,lessonList:$scope.selectLessonIds}),
                                underLineServiceDes: $scope.underLineServiceDes,
                                intro: $scope.intro})
                                .$promise.then(function (data) {
                                    if(data.results === 'false'){
                                        $.wpfAlert({
                                            msg: data.messages
                                        });
                                    }else{
                                        $state.go('releasecommodity',{ id: data.messages });
                                    }
                                });
                        }
                    }
                }
            };
            $scope.OneStep = function () {
              // 验证填写的信息是否正确
               if ($scope.getValidateResult()) {
                   if($scope.trainClass.name !=='' && $scope.trainClass.name.length < 30){
                       if(!$scope.validateField){
                           $scope.showTipPrompt('train_name', '该名称已重复！', 'false',true);
                           return false;
                       }
                   }
                    var resultTime = validateTrainTime($scope.trainClass.trainStartTime,$scope.trainClass.trainEndTime);
                    if(resultTime){
                        if(typeof $scope.trainClass.trainStartTime === 'object' ){
                            $scope.trainClass.trainStartTime = getCurrentTime($scope.trainClass.trainStartTime);
                        }
                        if(typeof $scope.trainClass.trainEndTime === 'object' ){
                            $scope.trainClass.trainEndTime = getCurrentTime($scope.trainClass.trainEndTime);
                        }
                        var resultInfo = validateTrainInfo($scope.trainClass.mode);
                        if(resultInfo){

                            $scope.resourceType = 1;
                            $scope.one = 'hide';
                            $scope.two = 'show';
                            $scope.three = 'hide';
                            $scope.oneTip = false;
                            $scope.twoTip = true;
                            $scope.threeTip = false;
                            //加载课程类别
                            service.loadLessonTypes().$promise.then(function (data) {
                                $scope.lessonTypeList = [];
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
                            //获取商学院课程
                            $scope.loadLesson();
                        }
                    }
               }
            };
            $scope.twoStep = function() {
                //培训班课程不可为空
                if($scope.selectLessonIds.length>0){
                    $scope.one = 'hide';
                    $scope.two = 'hide';
                    $scope.three = 'show';
                    $scope.oneTip = false;
                    $scope.twoTip = false;
                    $scope.threeTip = true;
                }else{
                    $scope.showTipPrompt('two_step', '培训班课程不可为空，请选择课程', 'false',true);
                    return false;
                }
            };
            $scope.upTwoStep = function () {
                $scope.one = 'show';
                $scope.two = 'hide';
                $scope.three = 'hide';
                $scope.oneTip = true;
                $scope.twoTip = false;
                $scope.threeTip = false;
            };
            $scope.upThreeStep = function() {
                $scope.one = 'hide';
                $scope.two = 'show';
                $scope.three = 'hide';
                $scope.oneTip = false;
                $scope.twoTip = true;
                $scope.threeTip = false;
            };

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
            function buildRules(ruleOne, ruleTwo) {
                var rules = [];
                if($scope.trainClass.mode ==='1'||$scope.trainClass.mode ==='3'){
                    if (ruleOne.isCheck) {
                        var content = ruleOne.warnDays + '-' + ruleOne.progress;
                        rules.push({type: 1, content: content})
                    }
                    if (ruleTwo.isCheck) {
                        var content = ruleTwo.days;
                        rules.push({type: 2, content: content})
                    }
                }
                return rules;
            };
            $scope.checkOneRule = function (){
                var warnDays = $scope.trainRuleOne.warnDays,
                    progress = $scope.trainRuleOne.progress;
                if($scope.trainRuleOne.warnDays===null ||$scope.trainRuleOne.warnDays===''){
                    $scope.showTipPrompt('warn_days', '此处不为空', 'false',true);
                    return false;
                }else{
                    //整数校验
                    if(!(/^[1-9]*[1-9][0-9]*$/).test(warnDays)){
                        $scope.showTipPrompt('warn_days', '不是有效的天数', 'false',true);
                        return false;
                    }
                    var trainEndTime = dateFormat($scope.trainClass.trainEndTime),
                        trainStartTime = dateFormat($scope.trainClass.trainStartTime);
                    //校验培训天数
                    if((trainEndTime-trainStartTime)/ (24 * 60 * 60 * 1000)-warnDays<0){
                        $scope.showTipPrompt('warn_days', '提醒天数不可大于培训班培训天数', 'false',true);
                        return false;
                    }

                }
                if($scope.trainRuleOne.progress === null||$scope.trainRuleOne.progress ===''){
                    $scope.showTipPrompt('progress', '此处不为空', 'false',true);
                    return false;
                }else{
                    if(!( /^(?:1|[1-9][0-9]?|99)$/).test(progress)){
                        $scope.showTipPrompt('progress', '进度需为1~100%之间', 'false',true);
                        return false;
                    }
                }
                return true;
            };
            $scope.checkTwoRule = function(){
                var repDays = $scope.trainRuleTwo.days;
                if(repDays===null || repDays === ''){
                    $scope.showTipPrompt('rep_days', '此处不为空', 'false',true);
                    return false;
                }else{
                    //整数校验
                    if(!(/^[1-9]*[1-9][0-9]*$/).test(repDays)){
                        $scope.showTipPrompt('rep_days', '不是有效的天数', 'false',true);
                        return false;
                    }
                    var trainEndTime = dateFormat($scope.trainClass.trainEndTime),
                        trainStartTime = dateFormat($scope.trainClass.trainStartTime);
                    //校验培训天数
                    if((trainEndTime-trainStartTime)/ (24 * 60 * 60 * 1000)-repDays<0){
                        $scope.showTipPrompt('rep_days', '提醒天数不可大于培训班培训天数', 'false',true);
                        return false;
                    }
                }
                return true;
            };
            $scope.findSelectLesson = function () {
                $scope.trainLessonList = [];
                service.findSelectedLesson({jsonData:JSON.stringify({lessonName: $scope.trainClass.lessonName,
                    lessonIds:$scope.selectLessonIds})}).$promise.then(function (data) {
                        if(data.data.length===0){
                            $scope.isSearch = true;
                        }
                        angular.forEach(data.data,function (item,index){
                            buildRightTrainLesson(item,1);
                        })
                    });
            };


            //时间校验
            function validateTrainTime(startTime,endTime) {
                if(startTime===null || endTime === ''){
                    $scope.showTipPrompt('start_time', '培训班开始时间不可为空', 'false',true);
                    return false;
                }
                if(endTime===null || endTime === ''){
                    $scope.showTipPrompt('end_time', '培训班结束时间不可为空', 'false',true);
                    return false;
                }
                var trainEndTime = dateFormat(endTime),
                    nowTime = new Date().getTime(),
                    trainStartTime = dateFormat(startTime);
                if (nowTime > trainStartTime) {
                    $scope.showTipPrompt('start_time', '培训班开始时间不能小于当前时间', 'false',true);
                    return false;
                }
                if (trainStartTime > trainEndTime) {
                    $scope.showTipPrompt('end_time', '培训班开始时间不可比培训班结束时间还迟', 'false',true);
                    return false;
                }
                return true;
            }
            //开班模式校验
            function validateTrainInfo(mode) {
                if(mode !=='2'){
                    if($scope.trainRuleOne.isCheck === true){
                        if(!$scope.checkOneRule()){
                            return false;
                        }
                    }
                    if($scope.trainRuleTwo.isCheck === true){
                        if(!$scope.checkTwoRule()){
                            return false;
                        }
                    }
                }else{
                    //校验线下服务说明
                    if($scope.underLineServiceDes === undefined ||  $scope.underLineServiceDes ===''){
                        $scope.showTipPrompt('underLine_des', '线下服务不可为空，请填写', 'false',true);
                        return false;
                    }
                }
                //校验培训班详情
                if($scope.intro === undefined || $scope.intro === ''){
                    $scope.showTipPrompt('train_intro', '请填写培训班详细', 'false',true);
                    return false;
                }
                return true;
            }
            //获取当前时间
            function getCurrentTime(date) {

                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                var seconde = date.getSeconds();
                var dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconde;
                return dateStr;
            };
            //时间转换
            function dateFormat(str) {

                return new Date(str + ':00').getTime();

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

        }];


});