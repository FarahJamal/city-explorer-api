'use strict'

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
server.use(cors());
const PORT = process.env.PORT;



//http:localhost:3011/movies?city=Amman
server.get('/movies', getMovieHandler);

async function getMovieHandler(req, res) {
    const city = req.query.city
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_MOVIE_KEY}&query=${city}`

    axios
        .get(URLMovie)
        .then(result => {
            console.log('inside promise');

            let moviesArray = result.data.results

            res.send(moviesForObject(moviesArray));
        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');
}


const moviesForObject = (moviesObj) => {

    const forMoviesObj = [];
    moviesObj.map(element => {

    const title = element.title
    const overview = element.overview
    const vote_average = element.vote_average
    const vote_count = element.vote_count
    const poster_path = process.env.img_url+element.poster_path
    const popularity = element.popularity
    const release_date = element.release_date

        forMoviesObj.push(new Movies(title,overview,vote_average,vote_count,poster_path,popularity,release_date));

        console.log(forMoviesObj);
    });
    return forMoviesObj;
}


class Movies {
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date) {
    this.title = title
    this.overview = overview
    this.vote_average = vote_average
    this.vote_count = vote_count
    this.poster_path = poster_path
    this.popularity = popularity
    this.release_date = release_date
    }
}

//http:localhost:4444/getWeather?lat=31.95&lon=35.91&
server.get('/Weather', getWeatherHandler);

async function getWeatherHandler(req, res) {
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.API_KEY}`;


    axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            let weatherArray = result.data
            res.send(wetherForObject(weatherArray));
        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');
}

const wetherForObject = (weatherObj) => {

    const forCastObj = [];
    weatherObj.data.map(element => {

        const description = `Low of ${element.low_temp} ,High of ${element.max_temp} with ${element.weather.description}`;
        const date = element.datetime;
        forCastObj.push(new Forcast(description, date));
        console.log(forCastObj);
    });
    return forCastObj;
};
class Forcast {
    constructor(description, date) {
        this.date = date;
        this.description = description;

    }
}




server.listen(PORT, () => {

    console.log(` I am listen = ${PORT} `)
})