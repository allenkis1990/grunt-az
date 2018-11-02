## Promise.prototype.then()
### Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
### then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
### resolve与reject:
```
function fn(type){
    return new Promise(function(resolve,reject){
        if(type==='resolve'){
            resolve('resolve!!!');
        }else{
            reject('reject!!!');
        }
    })
}
fn('resolve').then(function(resolveData){
    console.log(resolveData);
},function(rejectData){
    console.log(rejectData);
})
```
### 链式调用:
### 1:
```
function fn(){
    return new Promise(function(resolve){
        resolve('data1');
    })
}
fn()
.then(function(data){
    console.log(data);//data1
    return 'data2';
})
.then(function(data){
    console.log(data);//data2
    return 'data3';
})
.then(function(data){
    console.log(data);//data3
});
```
### 2:
```
function fn(){
    return new Promise(function(resolve){
        resolve('data1');
    })
}
fn()
.then(function(data){
    console.log(data);//data1
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve('data2');
        },3000)

    });
})
.then(function(data){
    console.log(data);//data2
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve('data3');
        },3000)
    });
})
.then(function(data){
    console.log(data);//data3
});
```

### 应用（统一返回的数据结构）:
```
function getData(url){
    return new Promise(function(resolve,reject){
        $.get(url).success(function(data){
            if(data.status){
                if(data.info.length){
                    resolve({info:data.info});
                }else{
                    reject({message:'暂无数据'});
                }
            }else{
                reject({message:'暂无数据'});
            }}).error(function(){
                reject({message:'服务调用失败'});
            });
        });

}
getData('data/thenDemo1.json')
.then(function(data){
    console.log(data);
},function(data){
    console.log(data.message);
});
```