var arr=['a','b','c'];

function b(count,path){
    if(count<arr.length){
        path+=arr[count];
        count++;
        console.log(path);
        b(count,path);
    }
}
b(0,'');
