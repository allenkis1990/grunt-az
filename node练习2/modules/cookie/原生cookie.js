
var http=require('http');

var server=http.createServer(function(req,res){
    //expires设置失效具体日期 maxAge是多少秒后失效
    //res.setHeader('Set-Cookie','myname=lwh; expires='+new Date(Date.now()+10*1000).toGMTString());
    //Path是res种了cookie后 下一次请求URL是lwh时候客户端才发送cookie
    res.setHeader('Set-Cookie','myname=lwh111; Path=/lwh');
    console.log(req.headers.cookie);
    res.end('ok');
});
server.listen(8081,'192.168.0.106');
