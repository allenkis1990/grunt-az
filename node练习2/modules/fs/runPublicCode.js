
/**
 * 使用public中压缩过的代码来启动项目
 */

var express = require('express');
var app = express();
var path = require('path');
var indexFilePath = path.join(__dirname,'..','..','public','index.html')
var baseDir = '../..';

// app.use(express.static(baseDir+'/public'));
app.get('/',function(req,res){
    res.sendFile(indexFilePath);
});

app.get('/*',function(req,res){
    console.log(req.url);
    var relativePath = baseDir+'/public'+req.url;
    var filePath = path.join(__dirname,relativePath);
    // console.log(filePath);
    res.sendFile(filePath)
});
app.listen('8082','127.0.0.1');


