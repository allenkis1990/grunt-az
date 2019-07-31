/**
 * Created by Allen Liu on 2019/7/20.
 */
var express = require('express')
var app = express()
var path = require('path')
var htmlPath = path.resolve(__dirname,'./xys/index.html')

app.use(express.static(path.resolve(__dirname,'./xys')))
app.get('/',function(req,res){
    res.sendFile(htmlPath)
})

app.listen(8899,'192.168.28.248');