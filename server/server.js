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
require('./config/config.routes.js')(app); //load routes and a fully configured passport
//=================================================
 
require('./config/config.chat.js')(io);


//launch===========================================
server.listen(port,function(){
  console.log('Listening on port ' + port);
});