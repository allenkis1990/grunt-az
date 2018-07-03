/**
 * Created by admin on 2018/4/19.
 */
var express=require('express');
var app=express();


app.use(function(req,res,next){
    fn();
});

app.use(function(req,res,next){
    var err=new Error('err');
    err.notFound=true;
    next(err);
});

app.use(function(err,req,res,next){
    if(err.notFound){
        res.statusCode='404';
        res.send('404not found');
    }else{
        res.statusCode='500';
        res.send('server err');
    }
});

app.get('/',function(req,res){
    res.send('ok');
});


app.listen('8080','192.168.0.109');