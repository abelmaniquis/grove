//config.passport.js

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../api/user/user.model.js');
var flash = require('connect-flash');
var gravatar = require('gravatar');

module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  //LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true 
    },
    function(req,username,password,email,done){
      User.findOne({
        'local.username':username
      },
      function(err,user){
        if(err){
          return done(err);
        }
        else if(user){
          console.log('This username already exists');
          return done(null,false,req.flash('signupMessage','That username already exists!'));
        }else{
          var newUser = new User();
          
          newUser.local.username = username;
          newUser.local.email = email;
          //newUser.gravatarHash =  gravatar.url(email);
          newUser.local.password = newUser.generateHash(password);
          
          newUser.save(function(err){
            if (err){
              console.log(err);
              throw err;
            }
            return done(null,newUser);
          })
          
        }
      });
    }));
    
    
//LOCAL LOGIN:
  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqtoCallback: true 
    },
    function(username, password, done) { 
      User.findOne({
        'local.username': username
      }, function(err, user){
        if (err){
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        else if (!user.validPassword(password)) {
          return done(null,false);
        }else if (user.validPassword(password)){
          return done(null, user);
        }
      });
  }));

};
