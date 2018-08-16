var mysql=require('mysql');
//pool不用连接也不用断开全自动
var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    port:3306,
    database:'nodetest'
});

var adduser={
    name:'lwh',
    account:'lwh123456',
    password:'123456'
};
/**
 * 如果用户存在提示无法插入 如果不存在则插入数据
 */
var findUserListSql='select * from user';
pool.query(findUserListSql,function(err,result,keys){
    if(err){
        console.log(err);
    }else{
        var bol=isExist(result);
        if(bol){
            console.log('用户已存在，无法插入');
        }else{
            var addUserSql='insert into user (name,account,password) values (?,?,?)';
            //第二个参数是一个数组 替换问号
            pool.query(addUserSql,[adduser.name,adduser.account,adduser.password],function(er,data){
                if(er){
                    console.log(er);
                }else{
                    console.log(data);
                }
            });
        }
    }
});


function isExist(arr){
    var result=[];
    arr.forEach(function(item){
        if(item.account===adduser.account&&item.password===adduser.password){
            result.push(item);
        }
    });
    if(result.length>0){
        return true;
    }else{
        return false;
    }
}



