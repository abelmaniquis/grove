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
var io = socket_io(server);
var path = require('path');
var session = require('express-session'); //sessions help keep track of users as they travel through site http://blog.modulus.io/nodejs-and-express-sessions

//Database configuration
mongoose.connect(configDB.url);

//Passing passport for configuration
require('./config/passport')(passport); 

//set up express application

app.use(bodyParser()); //Get information from html forms

//Required for passport
app.use(session({secret: 'mynameisabel'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //for persistent login sessions
//Routing
require('./config/routes.js')(app);
//routeApp;

//Load chatroom

app.listen(port);
console.log('Listening on port: ' + port);