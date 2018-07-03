var util=require('util');

function Parent(){
    this.name='parent';
    this.age='88';
    this.fuck='fuck';
}
Parent.prototype.fn=function(){
    console.log(this.name,this.age);
}
function Child(){

    //如果要继承parent里的东西要call
    //Parent.call(this);


    this.name='child';
    this.age='18';
}

//如果只继承Parent的原型不继承里面的东西用这个
util.inherits(Child,Parent);
var child=new Child();
child.fn();
console.log(child);