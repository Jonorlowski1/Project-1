function hideAll() {
  $('#frontPage').hide();
  $('#newsPage').hide();
  $('#photosPage').hide();
  $('#tourPage').hide();
  $('#contactPage').hide();

  $('#musicVideo').hide();
};

function pageLoad() {
  hideAll();
  $('#frontPage').show();
}
pageLoad();

//TRACK LOOKUP
// $.ajaxPrefilter(function (options) {
//   if (options.crossDomain && jQuery.support.cors) {
//     options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//   }
// });

function displayLyrics() {
  var artist = $("#artistDiv").html();
  var song = $("#songDiv").html();
  var queryURL_lyrics = "https://private-anon-1e650a5c58-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + song;
  $.ajax({
    url: queryURL_lyrics,
    method: "GET",
  }).then(function (response) {
    // console.log(response.body);
    var lyrics = response.lyrics;
    $("#lyrics-div").html(lyrics);
  });
};
displayLyrics();

function displayPhotos() {
  // var artist = $('#artistDiv').html();
  $.ajax ({
    type: 'POST',
    url: 'curl -H "Authorization: 563492ad6f91700001000001404ed7fc9dba4294b7d85af8737e84e5" "https://api.pexels.com/v1/search?query=people"',
    dataType: 'json',
    success: function(data) {
      console.log('PHOTOS: ' + data);
    }

  })
};
displayPhotos();

// IP LOOKUP
function displayEvents() {
  var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
  var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
  var response_ip;
  $.ajax({
    url: queryURL_IP,
    method: "GET",
  }).then(function (response) {

    response_ip = response.ip;
    console.log('User IP: ' + response_ip);

    //SONGKICK EVENT LOOKUP
    var apikey_localEvents = "926QLoynaFfTnoup"
    var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
    $.ajax({
      url: queryURL_localEvents,
      method: "GET",
    }).then(function (response) {


      console.log('SongKick: ' + response);
    })
  });
};

function displayOtherEvents () {
var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
var response_ip;
$.ajax({
  url: queryURL_IP,
  method: "GET",
}).then(function (response) {

  response_ip = response.ip;

  console.log("User IP: " + response_ip)
  // console.log(response);


  //SONGKICK NEARBY EVENT LOOKUP
  var apikey_localEvents = "926QLoynaFfTnoup"
  var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
  $.ajax({
    url: queryURL_localEvents,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var upcomingEvents = response.resultsPage.results.location[0].metroArea.uri;
    console.log("local upcoming events: " + upcomingEvents);

    var subHeader = $("<a class=tour-link href=" + upcomingEvents + ">Find out if " + $('#artistDiv').text() + " is on tour near you!</a>");
    $('#localTourLink').append(subHeader);


  })
});
};
displayOtherEvents();

function artistLookup () {
  //SONGKICK SIMILAR ARTIST LOOKUP
  var artist = $('#artistDiv').html();
  var apikey_localEvents = "926QLoynaFfTnoup"
  var queryURL_artistEvents = "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + apikey_localEvents + "&query=" + artist;
  $.ajax({
    url: queryURL_artistEvents,
    method: "GET",
  }).then(function (response) {

    console.log("Artist upcoming events:");
    console.log(response);

    var artistName = response.resultsPage.results.artist[0].displayName;
    var subHeader = $("<a class=tour-link href=" + tourDate + ">Find out where " + $('#artistDiv').text() + " is currently touring by clicking here</a>");
    var tourDate = response.resultsPage.results.artist[0].uri;
    var onTour = response.resultsPage.results.artist[0].onTourUntil;
    
    $('#artistNameTour').text(artistName);
    $('#tourDate').text('On Tour Until: ' + onTour);
    $('#tourLink').append(subHeader);

    console.log('LINK TO TOUR INFO: '+tourDate);
  })
};
artistLookup();


function displayYouTubeVideo() {
  var searchTerm = $('#searchInput').val().trim();

  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBr3fLPLRTVvMQovAL5Xi3pv4txQWnBZDA&q=' + searchTerm + '+official+music+video';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    // console.log(response);


    var firstVideoTitle = response.items[0].snippet.title;
    console.log('Video Title: ' + firstVideoTitle);
    
    firstVideoId = response.items[0].id.videoId;
    // console.log('Video ID: ' + firstVideoId);

    // This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    function onYouTubeIframeAPIReady(firstVideoId) {
      player = new YT.Player('musicVideoPlayer', {
        height: '240',
        width: '380',
        videoId: firstVideoId,
        events: {
          // 'onReady': onPlayerReady,
          // 'onStateChange': onPlayerStateChange
        }
      });
    }
    onYouTubeIframeAPIReady(firstVideoId);
  });
};

// ====================================
// YOUTUBE EMBED MUSIC VIDEO TRIAL CODE from https://developers.google.com/youtube/iframe_api_reference
// // ====================================
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

function displayLastFmInfo() {
  var searchTerm = $('#artistDiv').html();
  var queryURL = 'http://ws.audioscrobbler.com/2.0/?api_key=8479819dada681d1b1ca61c575bdb802&method=artist.getinfo&artist=' + searchTerm + '&format=json'

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    // console.log('LastFM: ' + response.artist.name);
    var artistName = JSON.stringify(response.artist.name);
    var results1 = JSON.parse(JSON.stringify(response.artist.bio.summary));
    $('#artistName').text(artistName);
    $('#results1').text(results1);
  });

}
displayLastFmInfo();


function newsTab() {
  hideAll();
  $('#newsPage').show();
};

function photosTab() {
  hideAll();
  $('#photosPage').show();
};

function tourTab() {
  hideAll();
  $('#tourPage').show();
};

function mainPage() {
  hideAll();
  $('#frontPage').show();
  $('#musicVideo').show();
}

function contactTab() {
  hideAll();
  $('#contactPage').show();
};

var newMusicVideo = $('<img>').attr('id', 'musicVideoPlayer');

$('#submitButton').on('click', function () {
  event.preventDefault();
  $('#musicVideoContainer').empty();
  $('#musicVideoContainer').append(newMusicVideo);
  displayYouTubeVideo();
  displayLastFmInfo();
  $('#musicVideo').show();

});

$('#newsTab').on('click', function () {
  newsTab();
});

$('#homeTab').on('click', function () {
  anime({
    targets: 'section .transition',
    translateY: 275,
    direction: 'reverse',
    delay: anime.stagger(100),
  });
  mainPage();
});

$('#photosTab').on('click', function () {
  photosTab();
});

$('#tourDatesTab').on('click', function () {
  tourTab();
});

$('#contactTab').on('click', function () {
  contactTab();
});

$('#returnToMainPage').on('click', function () {
  mainPage();
});

$(function () {
  $('.jumbotron').css('opacity', 0);
  $('.navbar').css('opacity', 0);
  $('#frontPage').css('opacity', 0);
  $('#photosPage').css('opacity', 0);
  $('#tourPage').css('opacity', 0);
  $('#newsPage').css('opacity', 0);
  $('#contactPage').css('opacity', 0);
  $('.footer').css('opacity', 0);

  $('footer').hide();
  let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000,
  })

  tl.add({
    targets: 'section .transition',
    translateY: 1000,
    direction: 'reverse',
    delay: anime.stagger(100, { from: 'center' }),
  })

  tl.add({
    targets: 'section .transition',
    translateY: -1000,
    delay: anime.stagger(100, {from: 'center'}),
  })

  tl.add({
    targets: '.jumbotron',
  })
 
  tl.finished.then(function() {
    $('section').hide();
    $('.jumbotron').css('opacity', 1);
    $('.navbar').css('opacity', 1);
    $('#frontPage').css('opacity', 1);
    $('#photosPage').css('opacity', 1);
    $('#tourPage').css('opacity', 1);
    $('#newsPage').css('opacity', 1);
    $('#contactPage').css('opacity', 1);
    $('.footer').css('opacity', 1);
  });
});

function photosTab() {
  hideAll();
  $('#photosPage').show();
}


function tourTab() {
  hideAll();
  $('#tourPage').show();
}

function mainPage() {
  hideAll();
  $('#frontPage').show();
};

function contactTab () {
  hideAll();
  $('#contactPage').show();
};

var newMusicVideo = $('<img>').attr('id', 'musicVideoPlayer');

$('#submitButton').on('click', function () {
  event.preventDefault();
  $('#musicVideoContainer').empty();
  $('#musicVideoContainer').append(newMusicVideo);
  displayYouTubeVideo();
  displayLastFmInfo();

});

$('#newsTab').on('click', function () {
  newsTab();
});

$('#homeTab').on('click', function() {
  mainPage();
});

$('#photosTab').on('click', function () {
  photosTab();
});

$('#tourDatesTab').on('click', function() {
  tourTab();
});

$('#contactTab').on('click', function () {
  contactTab();
});

$('#returnToMainPage').on('click', function () {
  mainPage();
});

// //SPOTIFY Web Playback SDK

// var access_token = "";
// var player;
// (function() {

//   /**
//    * Obtains parameters from the hash of the URL
//    * @return Object
//    */
//   function getHashParams() {
//     var hashParams = {};
//     var e, r = /([^&;=]+)=?([^&;]*)/g,
//         q = window.location.hash.substring(1);
//     while ( e = r.exec(q)) {
//        hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     return hashParams;
//   }
//   var params = getHashParams();
//   var access_token = params.access_token,
//   refresh_token = params.refresh_token,
//   error = params.error;
//   console.log(access_token);
  
//   if (error) {
//     alert('There was an error during the authentication');
//   } else {
//     if (access_token) {
      
//       $.ajax({
//         url: 'https://api.spotify.com/v1/me',
//         headers: {
//           'Authorization': 'Bearer ' + access_token
//         },
//         success: function(response) {
          
//           $('#login').hide();
//           $('#loggedin').show();
//         }
//       });
//     } else {
//       // render initial screen
//       $('#login').show();
//       $('#loggedin').hide();
//     }
    
//     document.getElementById('obtain-new-token').addEventListener('click', function() {
//       $.ajax({
//         url: '/refresh_token',
//         data: {
//           'refresh_token': refresh_token
//         }
//       }).done(function(data) {
//         access_token = data.access_token;
//         return(access_token);
//       });
//     }, false);
//   }
//   window.onSpotifyWebPlaybackSDKReady = () => {
//     console.log("you know");
//     var token = access_token;
//     var player = new Spotify.Player({
//       name: 'Web Playback SDK Quick Start Player',
//       getOAuthToken: cb => { cb(token); }
//     });
    
//     // Error handling
//     player.addListener('initialization_error', ({ message }) => { console.error(message); });
//     player.addListener('authentication_error', ({ message }) => { console.error(message); });
//     player.addListener('account_error', ({ message }) => { console.error(message); });
//     player.addListener('playback_error', ({ message }) => { console.error(message); });
    
//     // Playback status updates
//     player.addListener('player_state_changed', state => { console.log(state); });
    
//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);
//     });
    
//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//       console.log('Device ID has gone offline', device_id);
//     });

    
//     // Connect to the player!
//     player.connect();
    
//     $("#playButton").click(function(){
//       player.resume();
//       playerStatus();
//     });
//     $("#pauseButton").click(function(){
//       player.pause();
//       playerStatus();
//     });
//     $("#previousButton").click(function(){
//       player.previousTrack();
//       playerStatus();
//     });
//     $("#nextButton").click(function(){
//       player.nextTrack();
//       playerStatus();
//     });
    
//     function playerStatus(){
//       player.getCurrentState().then(state => {
//       if (!state) {
//         console.error('User is not playing music through the Web Playback SDK');
//         return;
//       }
//       let {
//         current_track,
//         next_tracks: [next_track]
//       } = state.track_window;
      
//       console.log('Currently Playing', current_track);
//       console.log('Playing Next', next_track);

//       });
//     };
//   };

// })();