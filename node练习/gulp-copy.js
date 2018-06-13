var copy=require('gulp-copy');
var gulp=require('gulp');
var through2=require('through2');

//gulp.src(['./txt/**/*.*']).pipe(gulp.dest('./txt22'));

//把复制后的文件夹作为新的源
gulp.src(['./txt/**/*.*']).pipe(copy('./txtshe',{prefix: 1})).pipe(through2.obj(function(files,ecode,next){
    console.log(files.path);
    next();
}));