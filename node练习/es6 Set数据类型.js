let obj={name:11};
//不重复的数据类型 循环只能用forEach 或者for(let temp of arr){}
const arr=new Set([obj,{name:66},22]);

console.log(arr);



for(let item of arr.entries()){
    console.log(item);
}

//如果加入对象的话那么要把对象赋值给一个变量
console.log(arr.has(obj));

//arr.clear();

arr.add(obj);
console.log(arr);

/*arr.forEach((item,index,arr)=>{
    console.log(index);
});*/


