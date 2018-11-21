## 自己实现一个简单的then方法
### (1)首先要新建一个构造函数EasyPromise
### (2)实现then方法
### (3)then方法的第一个参数function实际上就是resolve方法，第二个参数function是reject方法
### (4)调用构造函数接收的promiseFn函数
```
function EasyPromise(promiseFn){
    this.promiseFn = promiseFn;
}

EasyPromise.prototype.then = function(resolveCallback,rejectCallback){
    let resolveFn=function(){};
    let rejectFn=function(){};
    this.status='pending';
    if(resolveCallback&&this.status==='pending'){
        resolveFn=resolveCallback;
        this.status='fulfilled';//已完成
    }
    if(rejectCallback&&this.status==='pending'){
        rejectFn = rejectCallback;
        this.status='rejected';//已拒绝
    }
    this.promiseFn(resolveFn,rejectFn)
}



function p (type){
    return new EasyPromise(function(resolve,reject){
        setTimeout(function(){
            if(type==='resolve'){
                resolve('resolve!!!');
            }
            if(type==='reject'){
                resolve('reject!!!');
            }
        },2000)
    });
}

p('resolve').then(function(data){
    console.log(data);
},function(e){
    console.log(e);
})
```

