const axios = require('axios');

let myMemory = {};


async function getMovieHandler(req, res) {
    const city = req.query.city
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_MOVIE_KEY}&query=${city}`

    if (myMemory[city] !== undefined) {
        console.log('get the data from the memory')
        res.send(myMemory[city])
    }
    else{
    axios
        .get(URLMovie)
        .then(result => {
            console.log('inside promise');
            let moviesArray = result.data.results;
          
               moviesArray.length!==0 ? res.send(moviesForObject(moviesArray)): res.json(moviesForObject({message:"some reason error message"}));
               console.log(moviesArray);
            
        })
        .catch((err) => {
            //res.send('https://www.yellowheadinc.com/wp-content/uploads/2018/01/404-error-page.jpg');
            res.status(500).json({message: "some reason error message", err: 400})

        })
        
    console.log('outside promise');
}
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

module.exports = getMovieHandler ;
