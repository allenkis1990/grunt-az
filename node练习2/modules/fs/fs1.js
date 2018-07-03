var fs=require('fs');
var readStream=fs.createReadStream('../../images/pic1.jpg');
var writeStream=fs.createWriteStream('../../images/copy.jpg');
readStream.pipe(writeStream);