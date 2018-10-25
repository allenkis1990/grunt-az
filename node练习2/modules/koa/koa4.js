const Koa = require('koa');
const app = new Koa();
const router = require('koa-route');//路由
const fs = require('fs');
const path = require('path');
const static = require('koa-static');//静态资源
const koaBody = require('koa-body');


const home = ctx=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./koa4.html');
}

const get =async ctx=>{
    ctx.response.type = 'json';
    console.log(ctx.request.query);
    ctx.response.body={name:'allen'}
}
const post =async ctx=>{
    ctx.response.type = 'json';
    console.log(ctx.request.body);
    ctx.response.body={name:'allen'}
}

app.use(koaBody());//专门给post请求用的
app.use(static(path.join(__dirname,'..','..','js')));//静态资源


app.use(router.get('/',home));
app.use(router.get('/get',get));
app.use(router.post('/post',post));

app.listen('8090','192.168.28.251')