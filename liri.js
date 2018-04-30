require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
   
  var params = {screen_name: 'findTBDE',
                count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (let i = 0; i < tweets.length; i++) {
            console.log("On "+ tweets[0].created_at+" ,"+tweets[0].user.name+ " tweeted: ");
            console.log(tweets[i].text);
        }
    }
  });

   
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
   
  spotify.search({ type: 'track', query: 'All the Small Things', limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  console.log("Here's the song you requested: ")  
  console.log(data.tracks.items[0].name); 
  console.log(data.tracks.items[0].artists[0].name)
  console.log(data.tracks.items[0].external_urls.spotify)

  });
