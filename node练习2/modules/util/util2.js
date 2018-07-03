var util=require('util');


var obj={
    name:'allen',
    age:18,
    obj:{name:[{a:'11'}]}
};

var arr=['a','b','c',{name:'aaa',obj:{name:'bb'}}];
//转字符串
console.log(util.inspect(arr));
//depth 深层次的数组 对象嵌套可以转出来
console.log(util.inspect(obj,{depth:3}));