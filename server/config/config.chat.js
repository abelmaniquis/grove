var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

console.log("Listening to the chatroom's server side");

var numUsers = 0;

console.log(io);

io.on('connection',function(socket){
  console.log("Connected to socket.io");
});