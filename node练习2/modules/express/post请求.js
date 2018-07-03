var express=require('express');
var app=express();
var util=require('util');
var path=require('path');
var fs=require('fs');
var bodyParser=require('body-parser');


var staticPath=path.resolve('..','..','static');
//指定静态资源目录
app.use(express.static(staticPath));
//解析的是urlencoding格式  extended:true使用querystring来解析 false的话使用bodyParser自己来解析
app.use(bodyParser.urlencoded({extended:true}));
//解析的是json格式
app.use(bodyParser.json());


app.post('/post',function(req,res){
    console.log(req.body);
    res.send({name:'allen'});
});


app.listen(8080,'192.168.0.109');

