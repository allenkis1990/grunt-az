var fs=require('fs');
var eventEmitter=require('events').EventEmitter;
var util=require('util');



var watchDir='../../old';
var destDir='../../new';
function Watcher(watchDir,destDir){
    this.watchDir=watchDir;
    this.destDir=destDir;
}
util.inherits(Watcher,eventEmitter);

Watcher.prototype.watch=function(){
    fs.readdir(this.watchDir,function(err,files){
        for(var i in files){
            //console.log(files[i]);
            watcher.emit('rename',files[i]);
        }
    });
};
Watcher.prototype.start=function(){
    var that=this;
    fs.watch(this.watchDir, function () {
        that.watch();
    });
};




var watcher=new Watcher(watchDir,destDir);

watcher.on('rename',function(filePath){
    var oldPath=this.watchDir+'/'+filePath;
    var newPath=this.destDir+'/a'+filePath;
    console.log(oldPath);
    console.log(newPath);
    fs.rename(oldPath,newPath,function(){
        console.log('success!');
    });
});




//开启监听
watcher.start();
