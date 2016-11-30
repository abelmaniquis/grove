var bcrypt = require('bcrypt-nodejs')

module.exports = function(userSchema) {

  userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  }

}