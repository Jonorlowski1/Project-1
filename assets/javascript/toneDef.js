function hideAll() {
  $('#frontPage').hide();
  $('#newsPage').hide();
  $('#photosPage').hide();
  $('#tourPage').hide();
  $('#contactPage').hide();
}

$(document).on("ready", function () {
  hideAll();
  $('#frontPage').show();
});

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
    var lyrics = response.lyrics;
    $("#lyrics-div").html(lyrics);
  });
};
displayLyrics();
// IP LOOKUP
function displayEvents() {
  var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
  var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
  var response_ip;
  $.ajax({
    url: queryURL_IP,
    method: "GET",
  }).then(function (response) {

    console.log("user's ip")
    console.log(response.ip)
    response_ip = response.ip;

    //SONGKICK EVENT LOOKUP
    var apikey_localEvents = "926QLoynaFfTnoup"
    var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
    $.ajax({
      url: queryURL_localEvents,
      method: "GET",
    }).then(function (response) {

      console.log("songkick");
      console.log(response);
    })
  });
};

var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
var response_ip;
$.ajax({
  url: queryURL_IP,
  method: "GET",
}).then(function (response) {

  console.log("user's ip")
  console.log(response.ip)
  response_ip = response.ip;

  //SONGKICK NEARBY EVENT LOOKUP
  var apikey_localEvents = "926QLoynaFfTnoup"
  var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
  $.ajax({
    url: queryURL_localEvents,
    method: "GET",
  }).then(function (response) {

    console.log("local upcoming events");
    console.log(response.resultsPage.results.location[0].metroArea.uri);
  })
  //SONGKICK SIMILAR ARTIST LOOKUP
  var artist = "ARTIST GOES HERE";
  var queryURL_artistEvents = "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + apikey_localEvents + "&query=" + artist;
  $.ajax({
    url: queryURL_artistEvents,
    method: "GET",
  }).then(function (response) {

    console.log("artist upcoming events");
    console.log(response);
  })

});


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
    console.log('Video ID: ' + firstVideoId);

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
// ====================================
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}


function stopVideo() {
  player.stopVideo();
}

function displayWikiInfo() {
  var searchTerm = $('#searchInput').val().trim();
  var cors = 'https://cors-anywhere.herokuapp.com/'
  var queryURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json';
  console.log(searchTerm);

  $.ajax({
    url: cors + queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);
    // var results = response[2][0];
    // ^^^ Creates one line of info. Can add more at will by changing the [0] to [1], [2], etc.
  });
};


// function displayNewsInfo() {
//   var searchArtist = $('#searchInput').val().trim();
//   var queryURL = 'https://newsapi.org/v2/everything?q=' + searchArtist + '&from=2019-03-06&sortBy=publishedAt&apiKey=ad64dfb3904d4063bbc4193ffff9173f'

//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function (response) {
//     // console.log(response);
//   });
// };


function newsTab() {
  hideAll();
  $('#newsPage').show();
};

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

function contactTab() {
  hideAll();
  $('#contactPage').show();
}



$('#submitButton').on('click', function () {
  event.preventDefault();
  displayYouTubeVideo();
  displayWikiInfo();

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


//SPOTIFY Web Playback SDK

// window.onSpotifyWebPlaybackSDKReady = () => {
//   const token = 'BQA6vXPezXcxre-w_iPU1ULuwLaTALDaolLtxtdh9APRk2MuWGdufrAS6zFBRDwuqrKiEoTAukVnWF5XDjYt7biSgWmQY_t4yu7WhmY4J0xKOb0XkUsz__DOv1k2xs1bm10ffz1Uy0DUfjnm3T1inyKIJHtMxQkyBIcfw89SOZ9T6zgkfY3CZrJf';
//   const player = new Spotify.Player({
//     name: 'Web Playback SDK Quick Start Player',
//     getOAuthToken: cb => { cb(token); }
//   });

//   // Error handling
//   player.addListener('initialization_error', ({ message }) => { console.error(message); });
//   player.addListener('authentication_error', ({ message }) => { console.error(message); });
//   player.addListener('account_error', ({ message }) => { console.error(message); });
//   player.addListener('playback_error', ({ message }) => { console.error(message); });

//   // Playback status updates
//   player.addListener('player_state_changed', state => { console.log(state); });

//   // Ready
//   player.addListener('ready', ({ device_id }) => {
//     console.log('Ready with Device ID', device_id);
//   });

//   // Not Ready
//   player.addListener('not_ready', ({ device_id }) => {
//     console.log('Device ID has gone offline', device_id);
//   });

//   // Connect to the player!
//   player.connect();





