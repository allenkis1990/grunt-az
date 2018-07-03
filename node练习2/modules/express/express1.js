var express=require('express');
var app=express();
var fs=require('fs');
var formidable=require('formidable');
var util=require('util');


//中间件如果不next()就不会往下走
//中间件代码要放在get post这些路由的前面
//如果中间件里有end 或者send了 那么路由里再end或者send会报错最好try catch一下
app.use('/fuck',function(req,res,next){
    res.setHeader('Content-Type','text/plain');
    res.end('0');
    next();
});
app.use('/shit',function(req,res,next){
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/',function(req,res){

    fs.readFile('./index.html','utf8',function(err,data){
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

app.post('/post',function(req,res){
    //console.log(req);
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var obj={age:18};

        fields=util._extend(obj,fields);
        console.log(fields);
        res.send(fields);
    });

});
app.get('/fuck',function(req,res){
    try{
        res.send('fuck you hahaha !!!');
    }catch (e){
        console.log(e);
    }

});
app.get('/shit',function(req,res){

    res.send('shit you ho !!!');
});


app.listen(8080,'192.168.0.109');

