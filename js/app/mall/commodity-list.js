/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-30
 * Time: 上午9:40
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    var g = {}, process = {}, event = {}, builder = {};

    require('jquery');
    require('wpfScroll');
    require('./commons');
    require('wpfDialog');
    g.config = {

        searchTimer: null,
        showTimer: null,
        validateIAMLogin: '/web/mall/mallIndex/0/validateIAMLogin',
        validateICANbuy: '/web/mall/mallIndex/$id/validateICANbuy',
        queryCommodityTypes: '/web/mall/mallIndex/0/queryCommodityTypeList',
        queryTrainClassPage: '/web/mall/mallIndex/0/queryCommodityPage',
        loadCollegeLesson: '/web/mall/mallIndex/0/loadCollegeFiveLesson'
    };

    g.data = {

        searchKeyWord: null,
        sortKey: 'id',
        sortDirection: 'desc',
        pageIndex: 0,
        pageSize: 10
    };

    g.node = {
        logon: $('#logon'),
        unLogin: $('#un_login'),
        goBusiness: $('#go_business'),
        changeType: $('a[data-action="changeType"]'),
        classify: $('#classify'),
        timerTime: $('#timer_time'),
        scrollImage: $('#scroll_image'),
        searchContent: $('#search_content'),
        trainClassOp: $('#train_class_operator'),
        templateTrainClass: $('#template_train_class'),
        trainClassContainer: $('#train_class_container'),
        trainCommodityList: $('#train_commodity_list'),
        newestLesson:$('#newest_lesson')
    };

    process = {
        init: function () {
            builder.loading();
        },

        toggle: function(who, sortKey) {
            var span = who.find('span'),
                sortDirection = 'desc';
            if(span.hasClass('ico-up')) {
                sortDirection = 'desc';
                span.removeClass('ico-up').addClass('ico-down');
            } else {
                sortDirection = 'asc';
                span.removeClass('ico-down').addClass('ico-up');
            }
            g.data.sortKey = sortKey;
            g.data.sortDirection = sortDirection;

            process.search();
        },

        changeType: function() {
//            console.log('changeType');
        },

        sortPrice: function(who) {
            this.toggle(who, 'price');
        },

        sortTime: function(who) {
            this.toggle(who, 'createTime');
        },

        goDetail: function(who) {

            var commodityId = who.data().id;
            window.location.href = '/public/views/mall/commodity-detail.html?' + commodityId ;
        },

        goRegistration: function(who) {
            var commodityId = who.data().id;
            window.clearTimeout(g.config.registrationTimer);
            g.config.registrationTimer = window.setTimeout(function() {
                $.get(g.config.validateIAMLogin, function(data) {
                    var forwardUrl = "/public/views/mall/payment.html?" + commodityId + '-1';
                    if(data.results === 'true') {
                        $.get(g.config.validateICANbuy.replace('$id', commodityId),
                            {toBuyNumber: 1}, function(data) {
                                if(data.results === 'false') {
                                    $.wpfAlert({ msg: data.messages });
                                } else {
                                    window.location.href = forwardUrl;
                                }
                            }, 'json');
                    } else {
                        require.async('../commons/build-login-form', function(loginForm) {
                            loginForm.createLoginDialog(forwardUrl);
                        })
                    }
                }, 'json');
            }, 300);
        },

        search: function() {
            g.data.searchKeyWord = $.trim(g.node.searchContent.val());
            window.clearTimeout(g.config.searchTimer);
            g.config.searchTimer = window.setTimeout(function() {
                builder.loadTrainClass('html');
            }, 300);

        }
    };

    builder = {
        loading: function () {
            var bear = this;
            //bear.initImageScrollBanner();

            var defer = bear.loadCommodityTypes();

            defer.then(function () {
                bear.loadTrainClass('html');
            });
            this.loadFiveLessons();
            event.listener();
        },

        loadCommodityTypes: function () {
            return $.get(g.config.queryCommodityTypes, function (data) {

                var html = [];
                $.each(data.data, function(index, item) {
                    var sub = item['subList'];

                    html.push('<div class="csf">');
                    html.push('<div class="csf-t" data-id="' +  item.id + '">' + item.name + '</div>');
                    if(sub.length > 0) {
                        html.push('<div class="csf-c">');
                        $.each(sub, function(subIndex, subItem) {
                            html.push('<a href="#" data-action="' + subItem.id + '">' + subItem.name + '</a>');
                        });
                        html.push('</div>');
                    }
                    html.push('</div>');
                });
                g.node.classify.html(html.join(''));
            }, 'json');
        },

        loadTrainClass: function (method) {
            var template = g.node.templateTrainClass.html(),
                html = [];

            return $.get(g.config.queryTrainClassPage, {
                    pageNo: 0,
                    pageSize: 10,
                    sortKey: g.data.sortKey,
                    sortDirection: g.data.sortDirection,
                    commodityName: g.data.searchKeyWord},
                function (data) {
                    $.each(data.data, function(index, item) {
                        html.push(builder.formatString.call(template,
                            // 剩余时间
                            item['commodityValidity'],
                            // 结束时间
                            item.createTime,
                            // 名称
                            item.title,
                            // 已经报名
                            item['sellCount'],
                            // 剩余名额
                            item['residueCount'],
                            // 单价
                            item['price'],
                            // id,
                            item.id,
                            // 图片地址/public/resources/images/c_pic.png
                            '<img  data-action="goDetail" data-id="' + item.id + '" src="' + item.imageUrl + '" alt="">',

                            // 访商品id
                            item.id
                        )
                        )
                    });
                }, 'json')

                .done(function() {
                    g.node.trainCommodityList[method](html.join(''))

                        .find('div[data-action="eggle"]')

                        .addClass('animate-tc');
                });

        },


        initImageScrollBanner: function() {
            g.node.scrollImage.wpfScroll();
        },

        formatString: function(args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof (args) == "object") {
                    for (var key in args) {
                        if(args[key]!=undefined){
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            var reg= new RegExp("({)" + i + "(})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        },
        loadFiveLessons: function () {
            $.get('/public/datas/newest-lesson.json', function(data) {
                var html = [];
                var number = data.totalSize;
                if(parseInt(number)>0){
                    $.each(data.data, function (index, item) {
                        var cover = item.cover,
                            createTime =item.createTime,
                            playUrl = item.playUrl,
                            name = item.name;
                        html.push('<div class="rb-b clear">');
                        html.push(' <a href="javascript:void(0)" class="img fl"><img src="'+cover+'" alt=" "></a>');
                        html.push('<div class="info fl">');
                        html.push('<a data-action="playLesson" data-play-url="' + playUrl + '" href="#" class="text-overflow">'+name+'</a>');
                        html.push('<span>上传时间：<br/>'+createTime+'</span>');
                        html.push('</div>');
                        html.push('</div>');
                    });
                }else{
                    html.push('<div class="no-date" style="margin-top: 20px;"><div class="nd-img"><img src="/public/resources/images/no_data.png" alt=""></div><div class="nd-txt">暂无课程</div></div>')
                }
                g.node.newestLesson.html(html.join(''));
            }, 'json');

        }

    };

    event = {
        doSomething: function(e) {
            var $this = $(e.target),
                data = $this.data();
            if(data) {
                if(data.action) {
                    process[data.action]($this);
                }
            }
        },

        listener: function () {
            g.node.trainClassOp.click(function(e) {
                event.doSomething(e);
                e.preventDefault();
            });

            g.node.changeType.mouseenter(function() {
                window.clearTimeout(g.config.showTimer);
                g.node.classify.removeClass('hide').addClass('animate-tt');
            }).mouseleave(function(e) {
                window.clearTimeout(g.config.showTimer);
                g.config.showTimer = window.setTimeout(function() {
                    g.node.classify.removeClass('animate-tt').addClass('hide');
                }, 100);
            });

            g.node.trainCommodityList.click(function(e) {
                event.doSomething(e);
                e.preventDefault();
            });

            g.node.classify.mouseleave(function(e) {
                window.clearTimeout(g.config.showTimer);
                g.config.showTimer = window.setTimeout(function() {
                    g.node.classify.removeClass('animate-tt').addClass('hide');
                }, 100);
            }).mouseenter(function() {
                window.clearTimeout(g.config.showTimer);
            });


            g.node.goBusiness.click(function(e) {
                $.get(g.config.validateIAMLogin, function(data) {
                    if(data.results === 'false') {
                        window.location.href = "/web/mall/login";
                    } else {
                        window.location.href = '/public/views/business/index.html';
                    }
                }, 'json');
            });
            g.node.newestLesson.click(function(e) {
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