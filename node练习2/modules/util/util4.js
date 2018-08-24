function Parent(){
    this.name='parent';
}
Parent.prototype.fn=function(){
    console.log('parentFn');
}



function copyPrototype(Child,Parent){
    function Temp(){}
    Temp.prototype=Parent.prototype;
    Child.prototype=new Temp();
}

function Child(){}

copyPrototype(Child,Parent);
Child.prototype.fn=function(){
    console.log(2);
}

Child.prototype.fn();
Parent.prototype.fn();

