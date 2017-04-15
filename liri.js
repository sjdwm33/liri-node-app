var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//function variables
var command = process.argv[2];
var song = process.argv.slice(3).join('+');
var movieTitle = process.argv.slice(3).join('+');

//function to get 20 most recent tweets
function myTweets(){
	var twitKeys = require("./keys.js");
	var client = new twitter (twitKeys.twitterKeys);
	 
	client.get('statuses/user_timeline', 20, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i < tweets.length; i++) {
	     console.log(tweets[i].created_at);
	     console.log(tweets[i].text);
	    };
	  }
	});
};

//function to get spotify info
function spotifyThis(){
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if (!err) {
	    	var songInfo = data.tracks.items[3];

	    	console.log("Artist: " + songInfo.artists[0].name);
	    	console.log("Song Title: " + songInfo.name);
	    	console.log("Album: " + songInfo.album.name);
	    	console.log("Preview URL: " + songInfo.preview_url);
	    }
	});
};

//function to search OMDB
function movieThis(){
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
};

//function to read and follow directions of random.txt
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(err, data) {

  		if(!err){
    		let output = data.split(",");
    		
    		if (output[0] === "my-tweets"){
    			myTweets();
    		}
    		else if (output[0] === "spotify-this-song"){
    			song = output[1];
    			spotifyThis();
    		}
    		else if (output[0] === "movie-this"){
    			movieTitle = output[1];
    			movieThis();
    		}
  		}

	});
};

//Code to determine when to run which function
if (command === 'my-tweets'){
	myTweets();
}

else if (command === 'spotify-this-song') {
	if (song === ''){
		song = "The Sign";
		spotifyThis();
	}
	else {
		spotifyThis();
	}	
}

else if (command === 'movie-this') {
	if (movieTitle === ''){
		movieTitle = "Mr. Nobody";
		movieThis()
	}
	else {
		movieThis();
	}
}

else if (command === 'do-what-it-says') {
	doWhatItSays();
}