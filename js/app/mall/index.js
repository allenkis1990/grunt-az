/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-25
 * Time: 下午2:57
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    require('wpfScroll');
    var g = {}, process = {}, event = {}, builder = {};


    require('wpfDialog');
    require('./commons');

    g.node = {
        scrollImage: $('#scroll_image'),
        honors: $('#honors'),
        goodAt: $('#good_at'),
        messageContent: $('#message_content'),
        servedCompany: $('#served_company'),
        menuButton: $('#side_menu')
    };

    g.config = {
        shown: {},
        queryFourLessonsUrl: '/web/mall/mallIndex/0/queryFourLessons',
        queryLectureRecordUrl: '/web/mall/mallIndex/0/queryLectureRecord',
        queryUserHonorsUrl: '/web/mall/mallIndex/0/queryUserHonors',
        servedCompanyImagesUrl: [
            '/public/resources/images/c_logo_11.png',// 1
            '/public/resources/images/c_logo_1.png', // 2
            '/public/resources/images/c_logo_2.png', // 3
            '/public/resources/images/c_logo_3.png', // 4
            '/public/resources/images/c_logo_4.png', // 5
            '/public/resources/images/c_logo_5.png', // 6
            '/public/resources/images/c_logo_6.png', // 7
            '/public/resources/images/c_logo_7.png'  // 8
        ]
    };

    process = {
        init: function () {
            builder.loading();
        },

        isVisible: function (target) {
            if (!g.config.shown.hasOwnProperty(target.attr('id'))) {
                var top = $(window).scrollTop(),
                    $window = $(window),
                    windowHeight = $window.height(),
                    windowTop_height = top + windowHeight,
                    targetTop = target.offset().top;

                if (windowTop_height > targetTop) {
                    g.config.shown[target.attr('id')] = true;
                    return true;
                }
            }
        }

    };

    builder = {
        loading: function () {
            event.listener();

            //this.initImageScrollBanner();

            this.loadFourLessons();

            this.loadServedCompany();

            this.loadUserHonors();

            this.initMessageContentScroll();
        },

        initImageScrollBanner: function () {
            g.node.scrollImage.wpfScroll();
        },

//        fillServedCompany: function () {
//            if (process.isVisible(g.node.servedCompany)) {
//                var logosCon = g.node.servedCompany.find('.c-logo');
//                $.each(logosCon, function (index, item) {
//                    var img = $(item).find('img');
//                    img.attr('src', g.config.servedCompanyImagesUrl[index]);
//                });
//            }
//        },

        initMessageContentScroll: function () {
            if (process.isVisible(g.node.messageContent)) {
                require.async('nice-scroll', function () {
                    var main = g.node.messageContent.find('.reflection');
                    main.niceScroll({
                        cursorcolor: "#389ED8",
                        cursoropacitymax: 1.6, cursorwidth: 6, horizrailenabled: false,
                        cursorborderradius: 4, autohidemode: true
                    });
                });
            }
        },

        loadFourLessons: function () {
            if (process.isVisible(g.node.goodAt)) {



                $.get('/public/datas/lessons.json', function(data) {
                    var html = [];
                    $.each(data.data, function (index, item) {
                        var name = item['name'],
                            cover = item['cover'],
                            playUrl = item['playUrl'];

                        html.push('<div class="course">');
                        html.push('<div class="img">');
                        html.push('<img data-action="playLesson" data-play-url="' + playUrl + '" src="' + cover + '" alt="">');
                        html.push('</div>');
                        html.push('<span class="course-tit text-overflow">' + name + '</span>');
                        html.push('</div>');

                    });
                    g.node.goodAt.find('.courses').html(html.join(''));
                }, 'json');
//
//
//                $.get(g.config.queryFourLessonsUrl, function (data) {
//                    var html = [];
//                    $.each(data.data, function (index, item) {
//                        var name = item.name,
//                            id = item.id,
//                            originId = item['originId'],
//                            author = item['author'],
//                            imgUrl = item['imgUrl'] || '/public/resources/images/slImage/lesson_' + (index + 1) + '.jpg';
//
////                http://www.hxlearning.com/web/portal/playLesson/69176/forward2Check?lessonPlayId=69176&lessonType=2887&playMode=0
//                        html.push('<div class="course">');
//                        html.push('<div class="img">');
//                        html.push('<img data-origin-id="' + originId + '" data-lesson-id="' + id + '" src="' + imgUrl + '" alt="">');
//                        html.push('</div>');
//                        html.push('<span class="course-tit text-overflow">' + name + '</span>');
//                        html.push('</div>');
//
//                    });
//                    g.node.goodAt.find('.courses').html(html.join(''));
//                }, 'json');
            }
        },

        loadServedCompany: function () {
            if (process.isVisible(g.node.servedCompany)) {


                $.get(g.config.queryLectureRecordUrl, function (data) {


                    if(data.data.length <= 0) {
                        var logosCon = g.node.servedCompany.find('.c-logo');
                        $.each(logosCon, function (index, item) {
                            var img = $(item).find('img');
                            img.attr('src', g.config.servedCompanyImagesUrl[index]);
                        });
                    }

                }, 'json')


            }
        },

        loadUserHonors: function () {
            if (process.isVisible(g.node.honors)) {


                $.get(g.config.queryUserHonorsUrl, function (data) {
//                    console.log(data);
                }, 'json')


            }
        },

        formatString: function (args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof (args) == "object") {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            var reg = new RegExp("({)" + i + "(})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        }

    };

    event = {
        listener: function () {
            $(window).scroll(function (e) {

                builder.loadFourLessons();

                builder.loadServedCompany();

                builder.loadUserHonors();

                builder.initMessageContentScroll();
            });



            g.node.goodAt.find('.courses').click(function(e) {
                var $this = $(e.target),
                    data = $this.data();
                if(data.action) {
                    if(data.action === 'playLesson') {
                        var playUrl = data['playUrl'];
                        window.open(playUrl);
                    }
                }
            } );
        }
    };

    process.init();
});