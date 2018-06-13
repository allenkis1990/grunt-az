
let mark=666;

function step1(resolve,reject){
    console.log('第一步');
    if(mark===666){
        resolve('第一步数据');
    }else{
        reject('第一步错误');
    }
}

function step2(resolve,reject){
    console.log('第二步');
    if(mark===666){
        resolve('第二步数据');
    }else{
        reject('第二步错误');
    }
}

function step3(resolve,reject){
    console.log('第三步');
    if(mark===666){
        resolve('第三步数据');
    }else{
        reject('第三步错误');
    }
}

new Promise(step1).then(function(data){
    console.log(data);
    return new Promise(step2);
}).then(function(data){
    console.log(data);
    return new Promise(step3);
}).then(function(data){
    console.log(data);
});
