var fs=require('fs');
//var data=fs.readFileSync('html/a1.html','utf-8');
//fs.writeFile('html/copy.html',data,'utf-8');

/*
fs.open('./school.txt', 'a', function(err, fd) {
    if (err) {
        throw err;
    }
    console.log('open file success.');
    var buffer = 'haha';
    // 读取文件
    fs.write(fd, buffer, 0, 8, 0, function(err, bytesRead, buffer) {
        if (err) {
            throw err;
        }
        // 打印出buffer中存入的数据
        //console.log(bytesRead, buffer.slice(0, bytesRead).toString());

        // 关闭文件
        fs.close(fd);
    });
});*/


/*fs.readdir('./lwh',function(err,files){
    if(files!==undefined){
        console.log('文件夹已存在');
        console.log(files);
    }else {
        fs.mkdir('./lwh', function (err) {
            if (err) {
                throw err;
            }
            console.log('创建成功！');
        });
    }
    //console.log(files);
});*/
fs.readdir('./lwh', function (err, files) {
    if (files !== undefined) {
        console.log('有文件');
        console.log(files);
        for(var i=0;i<files.length;i++){
            if(files[i].split('.').length>1){
                fs.unlinkSync('./lwh/'+files[i]);
            }else{
                fs.rmdirSync('./lwh/'+files[i]);
            }
        }
        fs.rmdirSync('./lwh');
    } else {
        fs.rmdirSync('./lwh');
    }
    //console.log(files);
});





/*fs.mkdir('./lwh',function(err){
    if(err){
        throw err;
    }
    console.log('创建成功！');
});*/
