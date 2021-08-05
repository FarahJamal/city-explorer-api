//http:localhost:4444/getWeather?lat=31.95&lon=35.91&
const axios = require('axios');

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

module.exports = getWeatherHandler;
