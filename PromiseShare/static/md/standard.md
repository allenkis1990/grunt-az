## Promise基本的规范
### (1)一个Promise可能有三种状态：等待（pending）、已完成（fulfilled）、已拒绝（rejected）。
### (2)一个Promise的状态只可能从“等待”转到“完成”态或者“拒绝”态，不能逆向转换，同时“完成”态和“拒绝”态不能相互转换。
### (3)Promise必须实现then方法（可以说，then就是Promise的核心），而且then必须返回一个Promise，同一个Promise的then可以调用多次，并且回调的执行顺序跟它们被定义时的顺序一致。
### (4)then方法接受两个参数，第一个参数是成功时的回调，在Promise由“等待”态转换到“完成”态时调用，另一个是失败时的回调，在Promise由“等待”态转换到“拒绝”态时调用。
![](images/promiseStatus.png)