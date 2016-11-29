var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var server = require('http').createServer(app);
var socket_io = require('socket.io');
var http = require('http');
var path = require('path');
var io = socket_io(server);
var flash = require('connect-flash');

exports.app = app;
exports.server = server;

var configDB = require('./server/config/database.js');
mongoose.connect(configDB.db.url);

mongoose.connection.once('open',function(){
  console.log("Connection established!");
});
mongoose.connection.on('error',function(err){
  console.error("THERE HAS BEEN AN ERROR: ", err);
})

require('./server/config/config.express')(app);
require('./server/config/config.passport')(app);
require('./server/config/config.chatLog')(app);
require('./server/api/user/user.routes.js')(app);
require('./server/api/chatLog/chatLog.routes.js')(app);
require('./server/config/config.chat.js')(io);

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});

//launch===========================================
server.listen(port,function(){
  console.log('Listening on port ' + port);
});