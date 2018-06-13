/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-20
 * Time: 下午1:04
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
    'use strict';


    /**
     * showDialog 为控制器中的一个变量控制窗口显示隐藏 //命名随意 多个dialog的话要分开命名 showDialog1 showDialog2
     *
     *      <div dialog class="dialog-container" ng-show="showDialog" width="1000">
     <div class="mask-bg"></div>
     <div class="dialog rd">
     <div class="d-body">
     <div class="tit">确定要取消吗？</div>
     <div class="cont">


     //内容

     </div>

     <div class="d-btn-bar">
     <a href="" class="d-btn-b rd" ng-click="test()">确 定</a>
     <a href="" class="d-btn-g rd">取 消</a>
     </div>
     </div>
     <a href="" class="ico close-1"></a>
     </div>
     </div>

     * @type {Array}
     */
    module.exports = [function () {
        return {
            replace: true,
            restrict: 'A',
            link: function (scope, elem, attr) {
                var dialogBody = elem.find('.dialog ');

                if (attr['width']) {
                    dialogBody.css({width: parseInt(attr['width']) + 'px'});
                }

                var dialogBodyHeight = dialogBody.height(),
                    dialogBodyWidth = dialogBody.width();

                dialogBody.css({ top: '50%', marginTop: '-' + (dialogBodyHeight / 2) + 'px', marginLeft: '-' + (dialogBodyWidth / 2) + 'px' });

                function close() {
                    scope.$apply(function () {
                        scope[attr.ngShow] = false;
                    });
                }

                elem.find('.close-1').on('click', function (e) {
                    close();
                    e.preventDefault();
                });

                elem.find('.d-btn-g').on('click', function (e) {
                    close();
                });
            }
        }
    }]
});