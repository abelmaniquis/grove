//app/server/api/user/user.model.js
//Trying to pass this object to server.js
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//This is the schema for our user model
var userSchema = mongoose.Schema({
  local :{
    username: String,
    password: String,
  }
});

//Generate a hash for the password

userSchema.methods.validPassword = function(password) {
  var salt = bcrypt.genSaltSync(8);
  var hash = bcrypt.hashSync(password, salt);
  
  console.log("THIS LOCAL PASSWORD")
  console.log(this.local.password);
  console.log(hash);
  
  if(bcrypt.compareSync(this.local.password, hash)){
    return true;
  };
  
};

module.exports = mongoose.model('User', userSchema);