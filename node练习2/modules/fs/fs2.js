var fs=require('fs');
//是否是文件
fs.stat('./fs1.js',function(err,state){
    console.log(state.isFile());
});
//是否是文件夹
fs.stat('../fs',function(err,state){
    console.log(state.isDirectory());
});

//var obj1= fs.statSync('../fs');
//console.log(obj1.isFile());