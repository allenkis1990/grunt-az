var express=require('express');
var app=express();
var bodyParser=require('body-parser').json();
var url=require('url');
app.get('/web/login/login/getLoginParameters.action',function(req,res){
    res.send({info:{a:1}});
});
app.get('/web/portal/index/getAllSkuPropertyOptionByCode',function(req,res){
    var parser=url.parse(req.url,true);
    res.send({info:parser.query});
});
app.post('/web/portal/index/listSkuProperty',bodyParser,function(req,res){
    //console.log(req.body);
    res.send({info:req.body});
});
app.listen('8081','192.168.0.109');
