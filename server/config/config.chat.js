var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var User = require('../api/user/user.model.js');
console.log("Listening to the chatroom's server side");


io.on('connection',function(socket){
  console.log("Connected to socket.io");
});