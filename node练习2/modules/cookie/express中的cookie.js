var express=require('express');
var app=express();
var cookieParser=require('cookie-parser');

app.use(cookieParser());

app.get('/',function(req,res){
    console.log(req.headers.cookie);
    res.cookie('lwh','刘伟恒',{
        //domain:xx.xx.com//只有指定这个域名才发送
        //maxAge:10*1000,
        path:'/lwh'
    });
    res.send('ok');
});

app.get('/lwh',function(req,res){
    console.log(req.headers.cookie);
    res.send('lwh');
});
app.get('/xll',function(req,res){
    console.log(req.headers.cookie);
    res.send('xll');
});

app.listen(8081,'192.168.0.106');