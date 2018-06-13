/**
 * Created by Allen on 2018/4/20.
 */
var express=require('express');
var app=express();

app.use(function(req,res,next){
    if(req.url==='/'){
        req.url='/index';
        next();
    }else{
        next();
    }
});

app.use(function(req,res,next){
    if(req.url==='/404'){
        var err=new Error('page 404!');
        err.notFound=true;
        next(err);
    }else{
        next();
    }
});

app.use('/admin',function(req,res,next){
    fn();
});


//统一错误处理
app.use(function(err,req,res,next){
    //console.log(err);
    if(err.notFound){
        res.statusCode='404';
        res.send(err);
    }else{
        res.statusCode='500';
        res.send('server err');
    }
});

app.get('/',function(req,res){
    //设置重定向后 如果想改回来 要清缓存
    //console.log(req.url);
    //res.writeHead('301',{location:'/index'});
    res.end('ok');
});

app.get('/index',function(req,res){
    res.writeHead('200',{'Content-Type':'text/html'});
    res.end('index');
});




app.listen('8080','192.168.28.254');
