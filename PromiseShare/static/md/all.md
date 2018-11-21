## Promise.all()
### Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
### 基本用法
```
const p = Promise.all([p1, p2, p3]),then(function(data){
    console.log(data);
});
```
### 上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，all方法会将参数转为 Promise 实例，再进一步处理。p的状态由p1、p2、p3决定，分成两种情况。
### （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
```
let p1 = new Promise(function(resolve,reject){
    resolve(1);
});
let p2 = new Promise(function(resolve,reject){
    resolve(2);
});
let p3 = new Promise(function(resolve,reject){
    resolve(3);
});
Promise.all([p1,p2,p3]).then(function(data){
    console.log(data);//[1,2,3]
});
```
### （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
```
let p1 = new Promise(function(resolve,reject){
    resolve(1);
});
let p2 = new Promise(function(resolve,reject){
    reject(2);
});
let p3 = new Promise(function(resolve,reject){
    resolve(3);
});
Promise.all([p1,p2,p3]).then(function(data){
    console.log(data);//报错
}).catch(function(e){
    console.log(e);//2
});
```

### 应用
### 有一个ajax请求需要请求参数a1,a2,a3，但是这三个也是需要分别调用三个ajax请求拿到，下面用setTimeout来模拟ajax拿a1,a2,a3的数据
### 方法1：
```
let beginTime = new Date().getTime();
let a1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve(['a1']);
    },2000)
});
a1.then(function(list){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            list.push('a2');
            resolve(list);
        },2000)
    });
}).then(function(list){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            list.push('a3');
            resolve(list);
        },2000)
    });
}).then(function(data){
    let useTime = new Date().getTime()-beginTime;
    console.log(data);
    console.log('请求共花费了:'+(useTime/1000)+'s');
    //doSomething...
})
```
### 方法2：
```
let list = [];
let beginTime = 0;
var watchObj={
    count:0
};
function watch(parent,key,fn){
    var v;
    //count.aaa放到外面输出是undefined
    v=parent[key]
    fn(v);
    Object.defineProperty(parent, key, {
        get: function () {
            return v;
        },
        set: function (nv) {
            //如果值没有改变不触发fn函数
            if(v===nv){
                return nv;
            }
            var ov=parent[key];
            v=nv;
            fn(nv,ov);
            return nv;
        }
    });
}
watch(watchObj,'count',function(nv,ov){
    //console.log(nv);
    if(nv===3){
        let useTime = new Date().getTime()-beginTime;
        console.log(list);
        console.log('请求共花费了:'+(useTime/1000)+'s');
        //doSomething...
    }
});


function counter(){
    beginTime = new Date().getTime();
    setTimeout(function(){
        list.push('a1');
        watchObj.count++;
    },2000);
    setTimeout(function(){
        list.push('a2');
        watchObj.count++;
    },2000);
    setTimeout(function(){
        list.push('a3');
        watchObj.count++;
    },2000);
}
counter();
```

### 方法3：
```
let a1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('a1');
    },2000)
});
let a2 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('a2');
    },2000)
});
let a3 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('a3');
    },2000)
});
let beginTime = new Date().getTime();
Promise.all([a1,a2,a3]).then(function(list){
    let useTime = new Date().getTime()-beginTime;
    console.log(list);
    console.log('请求共花费了:'+(useTime/1000)+'s');
    //doSomething...
});
```
