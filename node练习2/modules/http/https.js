/**
 * Created by admin on 2018/4/15.
 */
var https=require('https');
var fs=require('fs');
var options={
    key:fs.readFileSync('../../static/key.pem'),
    cert:fs.readFileSync('../../static/key-cert.pem')
};

https.createServer(options,function(req,res){
    res.end('200');

}).listen(3000);
