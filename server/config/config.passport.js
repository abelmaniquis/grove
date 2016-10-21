//config.passport.js

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var User = require('../api/user/user.model.js');

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
    function(req,username,password,done){
      User.findOne({
        'local.username':username
      },
      function(err,user){
        if(err){
          return done(err);
        }
        else if(user){
          console.log('This username already exists');
        }else{
          User.create({
            'local.username' : username,
            'local.password' : password,
          }, function(err,createdUser){
            if(err){
              done(err,null);
            }else{
              done(null, createdUser);
            }
          }
          
          );
          
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
    
//DELETE USER

  console.log("END OF PASSPORT FUNCTION");
};
