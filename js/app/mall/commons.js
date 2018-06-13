/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-2-3
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    var g = {}, process = {}, event = {}, builder = {};

    g.node = {
        menuButton: $('#side_menu'),
        logon: $('#logon'),
        unLogin: $('#un_login'),
        img: $('#img'),
        name: $('#name'),
        url: $('#url'),
        goBusiness: $('#go_business'),
        goHomePage: $('#go_home_page')
    };

    g.config = {
        validateICANbuy: '/web/mall/mallIndex/$id/validateICANbuy',
        validateIAMLogin: '/web/mall/mallIndex/0/validateIAMLogin'
    };

    process = {
        init: function () {
            builder.loading();
            this.loginIf();
        },

        loginIf: function () {
            $.get(g.config.validateIAMLogin, function (data) {
                if (data.results === 'false') {
                    g.node.unLogin.removeClass('hide').addClass('il-block');
                    g.node.logon.removeClass('il-block').addClass('hide');
                } else {
                    g.node.unLogin.removeClass('il-block').addClass('hide');
                    g.node.logon.removeClass('hide').addClass('il-block');
                    g.node.name.text(data.name);
                    g.node.img.attr('src',data.image)  ;
                    g.node.url.attr("href",data.url);
                }
            }, 'json');
        }

    };

    builder = {
        loading: function () {
            event.listener();
        }
    };

    event = {
        listener: function () {
            g.node.goBusiness.click(function (e) {
                $.get(g.config.validateIAMLogin, function (data) {
                    if (data.results === 'false') {
                        window.location.href = "/web/mall/login";
                    } else {
                        window.location.href = '/public/views/business/index.html';
                    }
                }, 'json');
            });

            g.node.goHomePage.click(function (e) {
                $.get(g.config.validateIAMLogin, function (data) {
                    if (data.results === 'false') {
                        window.location.href = "/web/mall/login";
                    } else {
                        window.location.href = '/public/views/business/index.html';
                    }
                }, 'json');
            });

            g.node.menuButton.click(function (e) {
                var $this = $(e.target),
                    sideMenu = $this.closest('#side_menu');

                if ($this.hasClass('s-icon')) {
                    sideMenu.find('.s-icon').stop().animate({
                        left: '150px'
                    }, function () {
                        sideMenu.stop().animate({
                            right: 0
                        })
                    })
                } else if ($this.closest('li').hasClass('close')) {
                    sideMenu.stop().animate({
                        right: '-150px'
                    }, function () {
                        sideMenu.find('.s-icon').stop().animate({
                            left: '-50px'
                        });
                    })

                } else if ($this.attr('data-action') === 'toMoreTrainClass') {
                    window.location.href = '/public/views/mall/commodity-list.html';
                } else if ($this.attr('data-action') === 'toTop') {
                    $('html,body').stop().animate({
                        scrollTop: 0
                    })
                }
                e.preventDefault();
            });
        }
    };

    process.init();
});