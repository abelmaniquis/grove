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
var socket_io = require('socket.io');
var http = require('http');         //Need http for socket.io
var server = http.Server(app);
var io = socket_io.listen(server);  //pass a http.Server instance
var server = http.Server(app);
//Load chatroom

  app.get('/chat',function(req,res){
    res.status(200).sendFile(__dirname + '/config/client/chat.html');
  })

//http://socket.io/get-started/chat/

  io.on('connection',function(socket){
    console.log("A user connected");
    
    socket.on('message',function(message){
      socket.broadcast.emit('message',message);
    });
    
  });


//Database configuration====================================================
mongoose.connect(configDB.url);

//Passing passport for configuration
require('./config/passport')(passport); //pass passport for configuration

//set up express application

app.use(morgan('dev')); //log requests to the console.
app.use(bodyParser()); //Get information from html forms

//Required for passport
//I have been following this tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local

app.use(session({secret: 'mynameisabel'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //for persistent login sessions

//Routing===========================================
require('./config/routes.js')(app,passport); //load routes and a fully configured passport
//=================================================


//routeApp;

//launch===========================================
server.listen(port);
//app.listen(port);
console.log('Listening on port: ' + port);

