//Set up
var express = require("express");
var session = require('express-session'); //sessions help keep track of users as they travel through site
var app = express();
var port = process.env.PORT || 8080;

// Database/mongoDB
var mongoose = require("mongoose");
var configDB = require('./config/database.js');
var passport = require("passport");
var bodyParser = require("body-parser"); //For using html in the app

var path = require('path');

var morgan = require('morgan'); //Logs http requests to the console, I find it to be useful

/*
TEST CHATROOM. For now, this is separated from the other routes until I can get the room to work
*/

//Database configuration====================================================
mongoose.connect(configDB.url);

//Passing passport for configuration
require('./config/passport')(passport); //pass passport for configuration

//set up express application

app.use(express.static('client'));

app.use(morgan('dev')); //log requests to the console.
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); //Get information from html forms
//Required for passport
//I have been following this tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local

app.use(session({secret: 'mynameisabel', resave: false, saveUninitialized: false})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //for persistent login sessions

//Routing===========================================
require('./config/routes.js')(app,passport); //load routes and a fully configured passport
//=================================================


//routeApp;

//launch===========================================
app.listen(port);
console.log('Listening on port: ' + port);

