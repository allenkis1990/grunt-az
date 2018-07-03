var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var rm = require('rimraf')
var indexFilePath = path.join(__dirname,'..','..','html','index.html')
var baseDir = '../..';
var appDir = '/app';
var bowerDir = '/bower';
var gulp = require('gulp');
var runSequence=require('run-sequence');

/**
 * 如果app文件夹里没有就去bower文件夹里拿
 * bower 文件夹没有那就404
 * 构建的时候先删除build文件夹
 * 然后先复制bower里的文件到build
 * 然后再复制app里的文件到build 重复的话则app覆盖bower
 */

app.get('/',function(req,res){
    res.sendFile(indexFilePath);
});

app.get('/*',function(req,res){
    console.log(req.url);
    var relativeAppPath = baseDir+appDir+req.url;
    var relativeBowerPath = baseDir+bowerDir+req.url;
    if(fs.existsSync(relativeAppPath)){
        console.log('存在');
        var filePath = path.join(__dirname,relativeAppPath);
        console.log(filePath);
        res.sendFile(filePath);
    }else{
        console.log('不存在');
        var filePath = path.join(__dirname,relativeBowerPath);
        if(fs.existsSync(filePath)){
            console.log(filePath);
            res.sendFile(filePath);
        }else{
            res.statusCode=404;
            res.send('404-not-found');
        }
    }
});
app.listen('8080','127.0.0.1');

var appPath = baseDir+'/app';
var bowerPath = baseDir+'/bower';
var buildPath = baseDir+'/build';
rm(path.join(__dirname,'..','..','build'),function(err){
    console.log(1);
    runSequence(['copyAppToBuild']);
})


gulp.task('copyBowerToBuild',function(){
    var st= gulp.src(bowerPath+'/**/*').pipe(gulp.dest(buildPath))
    return st
});
gulp.task('copyAppToBuild',['copyBowerToBuild'],function(){
    var st= gulp.src(appPath+'/**/*').pipe(gulp.dest(buildPath))
    return st
});

