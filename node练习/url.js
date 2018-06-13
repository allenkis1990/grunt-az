var url=require('url')

//要加 http://
var obj=url.parse('http://www.hehe.com/12/34?a=1&b=2',true);
//var obj=url.resolve('http://www.hehe.com','haha');//输出http://www.hehe.com/haha
console.log(obj);
