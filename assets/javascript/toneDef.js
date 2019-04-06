//TRACK LOOKUP
function displayLyrics () {
var apikey = "725fc5d99abf5995b333f22c0915ba0d";
var trackname = "spiderwebs"; // "TRACK INPUT TEXT";
var trackIDQueryURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=" + trackname + "&quorum_factor=1&apikey=" + apikey;

$.ajax({
    url: trackIDQueryURL,
    method: "GET",
    jsonp: "callback",
    dataType: "jsonp"
  }).then(function(response) {
    
    console.log("tracks info")
    console.log(response)

  });
};

// IP LOOKUP
function displayEvents () {
var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
var response_ip;
$.ajax({
  url: queryURL_IP,
  method: "GET",
}).then(function(response) {

    console.log("user's ip")
    console.log(response.ip)
    response_ip = response.ip;
  
    //SONGKICK EVENT LOOKUP
    var apikey_localEvents = "926QLoynaFfTnoup"
    var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
    $.ajax({
        url: queryURL_localEvents,
        method: "GET",
    }).then(function(response) {
        
        console.log("songkick");
        console.log(response);
  })
};

function displayYouTubeVideo() {
  var searchTerm = $('#searchInput').val().trim();

  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBr3fLPLRTVvMQovAL5Xi3pv4txQWnBZDA&q=' + searchTerm + '+official+music+video';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    // console.log(response);

    var firstVideoTitle = response.items[0].snippet.title;
    console.log(firstVideoTitle);

    var firstVideoId = response.items[0].id.videoId;
    $('#musicVideoThumbnail').attr('src', 'http://img.youtube.com/vi/' + firstVideoId + '/0.jpg');
    console.log(firstVideoId);

  });
};

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

$('#submitButton').on('click', function () {
  event.preventDefault();
  displayYouTubeVideo();
   displayWikiInfo();

});