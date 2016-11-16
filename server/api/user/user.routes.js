//app/routes.js
var passport = require('passport');
var io = require('socket.io');
var http = require('http');
var path = require('path');
var express = require('express');
var User = require('./user.model.js');

module.exports =function(app){

  app.use(express.static('client/views'));
  
  app.set('client', path.join(__dirname, '../../../client/views'));
  var clientPath = app.get('client');
  
  //Signup Page

  app.get("/",function(req,res){
    res.status(200).sendFile(path.join(clientPath, 'index.html'));
  });

  //LOGIN PAGE

  app.get("/login",function(req,res){
    res.status(200).sendFile(path.join(clientPath, 'login.html'));
  });
  
  app.post('/login', passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/failure'
  }), function(req, res){
    req.status(200);
  });
  
  
//SIGNUP PAGE

  app.get("/signup",function(req,res){
    res.status(200).sendFile(path.join(clientPath, 'signup.html'));
  });

  app.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/profile', 
    failureRedirect: '/failure' 
  }),function(req,res){
    console.log(req.body);
  });
  
//PROFILE
  app.get("/profile",isLoggedIn,function(req,res){
    res.status(200).sendFile(path.join(clientPath, '/profile/profile.html'));
  });
  
  app.put('/profile',isLoggedIn,function(req,res){
    User.findByIdAndUpdate(req.user._id,{
      'local.name': req.body.name
    },function(error,user){
        if(error){
          console.log(error);
        }else{
          res.status(201).json(user);
        }
    });
  })
  
  app.get('/profile/mine',isLoggedIn,function(req,res){
    res.json({
      username:req.user
    });
  });
  
    app.put('/friends',isLoggedIn,function(req,res){
    User.findByIdAndUpdate(req.user._id,{
      'info.friends':req.body.friends
    });
  })
 

//CHAT
  
  require('../../config/config.chat.js');
  app.get('/chat',isLoggedIn,function(req,res){
    res.status(200).sendFile(path.join(clientPath,'/chat/chat.html'));
  });
  

//LOGOUT

  app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
  });


//FAILURE TO SIGN IN
  app.get('/failure',function(req,res){
    res.send("Incorrect Username or Password");
  });
  
  app.get('/delete_user',function(req,res){
    res.send("This will delete a user");
  });

//Delete username:
  app.delete('/', function (req, res) {
  res.send('DELETE request to homepage');
});
    
};

  


//CHECK IF USER IS LOGGED IN

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  else{
    res.redirect('/failure');
  }
  
  
}
