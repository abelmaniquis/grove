var express = require("express");
var session = require('express-session'); 
var app = express();
var morgan = require('morgan'); 
var bodyParser = require("body-parser"); 
var path = require('path');
var passport = require('passport');

module.exports = function(app){
app.use(express.static(path.join(__dirname,'../../client')));
app.use('/libs',express.static(path.join(__dirname,'../../node_modules')));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json()); 

app.use(session({
    secret: 'mynameisabel', 
    resave: false, 
    saveUninitialized: false})); 
app.use(passport.initialize());
app.use(passport.session());
}