/**
 * Created by admin on 2015/6/15.
 */

angular.module("xxx",[]); //这个是必写的，XXX代表ng-app="xxx"

angular.module("xxx。11",[]).controller("controller-name",function($scope){});//定义一个控制器,controller-name为
 // ng-controller="controller-name"  里面可传一个$scope

angular.module("xxx",['xxx。11']).directive("directiveName",function(){
    return:{
        restrict:"E", //E代表元素标签  C代表元素类名 A代表元素属性名 M代表注释

        template : "<div></div>", //模板为一个div

            link : function(scope,element,attrs){ //link里写业务 这里的element指的是这个模板div
            setInterval(function(){
                var d = new Date();
                element.text(d.toString());
            },1000);
        }
    }
})



1 module 后面的数组 //传入要依赖的模块名字
2 link参数的意思  //scope代表作用域 attrs代表创建的这个元素的属性
3 injector  invoke("a","b",function(a,b){}) //前面传入a,b后  后面function参数里的名字就可以自己定义
4 template templateUrl // 一个短一个长  功能都是把功能赋给创建的元素

