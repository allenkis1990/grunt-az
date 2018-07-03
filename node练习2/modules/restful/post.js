var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var fs=require('fs');


app.use(express.static(path.resolve('..','..','static')));
app.use(bodyParser.json());


var users=[{name:"allen",id:'1'},{name:"joy",id:'2'},{name:"tom",id:'3'}];
app.post('/post',function(req,res){
    if(testNull(req.body)){
        res.send('请传参数!!!');
    }else{
        var index=findIndex(users,req.body);
        if(index!==null){
            res.send('该用户已存在不用新增');
        }else{
            users.push(req.body);
            res.send({info:users,message:'新增成功！'});
        }
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
