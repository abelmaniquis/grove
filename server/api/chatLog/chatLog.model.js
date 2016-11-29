var mongoose = require('mongoose');

var chatLogSchema = mongoose.Schema({
  dates:Array,
  log:Array,
  names:Array,
  comments:Array
})

module.exports = mongoose.model('chatLog',chatLogSchema);