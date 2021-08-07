'use strict'

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
server.use(cors());
const PORT = process.env.PORT;

const getWeatherHandler = require("./Modules/Weather");
const getMovieHandler = require("./Modules/Movies");
const getCountryFromCity = require("./Modules/Covid");

server.get('/Weather', getWeatherHandler);
//http:localhost:3011/movies?city=Amman
server.get('/movies', getMovieHandler);
server.get(`/covid`, getCountryFromCity);
server.listen(PORT, () => {

    console.log(` I am listen = ${PORT} `)
})