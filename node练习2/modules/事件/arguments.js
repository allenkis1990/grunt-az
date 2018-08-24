function aaa(){
    console.log(arguments)

    console.log(
        //可以把类数组转化成数组
        Array.prototype.slice.call(arguments)
    );

}

aaa(1,2,3);


//根据Function.prototype.bind改造
function Fn(){
    this.say=function(name,age){
        console.log(name,age,this.fuck);
    }
}
Fn.prototype.bind=function(context,methodName){
    var _self=this;
    //从第二个开始截因为一会外面第一场数是上下文
    var args=Array.prototype.slice.call(arguments,2);
    return function(){
        var subArgs=Array.prototype.slice.call(arguments);
        _self[methodName].apply(context,args.concat(subArgs));
    }
};


var fn=new Fn();
var obj={fuck:'fuck'};
var a=fn.bind(obj,'say','allen');
a(18);