var net=require('net');
var server=net.createServer();
var clientList=[];
server.on('connection',function(client){
    var name=client.remoteAddress+client.remotePort;
    clientList.push(client);
    client.write('hello lwh...');
    client.on('data',function(data){
        for(var i=0;i<clientList.length;i++){
            if(client!==clientList[i]){
                clientList[i].write(data.toString());
            }
        }
        //console.log(client.remoteAddress+client.remotePort);
    });
    client.on('end',function(){
        clientList.splice(clientList.indexOf(client),1);
        console.log(name+'离开了');
    });
    //client.end();
});

server.listen('6665');