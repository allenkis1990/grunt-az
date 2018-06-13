var express=require('express');
var app=express();
var cookieParser = require('cookie-parser');
var path=require('path');

var htmlPath=path.join(__dirname,'html','passwordCookie.html');
app.use(express.static('./js'));
app.use(express.static('./html'));

//cookieParser里传入的string是解密而不是加密 在前端发送的cookie到后台的乱码才是加密
app.use(cookieParser('eliza is smart'));



app.get('/',function(req,res){
    res.sendFile(htmlPath);
});

app.get('/cookie',function(req,res){
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('cookie');
});



app.listen(8088,'192.168.28.251');