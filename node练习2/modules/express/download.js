let fs = require('fs')
let express = require('express')
let app = express()
let path = require('path')
let $http = require('axios')
let url = require('url')
let htmlPath = path.resolve(__dirname,'download.html')
app.get('/',function(req,res){
    res.sendFile(htmlPath)
})

app.get('/loadFile',function(req,res){
    // console.log(req);
    $http.get('http://127.0.0.1:8080/getData').then(function(data){
        var result = data.data;
        // console.log(result);
        fs.readFile('./downloadTemp.html','utf-8',function(err,tempStr){
            if(err){
                res.send(err);
            }
            // console.log(tempStr);
            let htmlStrReg = /\{\{(.+?)\}\}/ig;
            let matchs = tempStr.match(htmlStrReg);
            if(matchs){
                matchs.forEach((match)=>{
                    let expr = match.replace('{{','').replace('}}','').replace(/^\s+/,'').replace(/\s+$/,'')
                    tempStr = tempStr.replace(match,result[expr])
                })
                // console.log(tempStr);
            }

            let urlObj = url.parse(req.url,true);
            let loadType = urlObj.query.loadType;
            if(loadType==='preview'){
                //直接在页面中打开html
                res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(`${result.name}个人资料.html`)}"`)
                res.setHeader('Content-Type', 'text/html')
            } else {
                //直接下载
                res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(`${result.name}个人资料.html`)}"`)
                res.setHeader('Content-Type', 'application/octet-stream')
            }
            res.send(tempStr);
        })
    })
})

app.get('/getData',function(req,res){
    res.send({
        name:'allen',
        age:18,
        job:'web',
        fav:'game'
    })
})

app.listen('8080')
