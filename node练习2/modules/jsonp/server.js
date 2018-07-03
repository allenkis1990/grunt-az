var http=require('http');
var url=require('url');
var server=http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    console.log(urlObj);
    if(urlObj.pathname==='/jsonp'){
        //res.writeHead('200',{'Content-Type':'application/json'});
        //res.end(JSON.stringify({name:'allen'}));
        res.end(urlObj.query.methodName+'([{name:"allen",age:18}])');
    }else{
        res.end('');
    }
});

server.listen(9000,'192.168.0.109');
