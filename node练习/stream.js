var fs=require('fs');
var gulp=require('gulp');
/*var rs=fs.createReadStream('./school.txt',{encodeing:'utf-8'});
var content='';
rs.on('data',function(chunk){
    content+=chunk;
});
rs.on('end',function(){
    console.log(content);
});*/



//两种写法都可以
/*fs.createReadStream('./school.txt',{encodeing:'utf-8'}).pipe(fs.createWriteStream('./school1.txt'));

fs.readFile('./school.txt','utf-8',function(err,chunk){
    fs.writeFileSync('./school2.txt',chunk,'utf-8');
});*/
//两种写法都可以





//fs.createWriteStream('./school1.txt',{flags:"a"}).write('6666');
//fs.createReadStream('./美术.psd').pipe(fs.createWriteStream('./haha.psd'));

//gulp.src('./zyy/**/*.*').pipe(gulp.dest('./haha'));


//var statInfo = fs.statSync('./school.txt');
//console.log(statInfo.isDirectory());

/*
fs.rename('./school1.txt','./zyy/school1.txt',function(){

});*/

/*const Readable = require('stream').Readable

const readable = Readable()

readable.push('a')
readable.push('b')
readable.push(null)

readable.on('data', function(data){
    console.log(data.toString())
}  )*/



/*
gulp.src('./school.txt').on('data',function(file){
    console.log(file.contents.toString());
});*/
