var express=require('express');
var app=express();
var fs=require('fs');
var url = require('url');

app.get('/',function(req,res){

    fs.readFile('./重定向.html','utf8',function(err,data){
        res.send(data);
        //res.end();
    });

});

app.get('/js/jquery-1.9.1.js',function(req,res){
    fs.readFile('../../js/jquery-1.9.1.js','utf8',function(err,data){
        res.send(data);
    });
    //console.log(res);
});

/**
 * res.redirect和res.writeHead(302,{Location:'http://www.baidu.com'});都需要网页手输网址重定向
 * 只有返回JS模式才能在调口的时候重定向
 */
app.get('/re',function(req,res){
    var param=url.parse(req.url,true);
    res.writeHead(200,{'Content-Type':'application/x-javascript'});
    res.end('window.location.href=' + param.query.redirect);
    //res.redirect(302, 'http://192.168.28.251:8088/home');
    //res.writeHead(302,{Location:'http://www.baidu.com'});
    //res.end('window.location.href="http://192.168.28.251:8088/home"');
});
app.get('/home',function(req,res){
    res.send('home');
});


app.listen(8088,'192.168.28.251');

