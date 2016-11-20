var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String,
    name: String
  },
  info:{
    age: Number,
    userStatus: String,
    friends: Array,
    images: Array
  }
});


require('./user.validation.js')(userSchema);

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.local.password);
}

/*userSchema.methods.validPassword = function(password) {
  var salt = bcrypt.genSaltSync(8);
  var hash = bcrypt.hashSync(password);
  console.log(hash);
  if (bcrypt.compareSync(this.local.password, hash)) {
    return true;
  };
};
*/

module.exports = mongoose.model('User', userSchema);