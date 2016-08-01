/*
module.exports = function(io,server,express,app){
  console.log("Here's io");
  console.log(io);
  io.on('connection',function(socket){
    console.log("Client Connected");
  });
}*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT||8080;
