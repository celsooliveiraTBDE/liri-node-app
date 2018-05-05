require("dotenv").config();
var fs = require("fs");
var inquirer = require("inquirer");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var choice = process.argv[2];
var input = process.argv[3];



// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

switch(choice) {

  case 'my-tweets':
  console.log("HI twitter")  
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
 
    var params = {screen_name: 'findTBDE',count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (let i = 0; i < tweets.length; i++) {
              console.log("On "+ tweets[0].created_at+" ,"+tweets[0].user.name+ " tweeted: ");
              console.log(tweets[i].text);
          }
      }
    });

 
;
  break;
  case `spotify-this-song`:

  function spotified(mysong) {
    
  console.log("HI Spotify");
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
   
  spotify.search({ type: 'track', query: mysong, limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  console.log("Here's the song you requested: ")  
  console.log(data.tracks.items[0].name); 
  console.log(data.tracks.items[0].artists[0].name)
  console.log(data.tracks.items[0].external_urls.spotify)

  });

}
spotified(input); 
  break;

  case `movie-this`:
  console.log("OMBD MOVIE THIS");
  console.log(input);
  if (input==="") {
  input="Mr. Nobody"    
  }
  request('http://www.omdbapi.com/?apikey=trilogy&t='+input+' ', function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log(body); 
  console.log("Movie Name: " + JSON.parse(body).Title); 
  // * Title of the movie.
  console.log("Release Year: " + JSON.parse(body).Year); 
  // * Year the movie came out.
  console.log("IMDB's rating: " + JSON.parse(body).imdbRating); 
  // * IMDB Rating of the movie.
  console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value); 
  // * Rotten Tomatoes Rating of the movie.
  console.log("Country of Origin: " + JSON.parse(body).Country); 
  // * Country where the movie was produced.
  console.log("Language: " + JSON.parse(body).Language); 
  // * Language of the movie.
  console.log("Plot: " + JSON.parse(body).Plot); 
  // * Plot of the movie.
  console.log("Actors:  " + JSON.parse(body).Actors); 
  // * Actors in the movie.

});

  break;

  case `do-what-it-says`:
  console.log("HI repeat")    ;
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // We will then print the contents of data
    console.log(data);
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    var input = dataArr[0]
    var input2 = dataArr[1]; 
    // We will then re-display the content as an array for later use.
    console.log(dataArr);
    console.log(input);
    console.log(input2); 
    
  
  });
  inquirer.prompt([
    {
      name: "choice",
      message: "What is your choice?"
    },
  ]).then(function(answers) {
    // take in all of the user's answers to the questions above
    var test = answers.choice;    
    console.log(test);
    spotified(test);
    // pushes newguy object into our array
    // add one to count to increment our recursive loop by o x  // run the askquestion function again so as to either end the loop or ask the questions again
  });

  break;

  default:
console.log("Sweet")

}

