//app/routes.js
/*var express = require('express');
var app = express;*/
var passport = require('passport');

module.exports =function(app){ //don't need to pass everything
  var io = require('socket.io');
  var http = require('http');
  var path = require('path');
  var express = require('express');
  app.use(express.static('client/views'));
  
app.set('client', path.join(__dirname, '../../client/views'));
var clientPath = app.get('client');

/*-------------------
PROFILE PAGE
--------------------*/
  app.get("/",function(req,res){
    res.status(200).sendFile(path.join(clientPath, 'index.html'));
  });

/*--------------------
LOGIN PAGE
---------------------*/
//show the login form
  app.get("/login",function(req,res){
    //need to send user information to this page
    res.status(200).sendFile(path.join(clientPath, 'login.html'));
  });
  
  app.post('/login', passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/failure'
  }), function(req, res){
    console.log('here it is', req.body);
  });

/*------------------------------
SIGNUP PAGE
-------------------------------*/

  app.get("/signup",function(req,res){
    //need to send user information to the signup page
    res.status(200).sendFile(path.join(clientPath, 'signup.html'));
  });

//Process the signup form

  //process the signup form
  app.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/profile', //redirect to profile page
    failureRedirect: '/failure' //redirect back to signup page
  }));
  //Process the login form
/*-------------------------------------
PROFILE
Only accessible to registered users
use route middlware to verify this (isLoggedIn function)
-------------------------------------*/
  app.get("/profile",isLoggedIn,function(req,res){
    res.status(200).sendFile(path.join(clientPath, 'profile.html'));
  });

 
/*--------------------------------------------
CHAT
---------------------------------------------*/

/*
need to send css and javascript to the chatroom
*/ 

//Load chatroom
 // var express = require('express');
  
    
  //serve chat.js
  //serve chat.css
  //
  
  
  require('./config.chat.js');
  app.get('/chat',isLoggedIn,function(req,res){
    res.status(200).sendFile(path.join(clientPath,'/chat/chat.html'));
  });
  
  
  //Once the app GETS chat. socket.io should connect. and then should do the following:

/*--------------------------------
LOGOUT
---------------------------------*/
  app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
  });

/*
FAILURE TO SIGN IN
*/
  app.get('/failure',function(req,res){
   res.send("Incorrect Username or Password");
  });
  
};



/*------------------------------------------
CHECK IF USER IS LOGGED IN
--------------------------------------------*/

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  else{
    res.redirect('/failure');
  }
  
  
}
