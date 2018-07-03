var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var fs=require('fs');


app.use(express.static(path.resolve('..','..','static')));
app.use(bodyParser.urlencoded({extended:true}));


var users=[{name:"allen",id:'1',age:18},{name:"joy",id:'2',age:20},{name:"tom",id:'3',age:22}];
app.delete('/delete/:id',function(req,res){

    if(req.params.id){

        var index=findIndex(users,req.params);
        if(index!==null){
            users.splice(index,1);
            res.send({info:users,message:'删除成功！'});
        }else{
            res.send('没有可删除的学员');
        }



    }else{
        res.send('用户id不能为空');
    }


});
function testNull(obj){
    return JSON.stringify(obj)==='{}' || obj===undefined || obj===null || obj==='';
}
function findIndex(arr,obj){
    var index=null;
    arr.forEach(function(item,ItemIndex){
        if(obj.id==item.id){
            index=ItemIndex;
        }
    });
    return index;
}















app.get('/',function(req,res){
    fs.readFile('../../static/html/restful.html','utf8',function(err,data){
        res.send(data);
    })
});

app.get('/js/jquery-1.9.1.js',function(req,res){
    fs.readFile('../../static/js/jquery-1.9.1.js','utf8',function(err,data){
        res.send(data);
    })
});
app.listen(8080,'192.168.0.109');
