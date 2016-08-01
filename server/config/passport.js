//config.passport.js
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
var passport = require('passport'),
  Strategy = require('passport').Strategy,
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  User = require('../api/user/user.model.js');

module.exports = function(passport){
  
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });
  
  passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
      done(err, user);
    });
  });
  /*------------------------
  LOCAL SIGNUP
  --------------------------*/
  passport.use('local-signup',new Strategy({
    usernameField : 'name',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req,email,password, done){
    
  }
  ))
  
}

/*
ask about connect-flash middleware.
*/