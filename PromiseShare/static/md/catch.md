## Promise.prototype.catch()
### Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
```
function fn(){
    return new Promise(function(resolve,reject){
        reject('reject!!!');
    });
}
fn().catch(function(e){
    console.log(e);
})
//fn().then(function(){
//
//},function(data){
//  console.log(data);//reject!!!
//})
```
### then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。并且reject的then里无法接收到错误，只能catch能接收
```
function fn(){
    return new Promise(function(resolve,reject){
        console.log(a);
        resolve('resolve!!!');
    });
}
fn().then(function(){

},function(data){
  console.log(data);//运行抛出的错误这里接收不到
}).catch(function(e){
  console.log(e);//ReferenceError: a is not defined
})
```