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

});//doc.ready end

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

// function renderAlbum(album){
//   console.log('rendering album: ', album);
//
// }
