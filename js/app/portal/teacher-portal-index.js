/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-13
 * Time: 上午9:51
 * To change this template use File | Settings | File Templates.
 */
define(function(require){
    'use strict';
    require('jquery');
    require('wpfScroll');
    var g = {}, process = {}, event = {},
        builder = {};

    g.node = {
        help: $('#help'),
        scrollImage: $('#scroll_image'),
        messageContent: $('#messages_content'),
        lessonList: $('#lesson_list'),
        btnRegister: $('#btn_register'),
        btnLogin: $('#btn_login')
    };

    process = {
        init: function() {
            g.node.scrollImage.wpfScroll();
            builder.loading();
        }
    };

    builder = {
        loading: function() {
            event.listener();

            builder.__messageContentBuild($(window).scrollTop());

        },
        __messageContentBuild: function(winTop) {
            var winHeight = $(window).height(),
                messageContent = g.node.messageContent,
                winTop_height = winTop + winHeight,
                messageContentTop = messageContent.offset().top;

            if(winTop_height >= messageContentTop) {
                 require.async('nice-scroll', function() {
                     messageContent.niceScroll({
                         cursorcolor: "#389ED8",
                         cursoropacitymax: 1.6, cursorwidth: 6, horizrailenabled: false,
                         cursorborderradius: 0, autohidemode: true
                     });
                     var niceScroll = messageContent.getNiceScroll();

                     var scrollContainer = $('#' + niceScroll[0].id),
                         scrollContainerBar = scrollContainer.find('div');
                 });
            }
        },

        __helpBuild: function(winTop) {
            var help = g.node.help,
                show = help.attr('data-show');

            if(winTop > 340 && show === 'hide') {
                help.stop().animate({ right: '1%' }).attr('data-show', 'show');
            } else if(winTop <= 340 && show === 'show') {
                help.stop().animate({ right: '-165px' }).attr('data-show', 'hide');
            }

        }
    };

    event = {
        listener: function() {

            if($(window).scrollTop() > 340) {
                g.node.help.css({right: '-165px'}).stop().animate({right: '1%'});
            }

            g.node.help.click(function(e) {
                var $this = $(e.target),
                    data = $this.data();

                if(data.action) {
                    switch(data.action) {
                        case 'moreTrainClass':
                            window.location.href= './train-class-show.html';
                            break;
                        case 'scrollToTop':
                            $('html,body').stop().animate({ scrollTop: 0 });
                            break;
                        case 'closeHelp':
                            g.node.help.stop().animate({right: '-165px'}).attr('data-show', 'hide');
                            e.preventDefault();
                            break;
                    }

                }
                return false;
            });

            $(window).scroll(function(e) {
                var top = $(e.target).scrollTop();

                builder.__messageContentBuild(top);

                builder.__helpBuild(top);
            });

            g.node.btnLogin.click( function() {
//                return false;
            });
            g.node.btnRegister.click(function() {
//               return false;
            });

            g.node.lessonList.click(function(e) {
                var $this = $(e.target);
                if(e.target.tagName.toLowerCase() === 'img') {
                    if($this.data().action === 'showLesson') {
                        window.open('http://hongjing.hxlearning.com/web/student/playLesson/27120/enter?lessonPlayId=5580&lessonType=0&playMode=0&sectionId=5329');
                    }
                }
            })
        }
    };
    process.init();
});
