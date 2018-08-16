var express =require('express');
var app=express();
var path=require('path');
var url=require('url');
var formidable = require('formidable');
var mysql=require('mysql');
var staticPath=path.join(__dirname,'..','..','static');
//指定静态资源目录
app.use(express.static(staticPath));

var htmlPath=path.join(__dirname,'注册.html');
app.get('/',function(req,res){
    res.sendFile(htmlPath);
});



var mysqlOptions={
    host:'localhost',
    user:'root',
    password:'123456',
    port:3306,
    database:'nodetest'
};

var pool=mysql.createPool(mysqlOptions);

var selectUserListSql='select * from user';
var addUserSql='insert into user (name,account,password) values(?,?,?)';
app.post('/web/register',function(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fileds,files){
        if(err){
            console.log(err);
        }else{

            pool.query(selectUserListSql,function(er,userList,keys){
                //console.log(userList);
                var bol=isExist(userList,fileds);
                if(bol){
                    res.send({code:'500',info:'当前用户已存在请直接登陆'});
                }else{
                    pool.query(addUserSql,[fileds.username,fileds.account,fileds.password],function(error){
                        if(error){
                            res.send({code:'500',info:'服务错误！！！'});
                        }else{
                            res.send({code:'200',info:'注册成功！！！'});
                        }
                    });

                }
            });


            //console.log(fileds);
        }
    });


});


app.listen(8088,'192.168.28.251');

function isExist(arr,obj){
    var result=[];
    arr.forEach(function(item){
        if(item.name===obj.username){
            result.push(item);
        }
    });
    if(result.length>0){
        return true;
    }else{
        return false;
    }
}