## Promise的兼容情况
### 1、在项目中使用到了ES6的Promise对象，有一些浏览器是不支持Promise对象的（例如IE内核，老旧版本浏览器，360兼容模式）
### 2、通过can i use网站[https://caniuse.com/](https://caniuse.com/)查到的ES6 promise的支持情况
![](images/promise兼容.png)
### 3、要是在项目中使用Promsie对象，解决方法是使用第三方插件bluebird.js（github地址：[https://github.com/petkaantonov/bluebird](https://github.com/petkaantonov/bluebird)）
### 4、总结：bluebird中对ES6的原生Promise进行了封装，解决了浏览器兼容性问题