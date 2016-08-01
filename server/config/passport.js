//config.passport.js
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
//console.log("HERE'S PASSPORT!");
var passport = require('passport'),
  Strategy = require('passport').Strategy,
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  
  //Load up the user model
  User = require('../api/user/user.model.js');

module.exports = function(passport){
  console.log("HERE's PASSPORT!");
  //use to serialize the user for the session
  //passport needs to serialize and unserialize user sessions
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });
  passport.deserializeUser(function(id,done){
    User.findbyId(id, function(err, user){
      done(err, user);
    });
  });
  
  /*-------------
  LOCAL SIGNUP
  --------------*/
  passport.use('local-signup',new Strategy({
    usernameField:'name',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, name, password, done){
    process.nextTick(function(){
      User.findOne({'local.name': name},function(err,user){
        if(err)
          return done(err);
        if(user){
          return done(null,false,req.flash('signupMessage','That name is already taken'))
        }else{
          //If there is no user with that name, create the user
          var newUser = new User();
          
          newUser.local.name = name;
          newUser.local.password = newUser.generateHash(password);
        
          //set the user's local credentials
        }
      })
    });
  }
  ))
  
}

/*
ask about connect-flash middleware.
*/