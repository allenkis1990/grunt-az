var express=require('express');
var app=express();
var fs=require('fs');
var formidable=require('formidable');
var util=require('util');

app.get('/',function(req,res){

    fs.readFile('./text.html','utf8',function(err,data){
        res.send(data);
        //res.end();
    });

});

app.get('/js/jquery-1.9.1.js',function(req,res){
    fs.readFile('../../js/jquery-1.9.1.js','utf8',function(err,data){
        setTimeout(function(){
            res.send(data);
        },0)
    });
    //console.log(res);
});
app.get('/text.css',function(req,res){
    fs.readFile('./text.css','utf8',function(err,data){
        setTimeout(function(){
            res.send(data);
        },0)
    });
    //console.log(res);
});
app.get('/a1.png',function(req,res){
    fs.readFile('./a1.png','utf8',function(err,data){
        setTimeout(function(){
            res.send(data);
        },6000)
    });
    //console.log(res);
});





app.listen(8080,'127.0.0.1');

