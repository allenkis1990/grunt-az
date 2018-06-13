var gulp=require('gulp');
var fs=require('fs');
var through2=require('through2');
var runSeque = require("gulp-run-sequence"); // 顺序执行
var path=require('path');
var File=require('vinyl');


var baseDir='./testBeforeMod';
var modulesAll=fs.readdirSync('./testBeforeMod/modules','utf-8');
var opModules=[];
modulesAll.forEach(function(item){
    //console.log(item);
    if(fs.lstatSync('./testBeforeMod/modules/'+item).isDirectory()){
        //console.log(item);
        opModules.push(item);
    }
});
//console.log(opModules);


gulp.task('cloneMother',function(){
    /*opModules.forEach(function(item){

    });*/
   return gulp.src(['./testBeforeMod/**/*.*','!./testBeforeMod/modules/**/*.*']).pipe(through2.obj(function(chunk,ecode,next){


        var $this=this;
        // \ 转成 /
        var relativePath=path.relative(baseDir,chunk.path).replace(/\\/ig,'/');
        //console.log(relativePath);




        opModules.forEach(function (item) {
            var file=new File();
            file.path=item+'/'+relativePath;
            console.log((item + '/' + relativePath));
            file.contents=chunk.contents;
            $this.push(file);
        });


        next();

    })).pipe(gulp.dest('./testAfterMod'));
});


gulp.task('coverModules',function(){

   return gulp.src(['./testBeforeMod/modules/**/*.*']).pipe(gulp.dest('./testAfterMod'));



});


runSeque('cloneMother','coverModules');
//gulp.src(['./testBeforeMod/**/*.*','!./testBeforeMod/modules/**/*.*']);
