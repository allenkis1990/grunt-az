var gulp = require('gulp');
var runSequence=require('run-sequence');

gulp.task('a1',function(){
    var st= gulp.src('../express/**/*').pipe(gulp.dest('../../fuck'))
    return st
});
gulp.task('a2',['a1'],function(){
    var st= gulp.src('../../index.html').pipe(gulp.dest('../../fuck'))
    return st
});

runSequence(['a2']);
