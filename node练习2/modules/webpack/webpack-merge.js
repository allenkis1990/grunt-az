/**
 * Created by admin on 2018/5/27.
 */
var merge=require('webpack-merge');
//console.log(merge);
var obj1={name:'obj1',modules:{
    loaders:[
        {name:'loader1'},
        {name:'loader2'}
    ]
}}
var obj2={name:'obj2',modules:{
    loaders:[
        {name:'loader3'}
    ]
}}
var me=merge(obj1,obj2);
console.log(JSON.stringify(me));