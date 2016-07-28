//Set up
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser"); //For using html in the app
var configDB = require('./config/database.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

//Database configuration
mongoose.connect(configDB.url);

require('./config/passport')(app);

//express validation

//Routing
var routeApp = require('./routes.js')(app,express,path,io,server);
routeApp;

app.listen(port);
console.log('Listening on port: ' + port);