var http=require('http');
var querystring=require('querystring');
var server=http.createServer(function(req,res){
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    console.log(req.httpVersion);


    //res.writeHead(200,{'Content-Type':'text/plain'});

    var result='';
    var contentType=req.headers['content-type'];
    req.setEncoding('utf8');
    req.on('data',function(data){
        result+=data;
    });
    req.on('end',function(){
        console.log(contentType);
        if(contentType==='application/json'){

        }else if(contentType==='application/x-www-form-urlencoded'){
            result=querystring.parse(result);
            result=JSON.stringify(result);
        }else if(contentType==='application/lwh'){
             //$参数为分隔符  -参数为相当于原来的=
            result=querystring.parse(result,'$','-');
            result=JSON.stringify(result);
        }
        console.log(result);
        res.end(result);
    });



});

server.listen(8888,'192.168.0.109');