var express=require('express');
var app=express();
var util=require('util');
var path=require('path');
var fs=require('fs');

var staticPath=path.resolve('..','..','static');
//指定静态资源目录
app.use(express.static(staticPath));

app.get('/',function(req,res){
    res.send('Home');
});


app.listen(8080,'192.168.0.109');

