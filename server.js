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

//configuration
mongoose.connect(configDB.url);

//Should load login page by default

//Routing
//app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files
app.get("/",function(req,res){
  //load login page by default
  res.sendFile(path.join(__dirname + '/public/login.html'));
})

app.get("/chat",function(req,res){
  //load chatpage
  //should only be accesible by password
  res.sendFile(path.join(__dirname + '/public/chat.html'));
});

app.get("/signup",function(req,res){
  res.sendFile(path.join(__dirname + '/public/signup.html'));
});

app.listen(port);
console.log('Listening on port: ' + port);