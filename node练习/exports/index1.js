

var through2=require('through2');


module.exports=function(options){
    var op='';
    if(options){
        op=options;
    }
    return through2.obj(function(chunk,ent,next){
        console.log(chunk.contents.toString()+op);
        next();
    });
}
