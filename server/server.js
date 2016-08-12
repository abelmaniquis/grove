//Set up

var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");

//For testing socket.io
var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);
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
var socket_io = require('socket.io');
var http = require('http');
var path = require('path');
var io = socket_io(server);
io.on('connection',function(socket){
  console.log('Socket.io is now connected');
  
  socket.on('message',function(message){
    console.log(message);
  });
  
});


//launch===========================================
server.listen(port,function(){
  console.log('Listening on port ' + port);
});


/*app.listen(port, function(){
  console.log('Listening on port: ' + port);
});*/