//创建一个继承obj原型的对象 然后和obj对象合并 这样就继承了obj也继承了obj的原型
//for of循环不会把prototype里的属性一起循环出来
function deepCopy(obj){
    if(Object.prototype.toString.call(obj)==='[object Object]'){
        var newObj={};
        for(let [key,val] of Object.entries(obj)){
            if(typeof val==='object'){
                newObj[key]=deepCopy(val);
            }else{
                newObj[key]=val;
            }
        }
        return newObj;
    }else if(Object.prototype.toString.call(obj)==='[object Array]'){
        var newObj=[];
        for(let [key,val] of obj.entries()){
            if(typeof val==='object'){
                newObj[key]=deepCopy(val);
            }else{
                newObj[key]=val;
            }
        }
        return newObj;
    }else{
        return;
    }
}

var obj={name:'allen',age:18};
//设置obj原型属性
Object.setPrototypeOf(obj,{a1:{name:'111'}});

var copyProto=deepCopy(Object.getPrototypeOf(obj));//深拷贝obj的原型
var newObj=Object.assign(
    Object.create(copyProto),//创建一个继承obj原型的对象
    deepCopy(obj)//深拷贝obj对象
)
obj.a1.name=2222
console.log(newObj.a1.name);//111