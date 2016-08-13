//Set up

var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var server = require('http').createServer(app);

var socket_io = require('socket.io');
var http = require('http');
var path = require('path');
var io = socket_io(server);
// Database/mongoDB=================================

var configDB = require('./config/database.js');

//Database configuration====================================================
mongoose.connect(configDB.url);


//set up express application
require('./config/config.express')(app);

//Passing passport for configuration
require('./config/config.passport')(); //pass passport for configuration


//Routing===========================================
require('./config/routes.js')(app); //load routes and a fully configured passport
//=================================================
 
//Decouple this from the server after it's finished
//////////////////////////////////////////////////////////////////////////////
var addedUser = false;
var numUsers = 0;

io.on('connection',function(socket){
  
  numUsers ++;
  console.log(numUsers);
  
  socket.on('message',function(chatInput){
    console.log(socket);
    socket.broadcast.emit('message', chatInput);
  });
  
  socket.on('add user',function(){
    socket.broadcast.emit('message', "A new user has joined the room");
  });
  
});

//launch===========================================
server.listen(port,function(){
  console.log('Listening on port ' + port);
});