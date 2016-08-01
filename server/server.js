//Set up
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser"); //For using html in the app
var configDB = require('./config/database.js');
var server = require('http').createServer(app);

var socket_io = require('socket.io');
var io= socket_io(server);

var path = require('path');
var session = require('express-session');

//Database configuration
mongoose.connect(configDB.url);
console.log("DATABASE CONNECTED: " + configDB.url);
require('./config/passport')(passport); //passing passport for configuration

//set up express application

//Required for passport
app.use(session({secret: 'mynameisabel'}));
app.use(passport.initialize());
app.use(passport.session());

//Routing
var routeApp = require('./config/routes.js')(app,express,path,io,server);
routeApp;

//Load chatroom
console.log("routeApp");

var chatroom = require('./config/chatroom.js')(io,app,express);
chatroom;

app.listen(port);
console.log('Listening on port: ' + port);