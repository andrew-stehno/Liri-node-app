// NPM require:
require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let Spotify = require("node-spotify-api");
let inquirer = require("inquirer");
let moment = require("moment");
let fs = require("fs");

let spotify = new Spotify(keys.spotify);

// Globals:
let track;
let artist;
let movie;
let doWhat;
let song;
let band;
let film;

// User input:
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
        },

        {
            type: "confirm",
            name: "do-what-it-says",
            message: 'Would you like to run "do-what-it-says"?',
            default: true
        }

    ])
    .then(function (response) {
        console.log(response);
        console.log("\n")

        // Prompts stored in variables:
        track = response.track;
        artist = response.artist;
        movie = response.movie;
        doWhat = response["do-what-it-says"];
        
        // Invoke functions:
        doWhatItSays();
        tunes();
        venues();
        movies();
       
    });

// Do what it says ============================
function doWhatItSays() {
    if (!doWhat === true) {
        console.log("You're missing out on the greatest songe ever!");
        console.log("\n");
    } else {
        randomTxt();
    }

};

// Spotify API================================
function tunes() {

    // Data validation:
    if (!track) {
        track = "The Sign by Ace of Base";
    }

    spotify
        .search({
            type: 'track', query: track, limit: 1
        })

        .then(function (response) {
            // console.log(JSON.stringify(response.tracks, null, 2));

            // Store responses in variables:
            let performer = response.tracks.items[0].album.artists[0].name;
            let track1 = response.tracks.items[0].name;
            let spotifyPreview = response.tracks.items[0].album.artists[0].external_urls.spotify;
            let album = response.tracks.items[0].album.name;

            // Console log to terminal:
            console.log("=============================")
            console.log("Spotify API");
            console.log("Artist: " + performer);
            console.log("Track: " + track1);
            console.log("Spotify preview: " + spotifyPreview);
            console.log("Album: " + album);
            console.log("=============================")
            console.log("\n");

            // Concatenate responses to append to log.txt:
            song = "Artist: " + performer + "\r\n" + "Track: " + track1 + "\r\n" + "Spotify: " + spotifyPreview + "\r\n" + "Album: " + album + "\r\n" + "\r\n";

            append();
        })

        // IF any errors, log to terminal:
        .catch(function (err) {
            console.log(err);
        })
};

// BandsInTown API============================
function venues() {

    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            // console.log(JSON.stringify(response.data, null, 2));

            // Store responses in variables:
            let date = response.data[0].datetime;
            let place = response.data[0].venue.name;
            let location = response.data[0].venue.city + ", " + response.data[0].venue.region;
            let time = moment(date).format('MM/DD/YYYY');

            // Console log to terminal:
            console.log("=============================")
            console.log("Bands in Town API");
            console.log("Name of venue: " + place);
            console.log("Location: " + location);
            console.log(time);
            console.log("=============================")
            console.log("\n");

            // Concatenate responses to append to log.txt:
            band = "Venue: " + place + "\r\n" + "Location: " + location + "\r\n" + "Date: " + time + "\r\n" + "\r\n";

            append();
        })

        // IF any errors, log to terminal:
        .catch(function (error) {
            if (error.response) {
                console.log(error);
            }
        })
};

// OMDB API===============================
function movies() {

    // Data validation:
    if (!movie) {
        movie = "Mr. Nobody";
    }
    let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function (response) {
            // console.log(JSON.stringify(response.data, null, 2));

            // Store responses in variables:
            let pictureShow = response.data.Title;
            let year = response.data.Year;
            let rated = response.data.Rated;
            let rottenTomatoes = response.data.Ratings[1].Value;
            let country = response.data.Country;
            let language = response.data.Language;
            let plot = response.data.Plot;
            let actors = response.data.Actors;

            // Console log to terminal:
            console.log("=============================")
            console.log("OMDB API");
            console.log("Movie title: " + pictureShow);
            console.log("Year: " + year);
            console.log("Rated: " + rated);
            console.log("Rotten Tomatoes: " + rottenTomatoes);
            console.log("Country: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);
            console.log("=============================")
            console.log("\n");

            // Concatenate responses to append to log.txt:
            film = "Movie: " + pictureShow + "\r\n" + "Year: " + year + "\r\n" + "Rated: " + rated + "\r\n" +
                "Rotten Tomatoes: " + rottenTomatoes + "\r\n" + "Country: " + country + "\r\n" + "Language: " + language +
                "\r\n" + "Plot: " + plot + "\r\n" + "Actors: " + actors + "\r\n" + "\r\n";

            append();
        })
        // IF any errors, log to terminal:
        .catch(function (error) {
            if (error.response) {
                console.log(error);
            }
        })
};

// Read file===========================
function randomTxt() {
    fs.readFile("random.txt", "utf8", function(error, random) {
        // IF any errors, log to terminal:
        if (error) {
            return console.log(error);
        }
    
        // console.log(random);
        let randomArr = random.split(",");
        // console.log(randomArr);
        let read = randomArr[1];

        spotify
        .search({
            type: 'track', query: read, limit: 1
        })

        .then(function (response) {
            // console.log(JSON.stringify(response.tracks, null, 2));

            // Store responses in variables:
            let performer = response.tracks.items[0].album.artists[0].name;
            let track1 = response.tracks.items[0].name;
            let spotifyPreview = response.tracks.items[0].album.artists[0].external_urls.spotify;
            let album = response.tracks.items[0].album.name;

            // Console log to terminal:
            console.log("=============================")
            console.log("Spotify API");
            console.log("Artist: " + performer);
            console.log("Track: " + track1);
            console.log("Spotify preview: " + spotifyPreview);
            console.log("Album: " + album);
            console.log("=============================")
            console.log("\n");

            // Concatenate responses to append to log.txt:
            song = "Artist: " + performer + "\r\n" + "Track: " + track1 + "\r\n" + "Spotify: " + spotifyPreview + "\r\n" + "Album: " + album + "\r\n" + "\r\n";

            append();
        })

        // IF any errors, log to terminal:
        .catch(function (err) {
            console.log(err);
        })
    })
    };

// Append files to log.txt=====================
function append() {
    fs.appendFile("log.txt", song || band || film, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("=============================");
            console.log("Content added to log!");
            console.log("=============================");
            console.log("\n");
        }
    })
};

