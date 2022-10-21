if (process.env.NODE_EVN !== 'production') require('dotenv').config()
const axios = require("cross-fetch");
const getAllGames = () => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        axios.fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => reject(err));
    })
};
const getGame = (game_id) => {
    return new Promise((resolve, reject) => {


        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
        axios.fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${game_id}`, options)
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => reject(err));



    })
}
module.exports = {
    getAllGames,
    getGame
}