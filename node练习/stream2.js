var fs=require('fs');
var rs=fs.createReadStream('./txt/3.txt');
rs.setEncoding('utf8');//设置文件编码或者上面加一个对象{setEncoding:'utf8'}

/*rs.pause();//暂停
setTimeout(function(){
    //恢复
    rs.resume();
},3000);*/


rs.on('data',function(data){
    console.log(data);
});
rs.on('end',function(){
    console.log('文件读取完毕');
});








rs.on('error',function(){
    console.log('文件读取失败');
});