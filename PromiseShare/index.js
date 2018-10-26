const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.resolve(__dirname,'static')));

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'));
});

app.listen('8888','192.168.28.251');
