var express=require('express');
var app=express();
var util=require('util');
var path=require('path');

//设置模板引擎为ejs加载
app.set('view engine','ejs');
//设置模板引擎的目录
app.set('views',path.resolve(__dirname,'..','..','static'));


app.get('/',function(req,res){
    res.render('templates/express模板引擎.ejs',{title:'首页',content:'我是首页内容！！',arr:[1,2,3,4,5,6]});
});


app.listen(8080,'192.168.0.109');

