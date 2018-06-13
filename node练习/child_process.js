/**
 * Created by Allen on 2018/4/8.
 */
var child=require('child_process');
var a=child.execFile('console.bat',{encoding:'utf8',cwd:'./'},function(a,b,c){
    //console.log(b);
});
