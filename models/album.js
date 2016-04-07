var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require("./song.js");

var albumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  songs: [Song.schema]
});

var Tacos = mongoose.model('Album', albumSchema);
module.exports = Tacos;
