## 1.Promise是什么
### Promise 是异步编程的一种解决方案,一个 Promise 对象代表一个目前还不可用，但是在未来的某个时间点可以被解析的值。Promise表示一个异步操作的最终结果。早在1976年就有人提出Promise 的概念。之后的计算机语言发展中，很多语言都提供了与 Promise 相关的特性。而对于Javascript语言来说，最早让大家广泛接触的 Promise 相关的库是由 jQuery封装实现的 Deferred库，在现在ES6 将Promise写进了语言标准，统一了用法，原生提供了Promise对象。

## 2.为什么需要promise？
### 开发网站的过程中，我们经常遇到某些耗时很长的javascript操作。其中，既有异步的操作（比如ajax读取服务器数据），也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。通常的做法是，为它们指定回调函数（callback）。即事先规定，一旦它们运行结束，应该调用哪些函数。但是如果出现多层回调嵌套，绝对是一种糟糕的编程体验，于是便有了Promise的解决方案，Promise将原来回调地狱中的回调函数，从横向式增加巧妙的变为了纵向增长。以链式的风格，纵向的书写，使得代码更加的可读和易于维护。
### （1）以前写回调的代码
```
fn1(function(data1){
        //处理data1
        fn2(function(data2){
            //处理data2
            fn3(function(){
                //完成
            });
        });
});
```

### （2）现在写Promise的代码
```
promiseFn
.then(function(data1){
    //处理data1
    return fn2();
}).then(function(data2){
    //处理data2
    return fn3();
}).then(function(){
    //完成
});
```