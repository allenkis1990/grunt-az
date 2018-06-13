/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-15
 * Time: 上午11:24
 * To change this template use File | Settings | File Templates.
 */


define(function (require, exports, module) {
    'use strict';
    require('jquery');
    module.exports = [function() {
        var directiveDefinitionObject = {
            link: function(scope, elem, attr) {
                var data = $(elem).data(),
                    menuButton = $(elem).find('a[data-action="menuButton"]');
                menuButton.click(function(e) {
                    var $this = $(elem).css({zIndex: 100}),
                        left = Math.abs($this.position().left),
                        mainContainer = $('#container'),
                        body = $(document.body),
                        id = 'mask___over';

                    $this.stop().animate({left: (left - 200) + 'px'});
                    if(mainContainer.length > 0) {
                        mainContainer.stop().animate({ marginLeft: left + 'px' });
                    }
                    if(left === 0) {
                        body.css({overflow: 'auto'});
                        $('#mask___over').remove();
                    } else {
                        body.css({overflow: 'hidden'}).append('<div id="' + id + '" style="position: fixed;width: 100%;height: 100%;left: 0;top:0;background: black;' +
                            'opacity: 0.5; filter: alpha(opacity=50);z-index: 99;"></div>');
                    }

                    e.preventDefault();
                });
            }
        };
        return directiveDefinitionObject;
    }]
});