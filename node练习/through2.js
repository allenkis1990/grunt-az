var gulp=require('gulp');
var through2=require('through2');
var fs=require('fs');
var path=require('path');
var File=require('vinyl');

//console.log(gulp.src(['./txt/a1.txt', './txt/a2.txt', './txt/a3.txt']));

gulp.src(['./txt/a1.txt','./txt/a2.txt','./txt/a3.txt']).pipe(through2.obj(function(file,ecode,cb){
    //console.log(file.contents.toString());

    var realPath=path.relative('./',file.path);
    console.log(realPath);
    var content=file.contents.toString();
    var newCon=content.replace(/!/ig,'%');

    //fs.writeFileSync('./'+realPath,newCon,'utf-8');

    //console.log(newCon);

    var newFile=new File();

    newFile.path='./'+realPath;
    newFile.contents=new Buffer(newCon);
    //console.log(newFile.contents.toString());
    this.push(newFile);


    cb();
})).pipe(gulp.dest('./txt'));


//用vinyl的话还要gulp.dest输出出来

//console.log(src);