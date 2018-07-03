var express=require('express');
var app=express();
var cookieParser=require('cookie-parser');


app.use(cookieParser());

var session={};
var count=0;




app.get('/',
    function(req,res,next){
    console.log(count);
    if(count===0){
        res.clearCookie('sid');
    }
    count++;
    next();
},
    function(req,res){
    //res.clearCookie('sid');
    var sid=req.cookies.sid;
    console.log(req.cookies);
    if(sid){
        console.log(session[sid]);
        var sessionSid=session[sid];
        res.send('欢迎回来'+sessionSid.name);
    }else{
        var newSid='sid'+Date.now()+Math.random();
        session[newSid]={name:'allen'};
        console.log(session[newSid]);
        res.setHeader('Set-Cookie','sid='+newSid);
        res.send('登陆！！！！！');
    }
});


app.listen(8081,'192.168.0.106');