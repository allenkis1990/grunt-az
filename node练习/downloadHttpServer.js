var express=require('express');
var app=express();
var path=require('path');
var jsPath=path.join(__dirname,'js','index.js');
app.get('/',function(req,res){
    res.send('ok');
});
app.get('/download',function(req,res){
    console.log(111);
    res.setHeader('Content-Type', 'application/octet-stream')
    res.end('ok!!~~~~');
});


app.listen(8081,'192.168.28.251');

