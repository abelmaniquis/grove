//https://www.allions.net/blog/post/use-gravatar-in-your-nodejs-application

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var request = require('request');

var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String
  },
  info:{
    age: Number,
    relationship:Boolean,
    userStatus: String,
    statusDates:Array,
    statusHistory: Array,
    friends: Array,
    creditCard: String,
  },
});


require('./user.validation.js')(userSchema);

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.local.password);
}

module.exports = mongoose.model('User', userSchema);



