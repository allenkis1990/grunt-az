var express = require('express');
var app= express();
var path = require('path');
var htmlFilePath = path.join(__dirname,'html','复制文字.html');
var jsFilePath = path.join(__dirname,'html','vue.min.js');
app.get('/',function(req,res){
    res.statusCode=200;
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.sendFile(htmlFilePath);
});
app.get('/vue.min.js',function(req,res){
    res.statusCode=200;
    res.sendFile(jsFilePath);
});

app.listen('8080','192.168.28.251');