//app/routes.js

//http://nodeexamples.com/2013/09/04/creating-an-md5-hash-to-get-profile-images-from-gravatar/

var passport = require('passport');
var io = require('socket.io');
var http = require('http');
var path = require('path');
var express = require('express');
var User = require('./user.model.js');

module.exports = function(app) {

  app.use(express.static('client/views'));

  app.set('client', path.join(__dirname, '../../../client/views'));
  var clientPath = app.get('client');

  //Signup Page
  
  app.get("/", function(req, res) {
    res.status(200).sendFile(path.join(clientPath, 'index.html'));
  });

  //LOGIN PAGE

  app.get("/login", function(req, res) {
    res.status(200).sendFile(path.join(clientPath, 'login.html'));
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/failure'
  }), function(req, res) {
    
    req.status(200);
  });


  //SIGNUP PAGE

  app.get("/signup", function(req, res) {
    res.status(200).sendFile(path.join(clientPath, 'signup.html'));
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/failure'
  }), function(req, res) {
    req.status(200);
  });

  //PROFILE
  app.get("/profile", isLoggedIn, function(req, res) {
    console.log(req);
    res.status(200).sendFile(path.join(clientPath, '/profile/profile.html'));
  });

  app.put('/profile/:myStatus', isLoggedIn, function(req, res) {
    User.findByIdAndUpdate(req.user._id,{
      'info.userStatus': req.params.myStatus,
    }, function(error, user) {
      if (error) {
        console.log(error);
      }
      else {
        var date = new Date();
        var stringdate = date.toString();
        user.info.statusDates.push(stringdate);
        user.info.statusHistory.push(req.params.myStatus)
        user.save();
        res.status(200);
      }
    });
  });
  
  app.put
  
  app.get('/profile/mine', isLoggedIn, function(req, res) {
    res.json({
      username: req.user
    });
  });
  
  app.get('/profile/mine/friends',isLoggedIn,function(req,res){
    res.json({
      username: req.user.info.friends
    })
  })

  app.put('/friends/:newFriend', isLoggedIn, function(req, res, next) {
    console.log(req)
    User.findByIdAndUpdate(req.user._id, {
    }, function(err, user) {
      if (err) {
        next(err);
      }
      else {
        // user.info.friends.push(req.params.newFriend);
        console.log(user.info.friends);
        user.info.friends.push(req.params.newFriend);
        console.log(user.info);
        console.log("You just made friends with ", req.params.newFriend);
      }
    });
  })

  require('../../config/config.chat.js');
  app.get('/chat', isLoggedIn, function(req, res) {
    res.status(200).sendFile(path.join(clientPath, '/chat/chat.html'));
  });
  
  app.put('/chat/',isLoggedIn, function(req,res){
    console.log(req);
  })

  //LOGOUT

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  //FAILURE TO SIGN IN
  app.get('/failure', function(req, res) {
    res.send("Incorrect Username or Password");
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else {
    res.redirect('/failure');
  }


};
