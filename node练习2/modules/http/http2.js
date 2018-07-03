var fs=require('fs');
var http=require('http');
var mime=require('mime');
var formidable=require('formidable');
var util=require('util');


/*
var form = new formidable.IncomingForm();

form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
});
*/


var server=http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    console.log(req.url);
    if(req.url==='/'){
        //console.log(111);
        fs.readFile('./form.html',function(err,data){
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
            res.writeHead(200, {'Content-Type': 'text/plain'});
            console.log(fields);
            console.log(files);
            //res.write('received upload:\n\n');
            //res.end(util.inspect({fields: fields, files: files}));
            var readStream=fs.createReadStream(files.file.path);
            var writeStream=fs.createWriteStream('../../images/copy.jpg');
            readStream.pipe(writeStream);
            //console.log(files.file);

            readStream.on('end',function(){
                res.end('copy.jpg');
            });
        });

    }else if(/(jpg)|(png)/ig.test(req.url)){
        //console.log(3333);
        if(/(jpg)/ig.test(req.url)){
            res.writeHead(200, {'Content-Type': 'image/jepg'});
        }else if(/(png)/ig.test(req.url)){
            res.writeHead(200, {'Content-Type': 'application/x-png'});
        }
        fs.readFile('../..'+req.url,function(err,data){
            res.end(data);
        });
    } else{
        res.end('1');
    }
});
server.listen(8080,'192.168.0.109');
