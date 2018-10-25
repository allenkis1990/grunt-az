const Koa = require('koa');
const app = new Koa();
const router = require('koa-route');//路由
const fs = require('fs');
const path = require('path');
const static = require('koa-static');//静态资源
const compose = require('koa-compose');//合成中间件
//全局处理中间件错误
// const handler = async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         ctx.response.status = err.statusCode || err.status || 500;
//         ctx.response.body = {
//             message: err.message
//         };
//     }
// };
const home = ctx=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./koa2.html');
}

const haha = ctx=>{
    ctx.response.type = 'html';
    ctx.response.body = '<h1>haha</h1>';
}

const redirect = ctx=>{
    //ctx.response.type = 'html';
    ctx.response.redirect('/haha');//重定向
    //ctx.response.body = '<h1>redirect!!!!!</h1>';
}
const notFound = ctx=>{
    // ctx.throw(404);
    // ctx.response.body = '页面吃饭去了';
    ctx.response.status = 404;
    ctx.response.type='html';
    ctx.response.body = '<h1>页面吃饭去了</h1>';
}
const serverError = ctx=>{
    ctx.response.status = 500;
    ctx.response.type='html';
    ctx.response.body = '<h1>error</h1>';
}

const fuck = ctx=>{
    try {
        throw new Error('err');
    }catch(err){
        ctx.app.emit('error', err, ctx);
    }
}



const log1 = (ctx,next)=>{
    ctx.lwh = 'lwh';
    //ctx.throw(500)
    next();
}
const log2 = (ctx,next)=>{
    console.log(ctx.lwh = 'lwh');
    console.log(ctx.request.method,ctx.request.url,Date.now());
    next();
}


app.on('error',function(err,ctx){
    console.log(err);
})

app.use(static(path.join(__dirname,'..','..','js')));//静态资源
// app.use(handler);
app.use(compose([log1,log2]));

app.use(router.get('/',home));
app.use(router.get('/redirect',redirect));
app.use(router.get('/haha',haha));
app.use(router.get('/404',notFound));
app.use(router.get('/500',serverError));
app.use(router.get('/fuck',fuck));

app.listen('8087','192.168.28.251')