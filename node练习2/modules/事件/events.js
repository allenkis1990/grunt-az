/**
 *on 和addListener是相同的效果
 */

var events=require('events');
var util=require('util');

function EventsEmit(){

}

util.inherits(EventsEmit,events);

var eventsEmit=new EventsEmit();

function listenerFn1(a){
    console.log(a);
}
function listenerFn2(a){
    console.log(a);
}
eventsEmit.on('say',listenerFn1);
eventsEmit.on('say',listenerFn2);
eventsEmit.emit('say',2);
eventsEmit.emit('say',3);

//删除单个事件
eventsEmit.removeListener('say',listenerFn1);

//删除所有事件
eventsEmit.removeAllListeners('say');

//只执行一次
eventsEmit.once('once',function(){
    console.log('once');
});

eventsEmit.emit('once');

