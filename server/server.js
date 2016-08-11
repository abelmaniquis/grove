//Set up

var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");

//For testing socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// Database/mongoDB=================================

var configDB = require('./config/database.js');

//Chatroom configuration====================================================
//require('./config/chatroom');

//Database configuration====================================================
mongoose.connect(configDB.url);
//set up express application

require('./config/config.express')(app);

//Passing passport for configuration
require('./config/config.passport')(); //pass passport for configuration

//Routing===========================================
require('./config/routes.js')(app); //load routes and a fully configured passport
//=================================================


//routeApp;

//launch===========================================
app.listen(port, function(){
    console.log('Listening on port: ' + port);
});