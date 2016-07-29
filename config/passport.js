//config.passport.js
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
var passport = require('passport'),
  Strategy = require('passport').Strategy,
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  User = require('../api/user/user');
/*
console.log("USERS :")
console.log(User);
console.log("");
console.log("");
console.log("STRATEGY");
console.log(Strategy);
console.log("");
console.log("");
console.log("HERE's BCRYPT");
console.log(bcrypt);
*/
module.exports = function(passport){
  /*
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });
  
  passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
      done(err, user);
    });
  });*/
}

/*
ask about connect-flash middleware.
*/