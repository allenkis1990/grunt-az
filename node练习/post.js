var http=require('http');
var fs=require('fs');
var url=require('url');
var util=require('util');
var querystring=require('querystring');
var cp='D:/grunt-az/node练习';

var formidable=require('formidable');

var server=http.createServer(function(req,res){

    var html=url.parse(req.url).pathname;
    //res.writeHead(200,{'Content-Type':'text/html'});

    if(html==='/post'){
        var post='';

        console.log('post!!!');



        var form=new formidable.IncomingForm();
        form.uploadDir='./temp';
        form.parse(req,function(err,fields,files){
            res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
            var path=files.wenjian.path;
            fs.rename(path,'./temp/777.jpg');
            //console.log(files);
            res.end();
        });






        /*req.on('data',function(chunk){
            post+=chunk;
            //console.log(chunk);
        });
        req.on('end',function(){
            console.log(querystring.parse(post));
            res.write(querystring.parse(post).lwh+'<br />');
            res.write(querystring.parse(post).lwh+'<br />');
            res.write(querystring.parse(post).lwh+'<br />');
            res.end();
            //console.log(post);
        });*/

    }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(cp+html,'utf-8',function(err,data){
            console.log('not post');
            res.write(data);
            res.end();
        });
    }









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

});
server.listen('8080');
console.log(1);

