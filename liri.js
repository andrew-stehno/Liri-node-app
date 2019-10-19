require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var trackTitle = process.argv[2];

spotify
    .search({
        type: 'track', query: trackTitle, limit: 1
    })
    .then(function(response) {
        console.log(response.tracks.items);
    })
    .catch(function(err) {
        console.log(err);
    });

