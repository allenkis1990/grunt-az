

var http=require('http');
var server=http.createServer(function(req,res){
    //服务端设置Access-Control-Allow-Origin可解决跨域
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify({name:'allen'}));
});

server.listen(8080,'192.168.0.109');