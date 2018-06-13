var express=require('express');
var app=express();
var cookieParser = require('cookie-parser');

app.use(express.static('./html'));
app.use(cookieParser('lwh'));

app.get('/',function(req,res){
    //console.log(req.cookies);
    //console.log(req.signedCookies);
    //console.log(req.headers.cookie);
    if(!req.headers.cookie){
        res.cookie('name', 'allen!');
    }
    res.send('ok');
});

app.get('/deleteCookie',function(req,res){
    res.clearCookie('name');
    res.send('deleteCookie');
});


app.listen(8081,'192.168.28.251');