const Koa = require('koa');
const app = new Koa();
const router = require('koa-route');//路由
const fs = require('fs');
const path = require('path');
const static = require('koa-static');//静态资源


const home = ctx=>{
    ctx.response.type = 'html';
    console.log(ctx.cookies);
    let lwh = ctx.cookies.get('lwh');
    if(lwh){
        console.log(lwh);
    }else{
        ctx.cookies.set('lwh','{name:lwh}');
    }
    ctx.response.body = fs.createReadStream('./koa3.html');
}


app.use(static(path.join(__dirname,'..','..','js')));//静态资源


app.use(router.get('/',home));

app.listen('8089','192.168.28.251')