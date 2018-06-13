var http=require('http');
var fs=require('fs');
var url=require('url');
var util=require('util');
var cp='D:/grunt-az/node练习';

var server=http.createServer(function(req,res){


    //console.log(1);


    var html=url.parse(req.url).pathname;

    res.writeHead(200,{'Content-Type':'text/html'});
    console.log(html);
    fs.readFile(cp+html,'utf-8',function(err,data){
        console.log(555);
        res.write(data);
        res.end();
    });
    //var data=fs.readFileSync(cp+html,'utf-8');
    //res.write(data);
    //res.write(util.inspect(url.parse(req.url)));







    /*if(html==='/index'){
        res.writeHead(200,{'Content-Type':'text/html'});
        console.log(html);
        var data=fs.readFileSync(cp+html,'utf-8');
        res.write(data);
        //res.write(util.inspect(url.parse(req.url)));
        res.end();


    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('error:404');
        res.end();
    }*/
    req.on('data',function(chunk){
        console.log(1);
        console.log(chunk);

    });

});


server.listen('8080');
console.log(1);

server.on('connection',function(){
    console.log('应用启动！');
});

