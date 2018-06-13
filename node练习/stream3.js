var fs=require('fs');
var rs=fs.createReadStream('./txt/3.txt');
var ws=fs.createWriteStream('./txt/allen.txt');

rs.setEncoding('utf8');//设置文件编码或者上面加一个对象{setEncoding:'utf8'}

/*rs.pause();//暂停
setTimeout(function(){
    //恢复
    rs.resume();
},3000);*/


rs.on('data',function(data){
    //如果缓存区满了停止写入
    var bol=ws.write(data);
    if(!bol){
        rs.pause();
    }
});

ws.on('drain',function(){
    //缓存区被清空的时候恢复写入
    rs.resume();
});




rs.on('end',function(){
    console.log('文件读取完毕');
    ws.end();
});








rs.on('error',function(){
    console.log('文件读取失败');
});



//这句直接拷贝
//rs.pipe(ws);