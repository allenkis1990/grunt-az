var gulp=require('gulp');
var path=require('path');
var fs=require('fs');



//var basePath=path.relative('./','./dirHtml');
//console.log(basePath);
var stream=gulp.src(['./dirHtml/*.html','!./dirHtml/index.html','!./dirHtml/indexTemp.html']);

var writeContent='';
var baseHtmlCode=fs.readFileSync('./dirHtml/indexTemp.html').toString();
//console.log(baseHtmlCode);
stream.on('data',function(chunk){
    //dirHtml文件夹下的所有HTML路径
    var fileBasePath=path.relative('./dirHtml',chunk.path);

    var htmlChunk='<li><a href="'+fileBasePath+'">'+fileBasePath+'</a></li>';

    writeContent+=htmlChunk;
    console.log(fileBasePath);
});

stream.on('end',function(){
    var writeHtml=baseHtmlCode.replace(/\$\$\$\$replaceStr\$\$\$\$/,writeContent);

    fs.writeFileSync('./dirHtml/index.html',writeHtml,'utf-8');

    //console.log(writeHtml);
});
