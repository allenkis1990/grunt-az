
var minimist = require('minimist');
//console.log(process.argv);
var arg=minimist(process.argv.slice(2));
console.log(arg);
//node aa.js -a 1 -b 2 --arr=fuckarr 1 2 3 ({a:1,b:2,arr:fuckarr,_:[1,2,3]})