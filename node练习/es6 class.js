class Allen{
    name(val){
        console.log(val);
        return val;
    }

    copy(){
        return this.name('copyLWH');
        //console.log(this.name('copyLWH'));
    }

    constructor(a,b){
        this.a=a;
        this.b=b;
    }

    init(){
        console.log(this.a+this.b);
    }
}

var allen=new Allen(1,9);
allen.name('lwh');
allen.copy();

class Add extends Allen{
    fuck(){
        return this.name('fuck');
    }
}
var add=new Add(2,3);
add.name('add');
add.fuck();

allen.init();
add.init();

