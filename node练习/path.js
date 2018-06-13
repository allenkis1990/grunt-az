var path=require('path');

var pathDir='../temp/a/b/c/lwh.html';

//console.log(path.dirname(pathDir));//返回路径地址 不包含文件名
//console.log(path.basename(pathDir,'.html'));//返回文件名+文件类型 如果加上.html这个参数就返回文件名
//console.log(path.extname(pathDir));//返回文件类型


//console.log(path.join('a1','a2','/a3/a4','../../a5'));//合并路径
console.log(path.resolve('a1','a2','/a3/a4','../../a5'));//就像cd xx从左到右执行 解析绝对路径 /以根目录D为准
//console.log(path.parse('/a1/a2/a3/a4.html'));//解析这个路径
//console.log(path.format({dir:'/a1/a2', base:'a3.html'}).replace('\\','/'));//用对象解析成path路径

//console.log(path.relative('/a5/a4/a5.html', '/a5/a6/a7/a8.html'));//from to 求from如何到达to的路径