/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-28
 * Time: 上午10:32
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    require('jquery');
    require('wpfDialog');
    var g = {}, process = {}, event = {}, builder = {};
    require('./commons.js');
    g.node = {
        commodityName: $('#commodity_name'),
        toggleIOL: $('#toggle_intro_offline_lesson'),
        collect: $('#collect'),

        commodityImage: $('#commodity_image'),
        timerTime: $('#timer_time'),
        goBusiness: $('#go_business'),
        unLogin: $('#un_login'),
        logon: $('#logon'),
        lessonCount: $('#lesson_count'),
        trainClassLessons: $('#train_class_lessons'),
        trainName: $('#train_name'),
        trainPrice: $('#train_price'),
        trainTeacher: $('#train_teacher'),
        trainStartTime: $('#train_start_time'),
        trainEndTime: $('#train_end_time'),
        trainTotalNumber: $('#train_total_number'),
        trainHadNumber: $('#train_had_number'),
        trainClassify: $('#train_classify'),
        restNumber: $('#rest_number'),
        plus: $('#plus'),
        minus: $('#minus'),
        commentMore: $('#comment_more'),
        comment: $('#comment'),
        comments: $('#comments'),
        registrationRightAway: $('#registration_right_away')

    };

    g.data = {
        trainClassId: null,
        commodityId: null,
        commentPage: {
            pageNo: 1,
            pageSize: 5
        }
    };

    g.config = {
        registrationTimer: null,
        validateTimer: null,
        timerTime: null,
        queryCommodityOne: '/web/mall/mallIndex/$id/queryCommodityOne',
        validateICANbuy: '/web/mall/mallIndex/$id/validateICANbuy',
        validateIAMLogin: '/web/mall/mallIndex/0/validateIAMLogin',
        queryClassLessons: '/web/mall/mallIndex/$id/queryClassLessons',
        queryComment: '/web/mall/mallIndex/$id/queryComment',
        collect: '/web/mall/mallIndex/$id/collect'
    };

    process = {
        init: function () {
            builder.loading();

        },

        registrationHandle: function () {
            window.clearTimeout(g.config.registrationTimer);
            g.config.registrationTimer = window.setTimeout(function () {
                $.get(g.config.validateIAMLogin, function (data) {
                    var forwardUrl = "/public/views/mall/payment.html?" + g.data.commodityId + '-' + $.trim(g.node.plus.prev().val());
                    if (data.results === 'true') {
                        $.get(g.config.validateICANbuy.replace('$id', g.data.commodityId),
                            {toBuyNumber: $.trim(g.node.plus.prev().val())}, function (data) {
                                if (data.results === 'false') {
                                    $.wpfAlert({ msg: data.messages });
                                } else {
                                    window.location.href = forwardUrl;
                                }
                            }, 'json');
                    } else {
                        require.async('../commons/build-login-form', function (loginForm) {
                            loginForm.createLoginDialog(forwardUrl);
                        })
                    }
                }, 'json');
            }, 300);

            // 判断是否登录

            // 判断是否过期

            //判断是否超过剩余名额
        },

        collect: function (id) {
            $.post(g.config.collect.replace('$id', id), function (data) {
                $.wpfAlert({ msg: data.messages });
            }, 'json')
        },

        deCodeUrl: function () {
            var url = window.location.href,
                params = url.substring(url.lastIndexOf('?') + 1, url.length).replace('#', ''),
                commodityId = params.split('-')[0];
            g.data.commodityId = commodityId;
        },

        count: function (who, value) {
            who.val(value);
        },

        startTimeTick: function (toTime) {
            g.config.timerTime = window.setInterval(function () {
                g.node.timerTime.html(process.wpfTimerCountDown(new Date(), toTime));
            }, 1000);
        },

        getRestNumber: function (numb) {
            return $.get(g.config.queryCommodityOne.replace('$id', g.data.commodityId), function (data) {
                if ((data['residueNumber'] - 0) < numb) {
                    require.async('../../lib/validation/lite-validate', function (validate) {
                        validate.showPrompt(g.node.plus.prev(), {
                            content: '报名人数不能大于剩余名额',
                            type: 'error',
                            position: 'topRight',
                            showArrow: true
                        });
                    });
                }
            }, 'json');
        },

        wpfTimerCountDown: function (nowTime, toTime) {
            if (toTime === '' || typeof(toTime) === 'number' || typeof(toTime) === 'undefined') {
                throw Error('结束时间不能为空， 并且不能是数字!');
                return false;
            }

            var toTimeTimestamp = ___getTime().getTime(),
                nowTimeTimestamp = nowTime.getTime(),
                compareTime = toTimeTimestamp - nowTimeTimestamp,

                day = parseInt(compareTime / 1000 / 60 / 60 / 24),
                dayOf = parseInt(day) * 86400000,
                restTimeMillis = parseInt(compareTime - dayOf),
                hour = parseInt(restTimeMillis / 1000 / 60 / 60),
                minutes = parseInt(restTimeMillis / 1000 / 60) - (hour * 60),
                second = (parseInt(restTimeMillis / 1000) - (hour * 60 * 60)) - (minutes * 60);

            function ___getTime() {
                var tempStrs = toTime.split(" "),
                    dateStrs = tempStrs[0].split("-"),
                    year = parseInt(dateStrs[0], 10),
                    month = parseInt(dateStrs[1], 10) - 1,
                    day = parseInt(dateStrs[2], 10),
                    timeStrs = tempStrs[1].split(":"),
                    hour = parseInt(timeStrs[0], 10),
                    minute = parseInt(timeStrs[1], 10),
                    second = parseInt(timeStrs[2], 10),
                    date = new Date(year, month, day, hour, minute, second);
                return date;
            }


            if (day <= 0 && hour <= 0 && minutes <= 0 && second <= 0) {
                window.clearInterval(g.config.timerTime);
                return "<span style='color: red;'>已过期</span>";
            }

            return  '离开讲还有：' + (day <= 0 ? 0 : day) + '天' + (hour <= 0 ? 0 : hour) + '时' +
                (minutes <= 0 ? 0 : minutes) + '分' +
                (second <= 0 ? 0 : second) + '秒';
        }
    };

    builder = {
        loading: function () {
            process.deCodeUrl();

            // 登录
            this.loginIf();

            this.loadCommodityDetail();
//            this.loadComment();
            this.buildNiceScroll_();

            event.listener();
        },

        loginIf: function () {
            $.get(g.config.validateIAMLogin, function (data) {
                if (data.results === 'false') {
                    g.node.unLogin.removeClass('hide').addClass('il-block');
                    g.node.logon.removeClass('il-block').addClass('hide');
                } else {
                    g.node.unLogin.removeClass('il-block').addClass('hide');
                    g.node.logon.removeClass('hide').addClass('il-block');
                }
            }, 'json');
        },
        loadComment: function () {
            $.get(g.config.queryComment.replace('$id', g.data.commodityId), {pageNo: g.data.commentPage.pageNo, pageSize: g.data.commentPage.pageSize}, function (data) {
                g.node.comment.html('评论（' + data.data.totalPageCount + '条）');
                if (data.data.totalPageCount > data.data.currentPageNo) {
                    g.node.commentMore.show();
                } else {
                    g.node.commentMore.hide();
                }
                var html = [];
                $.each(data.data, function (index, item) {
                    html.push(' <div class="ref ref-1"><div class="u-info"><div class="u-img il-block">' +
                        '<span class="img"><img src=' + item.url + 'alt=""></span>' +
                        '<span class="img-mask">   <img src="/public/resources/images/user_img_mask.png" alt=""></span></div>' +
                        '< spanclass= "u-name" >' + item.name + '</span >' +
                        '</div><div class="ref-cont-1">' + item.content + '</div>' +
                        '<span class="time">' + item.createTime + '</span></div>');
                });
                g.node.comments.html(html.join(''));
            }, "json");
        },
        loadCommodityDetail: function () {
            $.get(g.config.queryCommodityOne.replace('$id', g.data.commodityId), function (data) {
                g.node.commodityName.html(data.commodityName);
                g.node.trainName.html(data.trainClassName);
                g.node.trainPrice.html('￥' + data['commodityPrice']);
                g.node.trainTeacher.html(data['lecture']);
                g.node.trainStartTime.html(data.startTime);
                g.node.trainEndTime.html(data.endTime);
                g.node.trainTotalNumber.html(data['headcount']);
                g.node.trainHadNumber.html((data['headcount'] - 0) - (data['residueNumber'] - 0));
                g.node.restNumber.html(data['residueNumber']);
                g.node.trainClassify.html(data['classifyName']);
                g.node.commodityImage.attr('src', data['imageUrl']);
                g.data.trainClassId = data.trainClassId;
                g.node.lessonCount.html(data['lessonCount']);

                $('#intro').html(data['describe']);
                $('#offline_train').html(data['offlineTrainClass']);
                process.startTimeTick(data.endTime);
            }, 'json');
        },

        buildNiceScroll_: function () {
            require.async('nice-scroll', function () {

                var comments = $('#comments'),
                    whos = $('#whos');

                comments.niceScroll({
                    cursorcolor: "#389ED8",
                    cursoropacitymax: 1.6, cursorwidth: 6, horizrailenabled: false,
                    cursorborderradius: 4, autohidemode: true
                });

                whos.niceScroll({
                    cursorcolor: "#389ED8",
                    cursoropacitymax: 1.6, cursorwidth: 6, horizrailenabled: false,
                    cursorborderradius: 4, autohidemode: true
                });
            });
        },

        loadTrainClassLessons: function (who) {
            $.get(g.config.queryClassLessons.replace('$id', g.data.trainClassId), function (data) {
                var html = [];
                $.each(data.data, function (index, item) {
                    var sections = item.sections;

                    html.push('<div class="course-tit" data-action="lessonToggleParent"><span class="ico"></span>' + item.name + '<span class="time"></span></div>');
                    if (sections.length > 0) {
                        html.push('<ul class="ul-course">');

                        $.each(sections, function (secIndex, secItem) {
                            html.push('<li><a href="#"><span class="ico"></span>' + (secIndex + 1) + '丶' + secItem.title + '</a><span class="time"></span></li>');
                        });

                        html.push('</ul>');
                    }
                });
                who.html(html.join(''));
            }, 'json');
        }

    };

    event = {
        listener: function () {
            g.node.registrationRightAway.click(function (e) {
                process.registrationHandle();
                e.preventDefault();
            });

            g.node.collect.click(function (e) {
                if (g.data.commodityId) {
                    process.collect(g.data.commodityId);
                }
                e.preventDefault();
            });

            g.node.toggleIOL.click(function (e) {
                var $this = $(e.target),
                    cloA = $this.closest('a[data-action]');

                if (cloA.length > 0) {
                    cloA.addClass('current').siblings().removeClass('current');
                    var who = $('#' + cloA.data().action);

                    who.show().siblings().hide();

                    if (cloA.data().action === 'train_class_lessons') {
                        if (who.find('img[data-action="loading"]').length > 0) {
                            builder.loadTrainClassLessons(who);
                        }
                    }
                }

                e.preventDefault();
            });

            g.node.minus.click(function (e) {
                var $this = $(e.target),
                    next = $this.next(),
                    val = parseInt(next.val());
                if (val - 1 <= 0) {
                    return false;
                }
                next.val(--val);

                e.preventDefault();
            });

            g.node.plus.click(function (e) {
                var $this = $(e.target),
                    prev = $this.prev(),
                    val = parseInt(prev.val());
//                if(val - 1 <= 0) {
//                    return false;
//                }
                prev.val(++val);

                window.clearTimeout(g.config.validateTimer);
                g.config.validateTimer = window.setTimeout(function () {
                    process.getRestNumber(val);
                }, 300);
                e.preventDefault();
            });

            g.node.trainClassLessons.click(function (e) {
                var $this = $(e.target),
                    data = $this.data(),
                    closeDiv = $this.closest('div[data-action="lessonToggleParent"]')

                if (closeDiv.length > 0) {
                    var myNext = closeDiv.next('ul');
                    if (myNext.length > 0) {
                        if (myNext.is(':visible')) {
                            myNext.slideUp();
                        } else {
                            myNext.slideDown();
                        }
                    }
                }

            });
        }
    };

    process.init();
});