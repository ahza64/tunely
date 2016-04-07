/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');
  // sampleAlbums.forEach(renderAlbum);



  $.ajax({
    method: 'get',
    url: '/api/albums',
    success: onSuccess,
    error: onError
  });

  function onSuccess(json){
    console.log(json);
    json.forEach(renderAlbum);
  }

  function onError(err){
    console.log(err);
  }

  $('#albumForm').on('submit', function(e){
    e.preventDefault();
    console.log(e);
    console.log("this serialize ", $(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: albumPost,
      error: albumPostError
    });
    $(this).trigger("reset");
  });

  function albumPost(json){
    console.log("album post success ", json);
    renderAlbum(json);
  }

  function albumPostError(err){
    console.log("album post error ", err);
  }


  $('#albums').on('click', '.add-song', function(e) {
    console.log('add-song clicked!');
    // var id= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    // console.log('id',id);
    //
    var currentAlbumId = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',currentAlbumId);
    $('#songModal').data('album-id', currentAlbumId);
    $('#songModal').modal();  // display the modal!
  });

  $('#saveSong').on('click', handleNewSongSubmit);


});//doc.ready end


function handleNewSongSubmit(e) {
    e.preventDefault();
    var $modal = $('#songModal');
    var $songNameField = $modal.find('#songName');
    var $trackNumberField = $modal.find('#trackNumber');

    // get data from modal fields
    // note the server expects the keys to be 'name', 'trackNumber' so we use those.
    var dataToPost = {
      name: $songNameField.val(),
      trackNumber: $trackNumberField.val()
    };
    var albumId = $modal.data('albumId');
    console.log('retrieved songName:', songName, ' and trackNumber:', trackNumber, ' for album w/ id: ', albumId);
    // POST to SERVER
    var songPostToServerUrl = '/api/albums/'+ albumId + '/songs';
    $.post(songPostToServerUrl, dataToPost, function(data) {
      console.log('received data from post to /songs:', data);
      // clear form
      $songNameField.val('');
      $trackNumberField.val('');

      // close modal
      $modal.modal('hide');
      // update the correct album to show the new song
      // Note there are a couple of ways we could do this.
      // 1. re-retrieve the entire album and call renderAlbum with it (cost: extra server round-trip)
      // 2. allow the server to respond with the entire album and then renderAlbum (slightly less standard)
      console.log('for now lets log the results and wait till we have the server setup:', data);
    }).error(function(err) {
      console.log('post to /api/albums/:albumId/songs resulted in error', err);
    });

  // $.ajax({
  //   method: 'POST',
  //   url: '/api/albums/' + currentAlbumId + '/songs',
  //   data: $(this).serialize(),
  //   success: handleNewSongSubmit,
  //   error: errorNewSongSubmit
  // });

}


//   $quotesList = $('#quotesTarget');
//
//   var source = $('#quotesTemplate').html();
//   template = Handlebars.compile(source);
//
// function render() {
//     $quotesList.empty();
//     var quotesHtml = template({ quotes: allQuotes });
//     $quotesList.append(quotesHtml);
//   }

//////////////////////


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  // console.log('rendering album:', album);
  var gettingHTML = $('#albumsTemplate').html();
  var albumsTemplate = Handlebars.compile(gettingHTML);

  var html = albumsTemplate(album);
  $('#albums').append(html);
}

// function renderSongs(song){
//   var gettingHTML = $('').html;
//   var songTemplate = Handlebars.compile(gettingHTML);
//
//   var html = songTemplate({songs: song});
//   $('').append(html);
// }

// function renderAlbum(album){
//   console.log('rendering album: ', album);
//
// }
