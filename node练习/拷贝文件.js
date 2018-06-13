/**
 * Created by admin on 2017/12/12.
 */
var fs=require('fs');



/*try{
    var aaa=fs.readFileSync('6666.html','utf8');
}catch(e){
    console.log('未找到文件');
}*/


function copy(src,dest,dirName){
    fs.readFile(src,'utf8',function(err,data){
        console.log(data);

        fs.mkdir(dirName,function(){

            console.log('创建文件夹成功');

            fs.writeFile(dirName+dest,data,'utf8',function(){
                console.log(11111);
            });


        });
    });
}
copy('1.txt','3.txt','hahahahaha/');
//console.log(1);