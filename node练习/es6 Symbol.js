var obj={a:'allen',b:'jack'};

var c=Symbol('c');
var d=Symbol('d');

obj[c]='fuck';
obj[d]='shit';


//Symbol类型的属性无法输出被隐藏只能单独输出
for(let item in obj){
    console.log(obj[item]);
}


console.log(obj[c]);
console.log(obj[d]);
console.log(obj);
