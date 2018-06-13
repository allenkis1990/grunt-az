var jade=require('jade');
var fs=require('fs');

var jadeContent=fs.readFileSync('./jade/index1.jade','utf-8');


var data={
    name:'allen',
    age:18,
    arr:[{name:'allen'},{name:'jack'},{name:'apple'}]
};

var compileJade=jade.compile(jadeContent,{filename:'.'})(data);
console.log(compileJade);
//var log=console.log.bind(console);
//console.log(log(6666));


