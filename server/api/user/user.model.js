//app/server/api/user/user.model.js
//Trying to pass this object to server.js
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//This is the schema for our user model
var userSchema = mongoose.Schema({
  local :{
    username: String,
    password: String,
  }
});

//Generate a hash for the password
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

//Check if the password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model('User',userSchema);

console.log(userSchema.local);