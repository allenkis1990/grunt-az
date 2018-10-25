const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

const main = async function (ctx, next) {
    if(ctx.request.path==='/'){
        ctx.response.type = 'html';
        ctx.response.body = await new Promise(function(resolve,reject){
            fs.readFile('./index.html', 'utf8',function(err,data){
                resolve(data);
            })
        });
    }else{
        let filename = 'aaa';
        ctx.set('Content-disposition','attachment;filename=' + filename + '.jpg');
        //ctx.response.type = 'application/x-jpg';//也可以
        ctx.response.type = 'image/jpeg';
        ctx.response.body = await new Promise(function(resolve,reject){
            fs.readFile('./afei.jpg',function(err,data){
                resolve(data);
            })
        });

    }

};

app.use(main);

app.listen('8088','192.168.28.251');