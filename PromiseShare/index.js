const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.resolve(__dirname,'static')));

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'));
});
app.get('/compatible',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/compatible.html'));
});
app.get('/standard',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/standard.html'));
});
app.get('/whyNeed',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/whyNeed.html'));
});
app.get('/api',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/api.html'));
});
app.get('/then',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/then.html'));
});
app.get('/catch',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/catch.html'));
});
app.get('/all',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/all.html'));
});
app.get('/race',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/race.html'));
});
app.get('/resolve&reject',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/resolve&reject.html'));
});
app.get('/easyThen',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/easyThen.html'));
});

app.listen('8888','192.168.28.250');
