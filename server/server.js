//Set up
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");

var morgan = require('morgan');

var bodyParser = require("body-parser"); //For using html in the app
var session = require('express-session'); //sessions help keep track of users as they travel through site

var path = require('path');

var configDB = require('./config/database.js');
var socket_io = require('socket.io');

//Database configuration====================================================
mongoose.connect(configDB.url);

//Passing passport for configuration
require('./config/passport')(passport); //pass passport for configuration

//set up express application
app.use(morgan('dev')); //log requests to the console.

app.use(bodyParser()); //Get information from html forms
//Jade
app.set('view engine','jade'); //set up jade for templating

//Required for passport
app.use(session({secret: 'mynameisabel'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //for persistent login sessions

//Routing===========================================
require('./config/routes.js')(app,passport); //load routes and a fully configured passport
//=================================================
//routeApp;

//Load chatroom

//launch===========================================
app.listen(port);
console.log('Listening on port: ' + port);
