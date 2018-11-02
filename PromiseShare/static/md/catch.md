## Promise.prototype.catch()

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
