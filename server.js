
//Set up
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var configDB = require('./config/database.js');
var io = require('socket.io');

//configuration
mongoose.connect(configDB.url);

app.listen(port);
console.log('Listening on port: ' + port);
//Should load login page by default

//Routing
app.use(express.static('public'));
