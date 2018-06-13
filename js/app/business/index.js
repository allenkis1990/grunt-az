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

    require('jquery');
    g.node = {
        toggleMenu: $('#toggle_menu'),
        contentContainer: $('#content_container')
    };
    g.config = {
        dialogId: null
    }
    process = {
        init: function () {
            builder.loading();

            process.redirect('learned-lesson.html');
        },

        toggleMenu: function(left) {
            left = (left === 0 ?
                -200
                : 0 );

            var containerLeft = left === 0 ? 300 : 0;

            if(containerLeft > 0) {
                $('#mask').show();
                $(document.body).css({overflow: 'hidden'});
            } else {
                $('#mask').hide();
                $(document.body).css({overflow: 'auto'});
            }
            g.node.contentContainer.stop().animate({
                marginLeft: containerLeft + 'px' } , function() {

            });

            g.node.toggleMenu.stop().animate({ left: left + 'px' });
        },

        redirect: function(where) {
            var ml = parseInt(g.node.contentContainer.css('marginLeft'));
            $.get('./' + where, function(data) {
                g.node.contentContainer.css({marginLeft: (ml + 30) + 'px'}).stop().animate({
                    marginLeft: ml + 0
                }).html(data).find('.img-hover')

                if($('#person_center').length <= 0) {
                    g.node.contentContainer.find('.img-hover').css({left: '-230px'});
                }
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

            _desc = $this.closest('li').find(".img-hover").stop(true);


            rect[cursorLeft] = function (epos){ //鼠从标左侧进入和离开事件
                spos = {"left": '-230px', "top": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从左侧离开
                }else{
                    _desc.css(spos).animate(epos, "fast");
//                            _desc.css(spos).animate(epos, "fast"); //从左侧进入
                }
            };

            rect[cursorTop] = function (epos) { //鼠从标上边界进入和离开事件
                spos = {"top": '-230px', "left": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从上面离开
                }else{
                    _desc.css(spos).animate(epos, "fast"); //从上面进入
                }
            };

            rect[cursorRight] = function (epos){ //鼠从标右侧进入和离开事件
                spos = {"left": '230px',"top": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从右侧成离开
                }else{
                    _desc.css(spos).animate(epos, "fast");
//                            _desc.css(spos).animate(epos, "fast"); //从右侧进入
                }
            };

            rect[cursorBottom] = function (epos){ //鼠从标下边界进入和离开事件
                spos = {"top": '230px', "left": 0};
                if(_out){
                    _desc.animate(spos, "fast"); //从底部离开
                }else{
                    _desc.css(spos).animate(epos, "fast");
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
            var trainClassNav = $('#train_class_nav'),
                back = $('#back'),
                trainClassSearch = $('#train_class_search'),
                personOperation = $('#percent_operation'),
                lessonDetail = $('#lesson_detail'),
                lessonDetailPage = $('#lesson_detail_page');

            $('#train_class_list > li').hover(function(e) {
                process.flowMagicOver(e);
            }).click(function(e) {
                    if($(e.target).closest('.img-hover').length > 0) {
                        process.redirect('my-train-class-detail.html');
                    }
                });

            if(back.length > 0) {
                $('#back').click(function() {
                    process.redirect('my-train-class.html');
                });
            }

            if(trainClassNav.length > 0); {
                trainClassNav.click(function(e) {
                    if(e.target.tagName.toLowerCase() === 'a') {
                        var $this = $(e.target),
                            data = $this.data();
                        if (data.action === 'all') {

                        } else if(data.action === 'learning') {

                        } else if(data.action === 'cannotLearn') {

                        } else if(data.action === 'studyHistory') {

                        }
                        $this.addClass('current').siblings().removeClass('current');
                    }
                });
            }

            if(personOperation.length > 0) {
                personOperation.click(function(e) {
                    var $this = $(e.target);

                    if($this.hasClass('buy')) {
                        window.location.href = './pay.html';
                    }
                })
            }

            if(trainClassSearch.length > 0) {
                trainClassSearch.click(function(e) {
                    var $this = $(e.target);
                    if($this.hasClass('.button-sch')) {
                        console.log('搜索');
                    } else if($this.hasClass('sch-icon-1') || $this.hasClass('sch-icon')) {
                        var schCon = trainClassSearch.find('.sch-cont');
                        if(schCon.height() === 0) {
                            schCon.css({overflow: 'hidden'}).stop().animate({padding: 15 + 'px',height: '35px'}, function() {
                                $this.removeClass('sch-icon').addClass('sch-icon-1')
                            });
                        } else {
                            schCon.css({overflow: 'hidden'}).stop().animate({padding: 0,height: 0}, function() {
                                $this.removeClass('sch-icon-1').addClass('sch-icon')
                            });
                        }
                    }
                });
            }

            if(lessonDetail.length > 0) {
                lessonDetail.click(function(e) {
                    var $this = $(e.target);
                    if($this.hasClass('tr-detail')) {
                        g.config.dialogId = 'lesson_detail_dialog_id_' + new Date().getTime();
                        $.get('./lesson-detail.html', function(data) {
                            $(document.body).append('<div id="' + g.config.dialogId + '" style="position: fixed;width: 100%;height: 100%;top: 0;z-index: 10000000"><div style="position: fixed;top: 0; background: black;opacity: 0.5;filter: alpha(opacity=50);width: 100%;height: 100%;"></div>' + data +  '</div>');
                        }, 'text').done(function() {
                                $('#lesson_detail_page').click(function(e) {
                                    var $this = $(e.target);
                                    if($this.hasClass('close')) {
                                        $('#' + g.config.dialogId).remove();
                                    } else if($this.hasClass('prev')) {

                                    } else if($this.hasClass('next')) {

                                    }
                                })
                            });

                    }
                })
            }
        },


        listener: function () {

            $('#mask').click(function(e) {
                   process.toggleMenu(g.node.toggleMenu.position().left);
            });

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
                                where = 'my-lessons.html';
                                break;
                            case 'findLessons':
                                where = 'my-lessons.html';
                                break;
                            case 'myStudyPlan':
                                where = 'my-lessons.html';
                                break;
                            case 'goBaoban':
                                where = 'my-lessons.html';
                                break;
                            case 'myTesting':
                                where = 'my-lessons.html';
                                break;
                            case 'messageCenter':
                                where = 'my-lessons.html';
                                break;
                            case 'personCenter':
                                where = 'person-center.html';
                                break;
                            case 'setting':
                                where = 'my-lessons.html';
                                break;
                            case 'exchangeCode':
                                where = 'person-center-exchange-code.html';
                                break;
                            case 'examCenter':
                                where = 'my-lessons.html';
                                break;
                            case 'exit':
                                window.close();
                                break;
                        }
                        process.redirect(where);
                    });
                    process.toggleMenu(g.node.toggleMenu.position().left);
                }
            });
        }
    };
    process.init();
});