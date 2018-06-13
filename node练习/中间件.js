var browserSync  = require ( 'browser-sync' ).create ();
var url=require('url');

browserSync.init ( {
    ui    : false,
    open  : false,
    port  : 3000,
    // reloadOnRestart: true,
    server: {
        baseDir   : './dirHtml',
        middleware: [
            function(req,res,next){
                //console.log(req.method);
                //console.log(req.headers);
                console.log(req.url);
                if(url.parse(req.url).pathname==='/'){
                    console.log(1);
                    req.url='/style/allen.html';
                    //next();
                }
                next();
            }
        ]
    }
} );