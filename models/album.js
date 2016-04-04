var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ]
});

var Tacos = mongoose.model('Album', albumSchema);
module.exports = Tacos;
