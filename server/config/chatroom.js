var app = require('express');
var socket_io = require('socket.io');
var http = require('http');         //Need http for socket.io
var server = http.Server(app);
var io = socket_io.listen(server)

io.on('connection',function(){
  console.log("socket.io is connected");
})