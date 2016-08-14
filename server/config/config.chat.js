
module.exports = function(app){

var server = require('http').createServer(app);
var socket_io = require('socket.io');
var http = require('http');
var path = require('path');
var io = socket_io(server);

var numUsers = 0;

io.on('connection',function(socket){
  
  numUsers ++;
  console.log(numUsers)
  
  socket.on('message',function(chatInput){
    socket.broadcast.emit('message', chatInput);
  })
  
  socket.on('add user',function(){
    socket.broadcast.emit('message', "A new user has joined the room");
  });
  
});

io.on('disconnect',function(socket){
  socket.emit.broadcast("message","A user has disconnected");
  console.log("A user has disconnected");
});

}
