var stream=require('stream');
var ws=stream.Writable();
//console.log(rs);
ws._write=function(data,enc,next){
    console.log(1111);
    next();
};
//ws.write('11');
'data'.pipe(ws);
ws.end();







