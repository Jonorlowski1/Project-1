
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
  console.log(response.ip)
  response_ip = response.ip;
});
console.log(response_ip);