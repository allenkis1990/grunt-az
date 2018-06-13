var http=require('http');
var send=require('send');


var server=http.createServer(function(req,res){
    if(req.url==='/'){
        var stream=send(req,'./html/a1.html');
        stream.pipe(res);
        //res.end('22');
    }else if(req.url==='/a2.html'){
        var stream=send(req,req.url,{root:'./html'});
        stream.pipe(res);
    } else{
        res.end('2222');
    }
});
server.listen(8087,'192.168.28.251');