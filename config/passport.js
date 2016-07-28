//config.passport.js
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

console.log("USERS :")
console.log(User);
console.log("");
console.log("");
console.log("LOCAL STRATEGY");
console.log(LocalStrategy);

module.exports = function(passport){
  
}