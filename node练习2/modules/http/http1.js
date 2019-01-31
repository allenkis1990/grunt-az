var fs=require('fs');
var http=require('http');
var mime=require('mime');
var url=require('url');
var querystring=require('querystring');



var server=http.createServer(function(req,res){
    console.log(req.url);
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    if(req.url==='/'){
        //console.log(111);
        fs.readFile('./clock.html',function(err,data){
            res.end(data);
        });
    }else if(req.url==='/js/jquery-1.9.1.js'){
        var mimeType=mime.getType(req.url);
        fs.readFile('../../'+req.url,function(err,data){
            res.writeHead(200,{'Content-Type':mimeType});
            res.end(data);
        });

    }else if(req.url==='/clock'){
        res.end();
    }else if(req.url==='/postDo'){

        var result='';
        req.on('data',function(data){
            result+=data.toString();
        });
        req.on('end',function(){
            //var params=url.parse('?'+result,true).query;
            var params=querystring.parse(result);
            for(var i in params){
                console.log(params[i]);
            }
            //console.log(params);
        });

        res.end();
    } else{
        res.end('1');
    }
});
server.listen(8080,'127.0.0.1');
