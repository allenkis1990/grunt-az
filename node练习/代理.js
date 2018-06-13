/**
 * Created by Allen on 2018/4/10.
 */
var express=require('express');
var app=express();
var fs=require('fs');
var http=require('http');
var url=require('url');
var bodyParser=require('body-parser').json();
var target='192.168.25.249';
//console.log(app);


//app.use(bodyParser.json());



app.get('/',function(req,res){
    fs.readFile('./html/proxy.html',{encoding:'utf-8'},function(err,data){
        res.send(data);
    });
});

app.get('/js/jquery-1.9.1.min.js',function(req,res){
    fs.readFile('./js/jquery-1.9.1.min.js',{encoding:'utf-8'},function(err,data){
        res.send(data);
    });
});



app.get('/web*',function(req,res){
    //console.log(req.url);
    //var parseUrl=url.parse(req.url,true);
    //console.log(parseUrl.search);

    var options = {
         hostname: target,
         port: '8080',
         path: req.url,
         headers: {
            'Content-Type': 'application/json; charset=UTF-8'
         },
         method: 'GET'
    };
    //console.log(options.path);
    var body='';
    var request=http.request(options,function(result){
        //console.log(res);
        result.on('data',function(chunk){
            console.log(chunk.toString());
            body+=chunk.toString();
            res.send(body);
        });
    })


    request.end();

});



app.post('/web*',bodyParser,function(req,res){

    var options = {
         hostname: target,
         port: '8080',
         path: req.url,
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'POST'
    };
    //console.log(options.path);
    var body='';
    var request=http.request(options,function(result){
        //console.log(res);
        result.on('data',function(chunk){
            console.log(chunk.toString());
            body+=chunk.toString();
        });

        result.on('end',function(){
            console.log(body);
            res.send(body);
        })

    });

    //console.log(JSON.stringify(req.body));
    request.write(JSON.stringify(req.body));
    request.end();





});


app.listen(8888,'192.168.28.254');