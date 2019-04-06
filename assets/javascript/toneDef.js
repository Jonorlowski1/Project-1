function displayYouTubeVideo() {
  var searchTerm = $('#searchInput').val().trim();

  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBr3fLPLRTVvMQovAL5Xi3pv4txQWnBZDA&q=' + searchTerm + '+official+music+video';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    // console.log(response);

    var firstVideoTitle = response.items[0].snippet.title;
    // console.log(firstVideoTitle);

    var firstVideoId = response.items[0].id.videoId;
    $('#musicVideoThumbnail').attr('src', 'http://img.youtube.com/vi/' + firstVideoId + '/0.jpg');
    // console.log(firstVideoId);

  });
};

function displayWikiInfo() {
  var searchTerm = $('#searchInput').val().trim();
  var cors = 'https://cors-anywhere.herokuapp.com/'
  var queryURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json';
  // console.log(searchTerm);
  
  $.ajax({
    url: cors + queryURL,
    method: 'GET'
  }).then(function (response) {
    // console.log(response);
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
  $('#frontPage').hide();
  $('#newsPage').show();
}

function mainPage() {
  $('#newsPage').hide();
  $('#frontPage').show();
}

$('#submitButton').on('click', function () {
  event.preventDefault();
  displayYouTubeVideo();
  displayWikiInfo();
  displayNewsInfo();
});

$('#newsTab').on('click', function () {
  newsTab();
});

$('#returnToMainPage').on('click', function () {
  mainPage();
});