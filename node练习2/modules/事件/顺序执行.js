/**
 * 顺序执行
 * 1给a赋值为2
 * 2过2秒后把a+1
 * 3过1秒后把a+‘lwh’
 * 4输出a
 */

function step1(){
    var a=2;
    next(a);
}
function step2(a){
    setTimeout(function(){
        a=a+2;
        next(a);
    },2000);
}
function step3(a){
    setTimeout(function(){
        a=a+'she';
        next(a);
    },1000);
}
function step4(a){
    console.log(a);
    next(a);
}


var tasks=[
    step1,
    step2,
    step3,
    step4
];
function next(arg){
    var currentTask=tasks.shift();
    if(currentTask){
        currentTask(arg);
    }
}
next();