function Parent(){
    this.name='parent';
    this.age=88;
}
Parent.prototype.say=function(){
    console.log(this.name,this.age);
}


function Child(){
    this.name='child';
    this.age=18;
}

function Temp(){

}
Temp.prototype=Parent.prototype;
Child.prototype=new Temp();

var child=new Child();
child.say();