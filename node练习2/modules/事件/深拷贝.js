
//for in循环会把prototype里的属性一起循环出来
function Parent(){
    this.name='parent';
    this.age=88;
}

Parent.prototype.say=function(){
    console.log(this.name,this.age);
}
Parent.prototype.obj={
    name:'allen',
    obj:{name:'111'}
}
Parent.prototype.arr= [1,2,3];



function Child(){

}

function deepCopy(obj){
    if(typeof obj==='object'){
        var newObj=obj.hasOwnProperty('length')?[]:{};

        for(var i in obj){
            if(typeof obj[i]==='object'){
                newObj[i]=deepCopy(obj[i]);
            }else{
                newObj[i]=obj[i];
            }
        }
        //console.log(newObj);
        return newObj;
    }else{
        return;
    }
}

Child.prototype=deepCopy(Parent.prototype);
Child.prototype.haha=function(){
    console.log(1);
}
console.log(Parent.prototype);
console.log(Child.prototype);
