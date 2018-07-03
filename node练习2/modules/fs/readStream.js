var fs=require('fs');
var rs=fs.createReadStream('./index.txt',{
    //flags:'w',//默认w是清空并且写入   a是追加
    encoding:'utf-8',//编码
    //start:0,//开始字节
    //end:1//结束字节
    highWaterMark:1//一次最多传输1字节
});

rs.on('data',function(data){

    rs.pause();//暂停读取
    setTimeout(function(){
        rs.resume();//恢复读取
    },3000);
    console.log(data);
});

rs.on('end',function(){
    console.log('读取完成');
});
rs.on('error',function(err){
    console.log(err);
});
