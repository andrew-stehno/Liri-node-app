require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);

var track;
var artist;
var movie;


inquirer
    .prompt([
        {
            type: "input",
            message: "What musical track would you like to search for?",
            name: "track"
        },

        {
            type: "input",
            message: "What artist would you like to search a venue for?",
            name: "artist"
        },

        {
            type: "input",
            message: "What movie would you like to search for?",
            name: "movie"
        }
    ])
    .then(function(response) {
       console.log(response);
        track = response.track;
        artist = response.artist;
        movie = response.movie;

       tunes();
    //    venues();
    //    movies();

    
    
})

// Spotify API================================
function tunes() {

    trackTitle = "";

// Loop through all words in input:
    // for (let i = 0; i < track.length; i++) {
    //     if (i > 2 && i < track.length){
    //     trackTitle = trackTitle + "+" + track[i];
    // } else {
    //     trackTitle += track[i];
    // }
    // };

spotify
    .search({
        type: 'track', query: track, limit: 1
    })
    .then(function(response) {
        console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
        console.log("Track: " + response.tracks.items[0].name);
        console.log("Spotify preview: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("Album: " + response.tracks.items[0].album.name);
    })
    .catch(function(err) {
        console.log(err);
    });
}


// BandsInTown API============================

// Loop through all words in argument:
// for (let i = 2; i < trackTitle.length; i++) {
//     if (i > 2 && i < trackTitle.length){
//     artist = artist + "+" + trackTitle[i];
// } else {
//     artist += trackTitle[i];
// }
// };

// let queryURL = "https://rest.bandsintown.com/artists/ + artist + /events?app_id=codingbootcamp";
// console.log(queryURL);

// axios.get(queryURL).then(
//     function(response) {
//         console.log(response);
//     })
//     .catch(function(error) {
//         if (error.response) {
//             console.log(error);
//         }
//     })

// OMDB API===============================

    // // Loop through all words in argument:
    // for (let i = 2; i < trackTitle.length; i++) {
    //     if (i > 2 && i < trackTitle.length){
    //     artistmovieName = movieName + "+" + trackTitle[i];
    // } else {
    //     movieName += trackTitle[i];
    // }
    // };

    // let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryURL);

    // axios.get(queryURL).then(
    //     function(response) {
    //         console.log(response);
    //     })
    //     .catch(function(error) {
    //         if (error.response) {
    //             console.log(error);
    //         }
    //     })