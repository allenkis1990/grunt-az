/**
 * Created by admin on 15-1-19.
 */



define(function (require, exports, module) {
    'use strict';
    var url='/web/admin/commodity/commodity/';

    module.exports = [ '$resource', function( $resource) {
        var commodity= $resource(url+':id/:action' ,{id: '@id', action: '@action'}, {
            findSellCommodityPage: {method: 'get', url : url+'0/findSellCommodityPage'},
            findWarehouseCommodityPage: {method: 'get', url : url+'0/findWarehouseCommodityPage'},
            findPastDueCommodityPage:{method:'get',url:url+'0/findPastDueCommodityPage'},
            soldOutCommodity:{method:'get',url:url+'0/soldOutCommodity'},
            putawayCommodity:{method:'get',url:url+'0/putawayCommodity'},
            findCommodityType:{method:'get',url:url+'0/findCommodityType'},
            saveCommodityType:{method:'post',url:url+'0/saveCommodityType'},
            updateCommodityType:{method:'get',url:url+'0/updateCommodityType'},
            tabbingOrder:{method:'get',url:url+'0/tabbingOrder'},
            deleteCommodityType:{method:'get',url:url+":id/deleteCommodityType"},
            batchDeleteCommodityType:{method:'get',url:url+"0/batchDeleteCommodityType"},
            deleteHistoryCommodity:{method:'get',url:url+"0/deleteHistoryCommodity"},
            findCommodityTypeAll:{method:'get',url:url+'0/findCommodityTypeAll'},
            saveCommodityTypeImage:{method:'get',url:url+'0/saveCommodityTypeImage'},
            findCommodityTypeImageModel:{method:'get',url:url+':id/findCommodityTypeImageModel'},
            checkValidateName:{method:'get',url:url+'0/checkValidateName'},
            deleteImg:{method:'get',url:url+':id/deleteImg'}
            });
        return commodity;
    }]
});