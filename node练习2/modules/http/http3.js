var fs=require('fs');
var http=require('http');
var mime=require('mime');
var formidable=require('formidable');
var util=require('util');

//如果是HTML页面上的 /  代表node练习
//如果是node环境下读文件的 / 代表D盘
fs.readFile('/index.html',function(err,data){
    console.log(data.toString());
});

var server=http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    console.log(req.url);
    if(req.url==='/'){
        //console.log(111);
        fs.readFile('./返回JOSN.html',function(err,data){
            res.end(data);
        });
    }else if(req.url==='/js/jquery-1.9.1.js'){
        var mimeType=mime.getType(req.url);
        fs.readFile('../../'+req.url,function(err,data){
            res.writeHead(200,{'Content-Type':mimeType});
            res.end(data);
        });

    }else if(req.url==='/postDo'){
        var result='';
        var form = new formidable.IncomingForm();
        //fields代表普通input files代表文件
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            //res.write('received upload:\n\n');
            //res.end(util.inspect({fields: fields, files: files}));
            res.end(JSON.stringify({name:'allen'}));

        });

    } else{
        res.end('1');
    }
});
server.listen(8080,'192.168.0.108');
