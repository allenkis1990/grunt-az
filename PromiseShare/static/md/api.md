## 1.Promise的API
### 1.Promise.prototype.then()//核心部分
### 2.Promise.prototype.catch()//异常捕获
### 3.Promise.all()//多个promise执行完返回结果
### 4.Promise.race()//最先执行的promise结果
### 5.Promise.resolve()//生成一个成功的promise对象
### 6.Promise.reject()//生成错误的一个promise对象

## 2.基本用法
```
let p = new Promise(function(resolve,reject){
    resolve('hahaha');
})
p.then(function(data){
    console.log(data);
})
//function fn(){
//    return new Promise(function(resolve,reject){
//               resolve('hahaha');
//           })
//}
//fn().then(function(data){
//    console.log(data);
//});
```

