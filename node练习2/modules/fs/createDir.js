var fs=require('fs');


/**
 *
 * @param dirName 要创建的文件夹
 * @param base 指定一个要创建文件夹的基准路径
 * base不传的话默认当前js所在的路径
 * createFile 为true时创建文件 false纯创建文件夹
 */
function smartMkdir(dirName,base,createFile){
    var b='';
    var dirArr;
    return function (){

        if(!dirName){
            throw Error('must have a dirName');
            return false;
        }

        if(!base){
            base='.';
        }
        if(createFile){
            dirArr=dirName.split('/');
            dirArr=dirArr.slice(0,dirArr.length-1)
        }else{
            dirArr=dirName.split('/');
        }

        dirArr.forEach(function(item){
            //console.log(item);
            //a(item,b);
            a(item,b);
        });

        if(createFile){
            fs.writeFile(base+'/'+dirName,'123','utf-8',function(){
                console.log('创建文件成功');
            })
        }

        //fs.mkdir(base+'a/b/c');
    }();



    function a(item){

        b=b+'/'+item;
        var path=base+b;
        //console.log(path);

        if(!fs.existsSync(path)){
            var bol=fs.mkdirSync(path);
            //console.log(bol);
            if(bol===undefined){
                console.log('创建'+path+'成功！！！！');
            }
        }else{
            console.error('已存在'+path);
        }

    }


}


//
//fs.readdir('../express',function(err,dir){
//    dir.forEach(function(item){
//        fs.stat('../express/'+item,function(err,stat){
//            if(stat.isFile()){
//                smartMkdir('express/'+item,'aaa',true);
//            }
//        })
//    })
//});