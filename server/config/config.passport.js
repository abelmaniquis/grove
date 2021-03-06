//config.passport.js

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../api/user/user.model.js');
module.exports = function(app) {
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
      genderField: 'gender',
      passReqToCallback: true 
    },
    function(req,username,password,done){
      console.log(username);
      console.log(password);
      User.findOne({
        'local.username':username
      },
      function(err,user){
        if(err){
          return done(err);
        }
        else if(user){
          return done(null,false);
        }else{
          var newUser = new User();
          
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          
          newUser.save(function(err){
            if (err){
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
