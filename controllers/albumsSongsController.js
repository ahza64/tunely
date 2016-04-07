var db = require('../models');


function create(req, res){
  var newAlbumSong = new db.Album(req.body);
   newAlbumSong.save(function(err, song){
     if (err){
       return console.log("album save error "+ err);
     }else{
       console.log(song);
       res.json(song);
     }
   });
}

module.exports = {
  create: create
};
