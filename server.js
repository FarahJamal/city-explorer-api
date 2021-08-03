'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();

const weatherData = require('./data/weather.json');
server.use(cors());

const PORT = 3001;
// http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman

server.get('/weather', (req, res) => {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    const cityname = req.query.searchQuery;


    const weatherresult = weatherData.find(element => {
        if (((lat === element.lat) && (lon === element.lon)) && (cityname === element.city_name)) {
            return true;
        }
        else {

            return '';
        }
    })

    if (weatherresult) {
        res.send(weatherForcastObject(weatherresult))
    }
    else {
        res.status(404).send('city not found');
    }

})

const weatherForcastObject = (weatherObj) => {
    const forcastObj = [];

    weatherObj.data.map(element => {
       const description = `Low of ${element.low_temp} ,high of ${element.max_temp} with ${element.weather.description} `;
       const date = element.datetime;

        forcastObj.push(new Forcast(description,date));
console.log(forcastObj);
    });


return forcastObj; 

};



class Forcast {

    constructor(description,date) {

        
        this.date = date;
        this.description = description;

    }

}

server.listen(PORT, () => {
    console.log(`listening To PORT = ${PORT}`);
});