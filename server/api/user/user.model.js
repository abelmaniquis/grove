var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String,
    name: String
  }
});


require('./user.validation.js')(userSchema);

//Generate a hash for the password

userSchema.methods.validPassword = function(password) {
  var salt = bcrypt.genSaltSync(8);
  var hash = bcrypt.hashSync(password, salt);

  if (bcrypt.compareSync(this.local.password, hash)) {
    return true;
  };

};


module.exports = mongoose.model('User', userSchema);