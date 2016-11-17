var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var server = require('http').createServer(app);
var socket_io = require('socket.io');
var http = require('http');
var path = require('path');
var io = socket_io(server);

exports.app = app;
exports.server = server;

//var configDB = require('./server/config/database.js');
var configDB = require('./server/config/production.js');

mongoose.connect(configDB.url);
require('./server/config/config.express')(app);
require('./server/config/config.passport')();
require('./server/api/user/user.routes.js')(app); 
require('./server/config/config.chat.js')(io);

//launch===========================================
server.listen(port,function(){
  console.log('Listening on port ' + port);
});