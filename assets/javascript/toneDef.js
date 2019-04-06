
//TRACK LOOKUP
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

//IP LOOKUP
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
});