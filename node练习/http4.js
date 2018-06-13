const http =require('http');
const fs=require('fs');



//创建一个WEB服务器加载index.html index.css index.js

var server=http.createServer(function(req,res){
    var url=req.url;

    if(url==='/'){
        fs.readFile('./index.html',function(err,data){
            if(err){
                res.end(err);
            }else{
                res.setHeader('content-type','text/html;charset=utf-8');
                res.end(data);
            }
        });
    }else if(/\.css/.test(url)){
        fs.readFile('./'+url,function(err,data){
            if(err){
                res.end(err);
            }else{
                res.setHeader('content-type','text/css;charset=utf-8');
                res.end(data);
            }
        });


    }else if(/\.js/.test(url)){
        fs.readFile('./'+url,function(err,data){
            if(err){
                res.end(err);
            }else{
                res.setHeader('content-type','application/javascript;charset=utf-8');
                res.end(data);
            }
        });
    }else{
        res.end();
    }

});
server.listen(8080,'192.168.26.252');
