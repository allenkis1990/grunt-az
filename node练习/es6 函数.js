/*function aa(a=1,b=2){
    return a+b;
}

console.log(aa());*/

/*
function aa({a,b=5}) {
    return a + b;
}

console.log(
    aa({a:1})
);
*/

/*var fn=(a,b)=>{
    return a+b;
}
console.log(fn(1, 2));*/

/*let arr=[{name:'allen',age:18},{name:'allen22',age:20}];
arr.forEach((item)=>{
    console.log(item);
});*/


/*let shuxing='change';
let obj={
    [shuxing]:'allen'
};

console.log(obj.change);*/


let a={name:'allen'};
let b=a;

console.log(Object.is(a, b));
