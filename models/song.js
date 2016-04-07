var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var songSchema = new Schema({
  name: String,
  trackNumber: Number
});


var Songtaco = mongoose.model('Song', songSchema);
module.exports = Songtaco;
