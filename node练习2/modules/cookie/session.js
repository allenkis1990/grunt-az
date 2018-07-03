var express=require('express');
var app=express();
var session=require('express-session');


/**
 * session实现原理
 * 生成一个cookie {connect.sid=乱码} 这个乱码在服务端就表示{isLogin:true,userName:'xxx'}
 * 这个cookie设置了HttpOnly不能读不能写
 * 这样只有服务端知道这个乱码是什么意思 客户端无法识别也无法修改
 *
 */

app.use(session({
    secret:'lwh',//session的密码建议使用随机数
    cookie:{
        maxAge:1000*10*100
    },
    //name:'sss'//默认为connect.sid
    //rolling:true,//每个session都重新设置一个cookie
    resave:true,//即使没修改也保存session的值
    saveUninitialized:true//保存新创建但未修改的session值
}));

app.get('/',function(req,res){
    if(req.session.isLogin){
        res.send('欢迎回来！'+req.session.userName);
    }else{
        req.session.isLogin=true;
        req.session.userName='刘伟恒';
        res.send('现在登陆！');
    }
});


app.listen(8081,'192.168.0.106');