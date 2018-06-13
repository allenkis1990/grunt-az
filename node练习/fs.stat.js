/**
 * Created by admin on 2017/12/12.
 */
var fs=require('fs');


/*
fs.stat('./hahahahaha',function(err,stat){
    console.log(stat);
});
*/
 fs.readdir('./hahahahaha',function(err,files){
 console.log(files);
     files.forEach((item)=>{
         var isDirectory=fs.lstatSync('./hahahahaha/'+item).isDirectory();
         var isFile=fs.lstatSync('./hahahahaha/'+item).isFile();
         if(isDirectory){
             console.log(item+'是否是文件夹:'+isDirectory);
         }
         if(isFile){
             console.log(item+'是否是文件:'+isFile);
         }
     });
 });

