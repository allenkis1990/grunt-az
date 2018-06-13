var ex=require('./exports/index1.js');
var gulp=require('gulp');

gulp.src('./txt/a1.txt').pipe(ex('刘伟恒'));

