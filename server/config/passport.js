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
          
          //Set the user's local credentials
          newUser.local.name = name;
          newUser.local.password = newUser.generateHash(password);
        
          //Save the user
          newUser.save(function(err){
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
    });
    });
  }));
  /*--------------------------
  LOCAL LOGIN:
  ---------------------------*/
  passport.use('local-login',new Strategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  function(req, email, password, done){
    //If there are any errors, return the error before anything else
    User.findOne({'local.email':email},function(err,user){
      if(err)
        return done(err);
      if(!user)
        return done(null, false,req.send({"no user":"found"}));
      if(!user.validPassword(password))
        return done(null, false, console.log('hello'));
      return done(null,user);
    });
    
  }));
console.log("END OF PASSPORT FUNCTION");  
};
/*  
ask about connect-flash middleware.
*/