var path=require('path');

//路径的斜杠
console.log(path.sep);

//文件所在的绝对路径
console.log(__filename);

//文件所在的文件夹
console.log(__dirname);


//返回相对路径a\b
console.log(path.join('a', 'b'));


//返回绝对路径d:\node练习\modules\path\b
console.log(path.resolve('a', 'b'));

//返回文件名字aa.js
console.log(path.basename('a/b/aa.js'));

//返回文件类型
console.log(path.extname('a/b/aa.js'));

