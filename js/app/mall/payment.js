/**
 * Created with IntelliJ IDEA.
 * User: wengpengfei
 * Date: 15-1-28
 * Time: 上午11:01
 * To change this template use File | Settings | File Templates.
 */


define(function (require) {
    'use strict';
    var g = {}, process = {}, event = {}, builder = {};

    require('wpfDialog');
    require('./commons');
    g.config = {
        queryPayWays: '/web/mall/mallIndex/0/queryPayWays',
        queryCommodityOne: '/web/mall/mallIndex/$id/queryCommodityOne',
        createOneOrder: '/web/mall/mallIndex/0/createOneOrder'
    };

    g.node = {
        payWays: $('#pay_ways'),
        read: $('#read'),
        trainClassName: $('#train_class_name'),
        howMany: $('#how_many'),
        mustPay: $('#must_pay'),
        realTake: $('#real_take'),
        doPay: $('#do_pay')
    };

    g.data = {
        readAlready: false,
        commodityId: '',
        buyNumber: 0,
        receiveAccountId: '',
        code: ''
    };

    require('jquery');
    process = {
        init: function () {
            builder.loading();
        },

        judge: function() {
            if(g.data.code !== '' && g.data.readAlready) {
                g.node.doPay.removeClass('btn-disable');
            } else {
                g.node.doPay.addClass('btn-disable');
            }
        },

        doPay: function() {
            if(g.data.code === '') {
                return false;
            }
            $.post(g.config.createOneOrder, {jsonData: JSON.stringify({
                commodityId: g.data.commodityId,
                payWay: g.data.code,
                receiveAccountId: g.data.receiveAccountId,
                purchaseCount: g.data.buyNumber
            })}, function(data) {
                if(data.results === 'true') {
                    $.wpfConfirm({
//                sure: function() {
//                    console.log('支付完成...');
//                },
                        sureText: '完成支付',
                        cancelText: '付款遇到问题?',
                        msg: '正在处理支付...'
                    });
                    window.open(data.messages);
                } else {
                    $.wpfAlert({msg:data.messages});
                    ///// do
                }
            }, 'json');
        }
    };

    builder = {
        loading: function () {
            var bear = this;
            this.urlEncode();
            bear.loadPayWays();

            bear.loadCommodityInfo();

            event.listener();
        },

        loadCommodityInfo: function() {
            $.get(g.config.queryCommodityOne.replace('$id', g.data.commodityId), function(data) {
                g.node.trainClassName.html(data['trainClassName']);
                g.node.howMany.html('￥' + g.data.buyNumber * data['commodityPrice']);
                g.node.realTake.html('￥' + g.data.buyNumber * data['commodityPrice']);
            }, 'json');
        },

        //// 解析url 分解出商品id和购买个数  */
        urlEncode: function() {
            var url = location.href,
                params = url.substring(url.lastIndexOf('?') + 1, url.length).replace('#', ''),
                paramsArray = params.split('-');

            g.data.commodityId = paramsArray[0];
            g.data.buyNumber = paramsArray[1];
        },

        loadPayWays: function () {
            $.get(g.config.queryPayWays, function (data) {

                console.log(data);
                var html = '<span class="pay-img"><img src="/public/resources/images/zfb.jpg" alt="">' +
                    '<a data-id="{0}" data-code="{1}" data-receive-account-id="{2}" href="#"></a>' +
                    '</span>';

                html = builder.formatString.call(html, data.id, data.code, data.id);
                console.log('-----' + html);
                g.node.payWays.html(html);
            }, 'json');
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
        }
    };

    event = {
        listener: function () {
            g.node.doPay.click(function(e) {
                if(!$(e.target).hasClass('btn-disable')) {
                    process.doPay();
                }
                e.preventDefault();
            });

            g.node.read.click(function(e) {
                g.data.readAlready = e.target.checked;
                process.judge();
            });

            g.node.payWays.click(function(e){
                var $this = $(e.target),
                    data = $this.data();

                if(data) {
                    g.data.code = data.code;
                    g.data.receiveAccountId = data.receiveAccountId;
                    $this.addClass('current').parent().siblings().find('a').removeClass('current');
                }

                process.judge();

                e.preventDefault();
            });
        }
    };

    process.init();
});