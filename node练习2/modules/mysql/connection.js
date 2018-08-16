var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:3306,
    database:'nodetest'
});
connection.connect();


var findUserListSql='select * from user';
connection.query(findUserListSql,function(err,result,keys){
    if(err){
        console.log(err);
    }else{
        result.forEach(function(item){
            console.log(item);
        });
    }
    //connection.destroy();
});
