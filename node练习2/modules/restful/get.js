var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var fs=require('fs');


app.use(express.static(path.resolve('..','..','static')));
app.use(bodyParser.urlencoded({extended:true}));


var users=[{name:"allen",id:'1'},{name:"joy",id:'2'},{name:"tom",id:'3'}];
app.get('/get/:id',function(req,res){
    console.log(req.params.id);
    var user=users.filter(function(item){
        return item.id==req.params.id;
    });
    res.send(user.length>0?user[0]:'用户不存在');
});
















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
