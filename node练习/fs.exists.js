/**
 * Created by admin on 2017/12/12.
 */
var fs=require('fs');


/*
fs.stat('./hahahahaha',function(err,stat){
    console.log(stat);
});
*/
console.log(__filename);
console.log(__dirname);
fs.exists('dirHtml',function(exists){
     console.log(exists);
 });

