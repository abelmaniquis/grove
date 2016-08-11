var express = require("express");
var session = require('express-session'); //sessions help keep track of users as they travel through site
var app = express();
var morgan = require('morgan'); //Logs http requests to the console, I find it to be useful
var bodyParser = require("body-parser"); //For using html in the app
var path = require('path');
var passport = require('passport');

module.exports = function(app){
app.use(express.static(path.join(__dirname,'../../client')));
app.use('/libs',express.static(path.join(__dirname,'../../node_modules')));
app.use(morgan('dev')); //log requests to the console.
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json()); //Get information from html forms
//Required for passport
//I have been following this tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local

app.use(session({
    secret: 'mynameisabel', 
    resave: false, 
    saveUninitialized: false})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //for persistent login sessions
}