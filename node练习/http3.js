const http = require('http');

const server = http.createServer(function(req, res) {

        var body = '';

req.setEncoding('utf8');

// 如果监听了 'data' 事件，Readable streams 触发 'data' 事件
req.on('data', function(chunk) {
    body += chunk;
});

// end 事件表明整个 body 都接收完毕了
req.on('end', function(){


    console.log(body);
    try {
        const data = JSON.parse(body);
// 发送一些信息给用户
res.write(body);
res.end();
} catch (er) {
    // json 数据解析失败
    res.statusCode = 400;
    return res.end('error: ${er.message}1');
}
});
});

server.listen(1337);