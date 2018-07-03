/**
 *aaa.bind如果第三个参数b不传那么fn调用的时候999就作为第三个参数
 * aaa.bind如果a,b都不传那么可以全部放到fn里面传
 */
function aaa(a,b){
    console.log(this.name,a,b);
}

var obj={name:'allen'}
var fn=aaa.bind(obj,'111');
fn('999');