## 1.Promise.resolve()
### 有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。以下归纳几种用法
### (1)jQuery 生成的deferred对象，转为一个新的 Promise 对象
```
let getData = $.ajax('data/menu.json');
let p=Promise.resolve(getData);
p.then(function(data){
    console.log(data);
})
```

### (2)如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
```
let pObj = new Promise(function(resolve,reject){
    resolve('resolve!!!');
})
let p=Promise.resolve(pObj);
p.then(function(data){
    console.log(data);//resolve!!!
})
```

### (3)参数是一个thenable对象
```
let thenable = {
    then:function(resolve,reject){
        resolve('11111');
    }
}
let p=Promise.resolve(thenable);
p.then(function(data){
    console.log(data);//111111
})
```

### (4)参数不是具有then方法的对象，或根本就不是对象
```
let str = 'abc';
let p=Promise.resolve(str);
p.then(function(data){
    console.log(data);//abc
})
```

### (5)不带有任何参数
```
let p=Promise.resolve();
p.then(function(data){
    console.log(data);//undefined
})
```

## Promise.reject()
### Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

### (1):
```
let p=Promise.reject('出错了');
p.catch(function(e){
    console.log(e);
})
```

### (2):
```
let p=Promise.reject('出错了');
p.catch(function(e){
    console.log(e);
})
```