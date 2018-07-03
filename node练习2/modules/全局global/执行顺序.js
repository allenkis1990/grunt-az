setTimeout(function(){
    console.log('我是timeout');
},0);

//一般是setImmediate比timeout先执行 但是也不一定
setImmediate(function(){
    console.log('我是明天执行');
});




process.nextTick(function(){
    console.log('我是今天的最后执行');
});

console.log('我是马上执行');