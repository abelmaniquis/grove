var mongoose = require('mongoose');

var chatLogSchema = mongoose.Schema({
  date:String,
  time:Array,
  names:Array,
  comments:Array
})

module.exports = mongoose.model('chatLog',chatLogSchema);