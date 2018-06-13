const eventsFn=require('events');
const events=new eventsFn();
//只能注册一次监听函数
//events.setMaxListeners(1);
//注册事件
function lwh(){
    console.log('lwh');
}
function allen(){
    console.log('allen');
}
events.addListener('lwh',lwh);
events.addListener('lwh',allen);
//注册一次事件
events.once('lwh1',function(){
    console.log('once');
});





//调用事件
events.emit('lwh');
events.emit('lwh');
events.emit('lwh1');


//移除事件
//events.removeListener('lwh',lwh);
//events.emit('lwh');




//移除所有事件
//events.removeAllListeners('lwh');

//查看绑定的监听函数
console.log(events.listeners('lwh'));


