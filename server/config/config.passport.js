//config.passport.js

var passport = require('passport');
//Load the things we need
var LocalStrategy = require('passport-local').Strategy;
//Load up the user model

var User = require('../api/user/user.model.js');

//Load two test users

var Admin = new User();
  Admin.local.username = "admin";
  Admin.local.password = "12345";
  Admin.save();
  
var TestUser = new User();
  TestUser.local.username = "test";
  TestUser.local.password = "12345";
  TestUser.save();


module.exports = function() {
  //Serialize user
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //Deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /*-------------
  LOCAL SIGNUP
  --------------*/
  //We are using named strategies for login and signup
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true //req will be passed as the first argument to verify callback
    },
    function(req,res,done){
      var username = req.body.username;
      var password = req.body.password;
      
      User.findOne({
        'local.username':username
      },
      function(err,user){
        if(err){
          return done(err);
        }
        else if(user){
        }
        else{
          var newUser = new User({
            'local.username': username,
            'local.password': password
        });
          console.log(newUser);
          newUser.save(function(){
            if(err){
              throw err;
            }
            console.log("new user created");
          });
        }
        
      });
    }));
    
    
  /*--------------------------
  LOCAL LOGIN:
  ---------------------------*/
  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqtoCallback: true //Allows us to pass back the entire request to the callback
    },
    function(username, password, done) { //callback with email and password from our form
      //find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'local.username': username
      }, function(err, user){
        //if there are any errors, return the error before anything else
        if (err){
          return done(err);
        }
        //if no user is found
        if (!user) {
          return done(null, false);
        }
        //If password is incorrect, redirect to failur
        else if (!user.validPassword(password)) {
          console.log('wrong password')
          return done(null,false);
        }else if (user.validPassword(password)){
          console.log(username);
          console.log(password);
          console.log(done);
          return done(null, user);
        }
      });
    }));
  console.log("END OF PASSPORT FUNCTION");
};


/*
The done callback supplies passport with the authenticated user.

*/