//config.passport.js

var passport = require('passport');
//Load the things we need
var LocalStrategy = require('passport-local').Strategy;
//Load up the user model

var User = require('../api/user/user.model.js');

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
      passReqToCallback: true //allows us to pass back the entire request to the callback
    },
    function(req,res, done) {
      var username = req.body.username;
      var password = req.body.password;
      
      User.findOne({
        'local.username':username
      },function(err,user){
        if(err){
          return done(err);
        }else if(user){
         console.log("This user already exists");
          //return done(null,false);
        }else{
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
          //return done(null,newUser);
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

      console.log('here is the username', username);
      console.log('here is the password', password);
      //find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'local.username': username
      }, function(err, user){
        //if there are any errors, return the error before anything else
        if (err){
          return done(err);
        }
        //if no user is found, redirect to  failure
        if (!user) {
          return done(null, false);
        }
        //If password is incorrect, redirect to failur
        else if (!user.validPassword(password)) {
          console.log('wrong password')
          return done(null,false);
        }else if (user.validPassword(password)){
          return done(null, user);
        }
      });
    }));
  console.log("END OF PASSPORT FUNCTION");
};

/* var Ralph = new User();
 Ralph.local.username = "Ralph";
 Ralph.local.password = "12345";
 console.log(Ralph);
 Ralph.save();
*/

/*var John = new User();
  John.local.username = "John";
  John.local.password = "hello";
  console.log(John);
  John.save();
*/