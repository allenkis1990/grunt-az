

//如果/modules/project1/style下没有xxx.css就会去 最外层的style文件夹下去找

var browserSync  = require ( 'browser-sync' ).create ();
var url=require('url');
var fs=require('fs');
var send=require('send');

browserSync.init ( {
    ui    : false,
    open  : false,
    port  : 3000,
    // reloadOnRestart: true,
    server: {
        baseDir   : './dirHtml',
        middleware: [
            {
                route: '/modules/project1/style',
                handle: function(req,res,next){
                    var routeUrl=req.originalUrl;
                    //console.log(routeUrl);
                    //console.log(fs.existsSync('./dirHtml'+routeUrl));
                    console.log(req.url);
                    if(!fs.existsSync('./dirHtml'+routeUrl)){
                        //send模块
                        // 第一个参数是传一整个请求对象
                        // 第二个参数是传请求的相对路径 比如route指定了/modules/project1/style 那么久会输出/a1.css
                        // 第三个参数指定一个未找到的资源去哪里拉 例如没找到a1.css指定了最外层的style文件夹就会去./style/a1.css找
                        var stream=send(req,req.url,{root:'./style'});
                        //var stream=send(req,'./style'+req.url);这种也可以
                        stream.pipe(res);
                    }else{
                        next();
                    }
                    //console.log(req.originalUrl);
                    //console.log(req.url);
                    //console.log(req.headers);
                    //next();
                }
            },
            function(req,res,next){
                console.log(req.method);
                if(req.url.indexOf('lwhpdf')!==-1){
                    //下载中文名要编码一下encodeURIComponent()
                    res.setHeader('Content-Disposition', 'attachment; filename="'+encodeURIComponent('刘伟恒.pdf')+'"');
                    //res.setHeader("Content-Type", "application/pdf");
                    //res.setHeader('Content-Type', 'text/html; charset=gb2312');
                    res.setHeader("Content-Type", "application/octet-stream");
                }
                next();
            },
            //重定向
            function(req,res,next){
                //console.log(req.url);
                //res.writeHead(302, {location: '/' + app + '/modules/' + sub});
                if(req.url.indexOf('caonima')!==-1){
                    res.writeHead(302, {location: 'https://www.baidu.com/'});
                    res.end('ok');
                }
                next();
            }
            /*{
                route: '/lwhpdf',
                handle: function(req,res,next){
                    if(req.originalUrl.indexOf('lwhpdf')!==-1){
                        res.setHeader('Content-Disposition', 'attachment; filename="123456.pdf"');
                        res.setHeader("Content-Type", "application/pdf");
                    }
                    next();
                }
            }*/
        ]
    }
} );