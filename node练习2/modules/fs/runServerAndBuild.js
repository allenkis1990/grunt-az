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
var less = require('gulp-less');
var cssMin = require('gulp-csso');
var uglify = require('gulp-uglify');
var imgMin = require('gulp-imagemin');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence=require('run-sequence');

/**
 * 如果app文件夹里没有就去bower文件夹里拿
 * bower 文件夹没有那就404
 * 构建的时候先删除build文件夹
 * 然后先复制bower里的文件到build
 * 然后再复制app里的文件到build 重复的话则app覆盖bower
 */

app.use('/style',express.static(baseDir+'/build/style'));//style用build里的
app.use('/images',express.static(baseDir+'/build/images'));//images用build里的

app.get('/',function(req,res){
    res.sendFile(indexFilePath);
});


//js不用build里的
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

var htmlIndexPath = baseDir+'/html/index.html';
var appPath = baseDir+'/app';
var bowerPath = baseDir+'/bower';
var buildPath = baseDir+'/build';
var publicPath = baseDir+'/public';
var aaaPath = baseDir+'/aaa';
rm(path.join(__dirname,'..','..','build'),function(err){
    rm(path.join(__dirname,'..','..','public'),function(){
        console.log(1);
        runSequence(
            ['copyAppJsToBuild'],
            ['copyAppCssToBuild'],
            ['copyAppImgToBuild'],
            //['copyHtmlToBuild'],
            ['revProject'],
            ['copyHtmlToBuild'],
            ['result']
        );
    })
})

//js处理
gulp.task('copyBowerJsToBuild',function(){
    var st= gulp.src(bowerPath+'/js/*').pipe(uglify()).pipe(gulp.dest(buildPath+'/js'))
    return st
});
gulp.task('copyAppJsToBuild',['copyBowerJsToBuild'],function(){
    var st= gulp.src(appPath+'/js/*').pipe(uglify()).pipe(gulp.dest(buildPath+'/js'))
    return st
});
//js处理


//CSS处理
gulp.task('copyAppCssToBuild',function(){
    var st= gulp.src(appPath+'/style/**/*').pipe(less()).pipe(cssMin()).pipe(gulp.dest(buildPath+'/style'))
    return st
});
//CSS处理

//图片处理
gulp.task('copyAppImgToBuild',['copyBowerImgToBuild'],function(){
    var st= gulp.src(appPath+'/images/**/*').pipe(imgMin({progressive: true})).pipe(gulp.dest(buildPath+'/images'))
    return st
});
gulp.task('copyBowerImgToBuild',function(){
    var st= gulp.src(bowerPath+'/images/**/*').pipe(imgMin({progressive: true})).pipe(gulp.dest(buildPath+'/images'))
    return st
});
//图片处理

//html处理
gulp.task('copyHtmlToBuild',function(){
    var st= gulp.src(htmlIndexPath).pipe(gulp.dest(buildPath))
    return st
});
//html处理


//给build里的所有做hash处理 完成后生成新的文件夹public
gulp.task('revProject',function(){
    var st= gulp.src([buildPath+'/**/*'])
        .pipe(rev())
        .pipe(gulp.dest(publicPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(buildPath))
    return st
});

//替换文件中引用到的hash css中 js中 html中
gulp.task('result',function(){
    gulp.src([buildPath+'/rev-manifest.json',buildPath+'/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(publicPath))
    gulp.src([buildPath+'/rev-manifest.json',publicPath+'/style/**/*'])
        .pipe(revCollector())
        .pipe(gulp.dest(publicPath+'/style'))
    gulp.src([buildPath+'/rev-manifest.json',publicPath+'/js/**/*'])
        .pipe(revCollector())
        .pipe(gulp.dest(publicPath+'/js'))
})



