
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
    gender: String,
    relationship:Boolean,
    politic:String,
    userStatus: String,
    statusDates:Array,
    statusHistory: Array,
    interests: Array,
  },
});


require('./user.validation.js')(userSchema);
require('./user.controller.js')(userSchema);

module.exports = mongoose.model('User', userSchema);



