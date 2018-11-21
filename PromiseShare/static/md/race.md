## Promise.race()
### Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
### 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
### Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，race方法会将参数转为 Promise 实例，再进一步处理。
### 基本用法
```
let p1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('p1');
    },1000)
})
let p2 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('p2');
    },2000)
})
let p3 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('p3');
    },3000)
})
Promise.race([p1,p2,p3]).then(function(data){
    console.log(data);
})
```

### 应用
### 如果ajax请求指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。这里ajax请求用setTimeout模拟
```
let getData = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('data!!!!!');
    },10000)
})
let timeoutHandler = new Promise(function(resolve,reject){
    setTimeout(function(){
        reject('超时!!!!!');
    },5000)
})
Promise.race([getData,timeoutHandler]).then(function(data){
    console.log(data);
}).catch(function(e){
    console.log(e);//超时
});
```

