//Set up
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var configDB = require('./config/database.js');
var io = require('socket.io');
var path =require('path');

//Database configuration
mongoose.connect(configDB.url);

require('./config/passport');
//Should load login page by default

//Routing
require('./routes.js')(app,express,path);

app.listen(port);
console.log('Listening on port: ' + port);