/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-27
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    var g = {}, process = {}, event = {}, builder = {};

    require('jquery-ajax-form');
    module.exports = {

        registerUploadWidget: function (mod) {
            mod.directive('uploadWidget', [function () {
                return {
                    template: function () {
                        var html = [];
                        html.push('<form method="post" enctype="multipart/form-data" action="">');
                        html.push('<input name="imageUp" id="imageUp" type="file"/>');
                        html.push('</form>');
                        return html.join(' ');
                    },
                    restrict: 'E',
                    replace: true,
                    link: function (scope, elem, attr) {
                        function validateImage(img) {
                            var tmpFileValue = img.value;

                            //校验图片格式
                            if (/^.*?\.(gif|png|jpg|jpeg|bmp)$/.test(tmpFileValue.toLowerCase())) {
                                return true;
                            } else {
                                tmpFileValue = "";
                                alert("只能上传jpg、jpeg、png、bmp或gif格式的图片！");
                                return false;
                            }

                            if (tmpFileValue != "") {
                                return true;
                            } else {
                                alert("请选择上传的文件!");
                                return false;
                            }
                        }
                        function validateFile(file,data){
                            var tmpFileValue = file.value;
                            console.log(tmpFileValue)
                            if(data==='1'){
                                //校验SCORM标准的课件
                                if (/^.*?\.(zip)$/.test(tmpFileValue.toLowerCase())) {
                                    return true;
                                } else {
                                    tmpFileValue = "";
                                    alert("只能上传zip格式的SCORM标准的课件！");
                                    return false;
                                }

                                if (tmpFileValue != "") {
                                    return true;
                                } else {
                                    alert("请选择上传的文件!");
                                    return false;
                                }
                            }else if(data==='2'){
                                //校验文档课程
                                if (/^.*?\.(doc|docs|pdf)$/.test(tmpFileValue.toLowerCase())) {
                                    return true;
                                } else {
                                    tmpFileValue = "";
                                    alert("只能上传doc、docs、pdf格式的文档课程！");
                                    return false;
                                }

                                if (tmpFileValue != "") {
                                    return true;
                                } else {
                                    alert("请选择上传的文件!");
                                    return false;
                                }
                            }else if(data==='3'){
                                //校验视频课程
                                if (/^.*?\.(flv|mp4|wmv)$/.test(tmpFileValue.toLowerCase())) {
                                    return true;
                                } else {
                                    tmpFileValue = "";
                                    alert("只能上传flv、mp4、wmv格式的视频课程！");
                                    return false;
                                }
                                if (tmpFileValue != "") {
                                    return true;
                                } else {
                                    alert("请选择上传的文件!");
                                    return false;
                                }
                            }
                        }
                        var el = $(elem);
                        el.ajaxForm({
                            beforeSend: function () {
                                if (attr['beforesend']) {
                                    scope[attr['beforesend']]();
                                }
                            },
                            uploadProgress: function (event, position, total, percentComplete) {
                                if (attr['uploadprogress']) {
                                    scope[attr['uploadprogress']](event, position, total, percentComplete);
                                }
                            },
                            success: function () {
                                if (attr['success']) {
                                    scope[attr['success']]();
                                }
                            },
                            complete: function (xhr) {
                                scope.$apply(function () {
                                    if (xhr) {
                                        if(attr.field) {
                                            scope[attr.field] = JSON.parse(xhr.responseText);
                                        } else {
                                            scope.uploadFile = JSON.parse(xhr.responseText);
                                        }
                                    }
                                });

                                if (attr['complete']) {
                                    scope[attr['complete']]();
                                }
                            }
                        });

                        var url = teacherInfo__.fileUploadUrl;
                        if (attr['width'] && attr['height']) {
                            url += '&needOperate[{width: ' + attr['width'] + ', height: ' + attr['height'] + ', type: "scale"}]'
                        }

                        if(attr['sync']) {
                            url += '&uploadSync=true';
                        } else {
                            url += '&uploadSync=false';
                        }

                        $(elem).attr('action', url);

                        elem.on('change', function (e) {
                            if (e.target.type === 'file') {

                                var result = false;
                                // 属性上面有定义image的要验证image的格式是否正确;
                                if (attr['image'] === 'yes') {
                                    result = validateImage(e.target);
                                } else if(attr['any'] === 'yes') {
                                    result = validateFile(e.target,attr['file']);
                                }

                                if (result) {
                                    $(elem).submit();
                                }

                            }
                        })
                    }
                }
            }]);
        }

    }

});