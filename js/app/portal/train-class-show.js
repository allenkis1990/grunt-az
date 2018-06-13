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
//   var ve = require('../../lib/validation/lite-validate');

    var g = {}, process = {}, event = {},
        builder = {};

    g.node = {
        moreComments: $('#more_comments'),
        plus: $('#plus'), minus: $('#minus'), // 增加减少数量
        detailNav: $('#detail_nav'),
        registration: $('#registration'),
        trainClassLesson: $('div[data-rel="trainClassLesson"]')
    };

    process = {
        init: function() {
            builder.loading();
        },
        /**
         * minus 减少数量
         * @param e
         */
        m: function(e) {
            var $this = $(e.target),
                input = $this.next().find('input'),
                value = input.val() - 0;
            input.val((-- value) <= 1 ? 1 : (-- value));
        },

        /**
         * plus 增加数量
         * @param e
         */
        p: function(e) {
            var $this = $(e.target),
                input = $this.prev().find('input'),
                value = input.val() - 0;
            input.val(++ value);
        }
    };

    builder = {
        loading: function() {
            event.listener();
        },

        __buildDialog: function() {
            require.async('../commons/build-login-form', function(method) {
                method.createLoginDialog();
            });
        }
    };

    event = {
        listener: function() {
            g.node.detailNav.click(function(e) {
                var $this = $(e.target).closest('a'),
                    data = $this.data(),
                    action;
                if(data.action) {
                    action = data.action;
                    $this.addClass('current').siblings().removeClass('current');
                    $this.parent().siblings('div[data-rel="' + action + '"]').removeClass('hide')
                        .css({marginTop: '50px'})
                        .stop().animate({marginTop: '20px'})
                        .siblings().not('#detail_nav').addClass('hide');
                }
                return false;
            });

            g.node.registration.click(function(e) {
                 builder.__buildDialog();
                return false;
            });

            g.node.plus.click(function(e) {
                process.p(e);
                return false;
            });
            g.node.minus.click(function(e) {
                process.m(e);
                return false;
            });

            g.node.moreComments.click(function(e) {

            })

            g.node.trainClassLesson.click(function(e) {
                var $this = $(e.target),
                    className = e.target.className,
                    tagName = e.target.tagName.toLowerCase();

                if('course-tit' === className) {
                    $this.next().is(':visible') ? $this.next().slideUp() : $this.next().slideDown();
                } else if(tagName === 'a' || tagName === 'span' && $(e.target).closest('li').length > 0) {
                    console.log(tagName);
                    window.open('http://hongjing.hxlearning.com/web/student/playLesson/27120/enter?lessonPlayId=5580&lessonType=0&playMode=0&sectionId=5329');
                }
                return false;
            });
        }
    };
    process.init();
});
