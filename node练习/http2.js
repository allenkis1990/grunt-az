var http=require('http');
var cheerio=require("cheerio");
var fs=require('fs');
var options={
    hostname:'www.fjhb.cn',
    //port:8080,
    path:'/Home/Home/Contactus',
    method:'GET'
};


var htmlData='';

var req=http.request(options,function(res){
    console.log(res.statusCode);
    res.on('data',function(chunk){
        //console.log(chunk.toString());
        htmlData+=chunk;
    });
    res.on('end',function(chunk){
        var $=cheerio.load(htmlData);
        var content=$('.company-info').text();
        fs.writeFile("./school.txt",content,"utf-8");
        console.log(content);
    });
});

req.end();
