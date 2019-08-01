/**
 * Created by Allen Liu on 2019/7/31.
 */
var express = require('express')
var app = express()
var path = require('path')
var htmlPdf = require('html-pdf')
var template = require('art-template')
var tempPath = path.resolve(__dirname,'./temp.html')
const fs = require('fs');
const mineType = require('mime-types');
var formdata = require('formidable');

function onData(req,cb) {
    var form = new formdata.IncomingForm();
    var obj = {
        files:{},
        data:{}
    }
    form.on('field', function (name, value) {
        obj.data[name] = value;//这里提取的是键值对数据
    }).on('file', function (name, file) {
        obj.files[name] = file;//这里提取上传的文件
    }).on('end', function () {
        cb(obj)
    });
    form.parse(req);
}
function getFileBase64(filePath,mt){
    let data = fs.readFileSync(filePath);
    data = new Buffer(data).toString('base64');
    let base64 = 'data:' + (mt?mt:mineType.lookup(filePath)) + ';base64,' + data;
    return base64
}


// var staticPath = path.resolve(__dirname,'static')
// app.use(express.static(staticPath));


var indexPath = path.resolve(__dirname,'./index.html')
app.get('/',function(req,res){
    res.sendFile(indexPath)
})

app.get('/preview/*',function(req,res){
    // console.log(req.url);
    var pathArr = req.url.split('/')
    var fileName =decodeURI(pathArr[pathArr.length-1])
    console.log(fileName,'fileName');
    fs.readFile('./'+fileName,function(err,data){
        res.setHeader('Content-Type', 'application/pdf')
        res.send(data)
    })
})

app.post('/print',function(req,res){
    // console.log(req);
    onData(req,function(obj){
        // console.log(obj.data);
        // console.log(JSON.stringify(obj.files.imgPath));
        var imgBase64 = getFileBase64(obj.files.imgPath.path,obj.files.imgPath.type)
        var userInfo = Object.assign({imgBase64:imgBase64},obj.data)

        var tempStr = template(tempPath,{userInfo})

        var pdfDestPath = decodeURI(userInfo.userName+'.pdf')
        // console.log(pdfDestPath,'pdfDestPath');
        htmlPdf.create(tempStr, {}).toFile('./'+pdfDestPath, function (err, r) {
            if (err) {
                console.log(err);
                return
            }
            console.log('生成pdf成功');
            res.send({code:'200',message:'生成pdf成功',pdfPath:pdfDestPath})
        });
    })
})

app.listen('9900','192.168.28.248')