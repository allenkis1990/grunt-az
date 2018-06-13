/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-16
 * Time: 下午12:43
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    var g = {}, process = {}, event = {}, builder = {};

    g.node = {
        toggleMenu: $('#toggle_menu'),
        contentContainer: $('#content_container')
    };
    process = {
        init: function () {
            builder.loading();

            process.redirect('learned-lesson.html');
        },

        toggleMenu: function(left) {
            left = (left === 0 ?
                -200
                : 0 );
            g.node.toggleMenu.stop().animate({ left: left + 'px' });
        },

        redirect: function(where) {
            $.get('./' + where, function(data) {
                g.node.contentContainer.css({marginLeft: '30px'}).stop().animate({
                    marginLeft: 0
                }).html(data);
            }, 'text').done(function() {
                    event.delayBind();
                });
        },
        flowMagicOver: function(e) {
            var $this = $(e.target),
                _desc,
                width = $this.width(),
                height = $this.height(),
                cursorLeft = e.offsetX === undefined ? getOffset(e).X : e.offsetX,
                cursorTop = e.offsetY === undefined ? getOffset(e).Y : e.offsetY,
                cursorRight = width - cursorLeft,
                cursorBottom = height - cursorTop,
                _min   = Math.min(cursorLeft, cursorTop, cursorRight, cursorBottom),
                _out = e.type === 'mouseleave',
                rect = {},
                spos = {};

            function getOffset(e){
                var target = e.target, // 当前触发的目标对象
                    eventCord,
                    pageCord,
                    offsetCord;

                // 计算当前触发元素到文档的距离
                pageCord = getPageCord(target);

                // 计算光标到文档的距离
                eventCord = {
                    X : window.pageXOffset + e.clientX,
                    Y : window.pageYOffset + e.clientY
                };

                // 相减获取光标到第一个定位的父元素的坐标
                offsetCord = {
                    X : eventCord.X - pageCord.x,
                    Y : eventCord.Y - pageCord.y
                };
                return offsetCord;
            }

            function getPageCord(element)
            {
                var cord = {x: 0, y: 0};
                while (element)
                {
                    cord.x += element.offsetLeft;
                    cord.y += element.offsetTop;
                    element = element.offsetParent;
                }
                return cord;
            }

            _desc = $this.closest('li').find(".adv-hover").stop(true);

            rect[cursorLeft] = function (epos){ //鼠从标左侧进入和离开事件
                spos = {"left": '-300px', "top": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从左侧离开
                }else{
                    _desc.css(spos).animate(epos, "fast").find('span').css({
                        paddingLeft: '110px'
                    }).animate({
                            paddingLeft: '85px'
                        });
//                            _desc.css(spos).animate(epos, "fast"); //从左侧进入
                }
            };

            rect[cursorTop] = function (epos) { //鼠从标上边界进入和离开事件
                spos = {"top": '-100px', "left": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从上面离开
                }else{
                    _desc.css(spos).animate(epos, "fast").find('span').css({
                        paddingLeft: '110px'
                    }).animate({
                            paddingLeft: '85px'
                        }); //从上面进入
                }
            };

            rect[cursorRight] = function (epos){ //鼠从标右侧进入和离开事件
                spos = {"left": '300px',"top": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从右侧成离开
                }else{
                    _desc.css(spos).animate(epos, "fast").find('span').css({
                        paddingLeft: '110px'
                    }).animate({
                            paddingLeft: '85px'
                        });
//                            _desc.css(spos).animate(epos, "fast"); //从右侧进入
                }
            };

            rect[cursorBottom] = function (epos){ //鼠从标下边界进入和离开事件
                spos = {"top": 100 + 'px', "left": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从底部离开
                }else{
                    _desc.css(spos).animate(epos, "fast").find('span').css({
                        paddingLeft: '110px'
                    }).animate({ paddingLeft: '85px' });
//                            _desc.css(spos).animate(epos, "fast"); //从底部进入
                }
            };

            // firefox 下面执为NAN
            rect[_min]({"left":0, "top":0}); // 执行对应边界 进入/离开 的方法
        }
    };

    builder = {
        loading: function () {
            event.listener();
        }
    };

    event = {

        delayBind: function() {

        },

        listener: function () {
            g.node.toggleMenu.click(function(e) {
                var
                    $this = $(e.target);
                if($this.closest('.s-icon').length > 0) {
                    var left = g.node.toggleMenu.position().left;
                    process.toggleMenu(left);
                    return false;
                } else if($this.closest('.ul-sidebar').length > 0) {
                    var innerA = $this.closest('a'),
                        action = innerA.data().action;

                    e.preventDefault();

                    $('html, body').stop().animate({scrollTop: 0}, function() {
                        innerA.addClass('current').parent().siblings().find('a').removeClass('current');
                        var where = '';
                        switch(action) {
                            case 'index':
                                where = 'learned-lesson.html';
                                break;
                            case 'myTrainClass':
                                where = 'my-train-class.html';
                                break;
                            case 'myLessons':
                                window.location.href = '/html/show/business/my-lessons.html';
                                break;
                            case 'findLessons':
                                window.location.href = '/html/show/business/find-lessons.html';
                                break;
                            case 'myStudyPlan':
                                window.location.href = '/html/show/business/my-study-plan.html';
                                break;
                            case 'goBaoban':
                                window.location.href = '/html/show/business/go-bao-ban.html';
                                break;
                            case 'myTesting':
                                window.location.href = '/html/show/business/my-testing.html';
                                break;
                            case 'messageCenter':
                                window.location.href = '/html/show/business/message-center.html';
                                break;
                            case 'personCenter':
                                window.location.href = '/html/show/business/person-center.html';
                                break;
                            case 'setting':
                                window.location.href = '/html/show/business/setting.html';
                                break;
                            case 'exchangeCode':
                                window.location.href = '/html/show/business/exchange-code.html';
                                break;
                            case 'examCenter':
                                window.location.href = '/html/show/business/exam-center.html';
                                break;
                            case 'exit':
                                window.location.href = '/html/show/business/exit.html';
                                break;
                        }

                        process.redirect(where);
                    });

                }
            });
        }
    };
    process.init();
});