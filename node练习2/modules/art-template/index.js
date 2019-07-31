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
function getImgBase64(filePath,mt){
    let data = fs.readFileSync(filePath);
    data = new Buffer(data).toString('base64');
    let base64 = 'data:' + (mt?mt:mineType.lookup(filePath)) + ';base64,' + data;
    return base64
}

var tempStr = template(tempPath,{
    data:{name:'art-template'},
    list:[
        {name:'allen',age:18,red:true},
        {name:'jack',age:20,red:false},
        {name:'tom',age:22,red:false}
    ],
    imgPath:getImgBase64('static/images/bg1.jpg')
})



var staticPath = path.resolve(__dirname,'static')
app.use(express.static(staticPath));


var indexPath = path.resolve(__dirname,'./index.html')
app.get('/',function(req,res){
    res.sendFile(indexPath)
})

app.post('/print',function(req,res){
    // console.log(req);
    onData(req,function(obj){
        // console.log(obj.data);
        console.log(JSON.stringify(obj.files.file));
        var u = getImgBase64(obj.files.file.path,obj.files.file.type)
        res.send({name:u})
    })
})

// htmlPdf.create(d, {}).toFile('./test.pdf', function(err, res) {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log(res);
// });


app.listen('9900')