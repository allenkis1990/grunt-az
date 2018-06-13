
var fs=require('fs');
var gulp=require('gulp');
var path=require('path');


//递归的方式
var fileArr=[];
function dg(filePath){

    if(fs.existsSync(filePath)){


        fs.readdirSync(filePath).forEach(function(itemPath){
            var subDir=filePath+'/'+itemPath;
            if( fs.lstatSync(subDir).isDirectory() ){
                fileArr.push(subDir);
                dg(subDir);
            }else{
                fileArr.push(subDir);
            }
        });
    }


}
dg('./testAfterMod');


setTimeout(function(){
    console.log(fileArr);
},5000);




//使用gulp的方式递归（更简单）
/*var haha=[];
var stream=gulp.src('./testAfterMod/!**');

stream.on('data',function(chunk){
    var truePath=path.relative('./testAfterMod',chunk.path);
    var parent=truePath.split('\\');
    haha.push({parentId:parent[parent.length-2]?parent[parent.length-2]:null});
    //console.log(haha);
});

stream.on('end',function(){
    console.log(haha);
});*/
