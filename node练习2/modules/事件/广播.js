

var eventEmitter=require('events').EventEmitter;
var obj=new eventEmitter();


var net=require('net');
var clients={};
var clientEvents={};

obj.on('join',function(id,client){
    clients[id]=client;
    clientEvents[id]=function(data){
        clients[id].write(data.toString());
    }
    obj.on('write',clientEvents[id]);
});


var server=net.createServer(function(client){
    var id=client.remoteAddress+':'+client.remotePort;
    obj.emit('join',id,client);
    client.on('data',function(data){
        obj.emit('write',id);
        //clients[client.remoteAddress+client.remotePort].write('2222');
    });
});
server.listen(8888);


