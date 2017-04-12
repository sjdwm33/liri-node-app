var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var command = process.argv[2];

if (command === 'my-tweets'){

// 	//*****LINK TO KEYS.JS****
// 	// var client = new Twitter({
// 	//   consumer_key: '',
// 	//   consumer_secret: '',
// 	//   access_token_key: '',
// 	//   access_token_secret: ''
// 	// });
	 
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
}

else if (command === 'spotify-this-song') {

}

if (command === 'movie-this') {
	var movieTitle = process.argv.slice(3).join('+');

	request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		}
	});
}

else if (command === 'do-what-it-says') {

}