//https://corona.lmao.ninja/v2/countries?yesterday&sort
//http:localhost:4444/getWeather?lat=31.95&lon=35.91&
const axios = require('axios');

async function getCountryFromCity(req, res) {
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.API_KEY}`;
    axios
        .get(URL)
        .then(results => {
            console.log('inside promise');


            const secondURL = `https://corona.lmao.ninja/v2/countries/${results.data.country_code}`
            axios
        .get(secondURL)
        .then(result => {
            let covidArray = result.data
            console.log('inside promise');
            console.log(secondURL)
            res.send(wetherForObject(covidArray));
            console.log(covidArray.country);
        })
        .catch(err => {
            res.status(500).json({message: "some reason error message", err: 400})
        })

        })
        
        .catch(error => {
            res.status(500).json({message: "some reason error message", error: 400})
        })
    
       
    console.log('outside promise');
    //res.send(wetherForObject(results.data))

}


const wetherForObject = (weatherObj) => {
    const forCastObj = [];
    console.log(weatherObj);
    let country = weatherObj.country;
    let cases=weatherObj.cases;
    let deaths=weatherObj.deaths;
    let active=weatherObj.active;
    let continent=weatherObj.continent;
    forCastObj.push(new Forcast(country,cases,deaths,active,continent));


    return forCastObj;

};

class Forcast {
    constructor(country,cases,deaths,active,continent) {

        this.country = country;
        this.cases= cases;
        this.deaths = deaths;
        this.active= active;
        this.continent=continent;


        

    }
}

module.exports = getCountryFromCity;
