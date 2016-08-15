//app/server/api/user/user.model.js
//Trying to pass this object to server.js
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//This is the schema for our user model
var userSchema = mongoose.Schema({
  local : {
    username: String,
    password: String,
    name: String,
  }
});

userSchema.path('local.username').validate(function(name){
  return name.length >= 4;
},'Username must contain at least 4 characters.');

userSchema.path('local.password').validate(function(password){
  return password.length >= 4;
},'Password must contain at least 4 characters')

//Generate a hash for the password

userSchema.methods.validPassword = function(password) {
  var salt = bcrypt.genSaltSync(8);
  var hash = bcrypt.hashSync(password, salt);
  
  if(bcrypt.compareSync(this.local.password, hash)){
    return true;
  };
  
};

module.exports = mongoose.model('User', userSchema);