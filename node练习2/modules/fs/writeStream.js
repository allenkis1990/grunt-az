/*
var fs=require('fs');

var ws=fs.createWriteStream('./ws.txt',{
    //flags:'w',//默认w是清空并且写入   a是追加
    //start:0,
    highWaterMark:1
});

var bol=ws.write('wsws',function(){
    console.log('写完的回调');
});
console.log(bol);
ws.on('drain',function(){
    console.log('全部传输完毕');
});
//ws.end('88888');//写入并结束
*/


/**
 *drain事件是默认一次写入是64KB写入超过64KB的文件的时候就会触发drain事件，表示64KB内存已经被写满
 *
 * 读一个mp3文件 为了怕传输中丢包 当ws.write(data)返回false说明文件还没有写完 先暂停读取 当每一次的64KB被写满再恢复读取数据
 *
 */
var fs=require('fs');
var rs=fs.createReadStream('./haha.mp3');
var ws=fs.createWriteStream('./copy.mp3');
rs.on('data',function(data){
    //console.log(data);
    var bol=ws.write(data);
    if(!bol){
        rs.pause();
    }
});


ws.on('drain',function(){
    console.log(1);
    rs.resume();
});

