var minimist=require('minimist');
var options=minimist(process.argv.slice(2));


//node xxx.js --lwh caonima
console.log(options.lwh);//输出caonima
