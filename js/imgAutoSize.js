/**
 * Created by Allen on 2019/3/8.
 */
define ( [], function () {
    "use strict";
    /**
     * 图片自动调整比例指令--->依赖jquery
     * 用法：<div img-auto-size box-width='200' box-height='200' img-model='model'><img class='autoImgSize'/></div>
     * 指令作用在img标签外层的容器上
     * img-model为图片src的model(必须)
     * img标签设置class为autoImgSize(必须)
     * box-width为容器的宽度 box-height为容器的高度(非必需)
     */
    return ['$timeout',function($timeout){
        return {
            link:function($scope,ele,attrs){
                $timeout(function(){
                    var defaultImg = attrs.defaultImg || '@systemUrl@/images/image_container.png',
                        boxDom = $(ele),
                        imgDom = $(ele).find('.autoImgSize'),
                        maxWidth = attrs.boxWidth || 420,
                        maxHeight = attrs.boxWidth || 200,
                        imgSrc = imgDom.attr('src');
                    if(!imgSrc){
                        return false;
                    }
                    $scope.$watch('imgModel',function(nv){
                        if(nv){
                            var src = /^\/mfs/.test(imgSrc)?imgSrc.replace('/mfs',''):imgSrc;
                            if(src!==defaultImg){
                                boxDom.css({
                                    background:"url('@systemUrl@/images/blankBg.png')",
                                    display:'block',
                                    width:maxWidth+'px',
                                    height:maxHeight+'px',
                                    position:'relative'
                                })
                                imgDom.css({
                                    position:'absolute',
                                    left:0,
                                    top:0,
                                    right:0,
                                    bottom:0,
                                    margin:'auto'
                                })
                                AutoSize(imgDom,maxWidth,maxHeight)
                            }
                        } else {
                            boxDom.css({})
                            imgDom.css({})
                        }
                    })
                })

                function AutoSize(Img, maxWidth, maxHeight) {
                    var image = new Image();
                    //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
                    image.onload=function(){
                        // 当图片比图片框小时不做任何改变
                        if (image.width < maxWidth&& image.height < maxHeight) {
                            Img.attr('width',image.width)
                            Img.attr('height',image.height)
                        }
                        else //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
                        {
                            if (maxWidth/ maxHeight  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
                            {
                                // Img.width = maxWidth;   //以框的宽度为标准
                                // Img.height = maxWidth* (image.height / image.width);
                                Img.attr('width',maxWidth)
                                Img.attr('height',maxWidth* (image.height / image.width))
                            }
                            else {   //原图片宽高比例 小于 图片框宽高比例

                                Img.attr('width',maxHeight  * (image.width / image.height))
                                Img.attr('height',maxHeight)
                            }
                        }
                    }
                    image.src = Img.attr('src');
                }
                // var img = AutoSize(document.getElementById('img'),800,400);
            },
            scope:{
                imgModel:'=?'
            }
        }
    }];
} );
