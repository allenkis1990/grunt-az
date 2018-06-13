let obj=new Proxy({
    oname:'allen',
    oage:18
},{
    get:function(target,key,property){
        console.log(target);
        return target[key]+'66';
    },
    set:function(target,key,value,ov){
        console.log(`新的${key}是${value}`);
        return target[key]=value;
    }
});

console.log(obj.oname);

obj.oname='fuck';
obj.oage=88;
console.log(obj.oname);
//console.log(obj);
