if (process.env.NODE_EVN !== 'production') require('dotenv').config()
const axios = require("axios");
const getAllGames = () => {
    return new Promise((resolve, reject) => {
        const options = {
          method: 'GET',
          url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
          headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
        };
        axios.request(options).then((res) => {  
            resolve(res.data)
        }).catch((error) => {
            reject(error)
            
        });
    })
    
};
const getGame = (game_id) => {
    const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
        params: {id: game_id},
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
    return new Promise((resolve, reject) => {
        axios.request(options).then((response) => {
            const dataPackage = {
                gameData: response.data,
                imgs: response.data.screenshots
            }
            resolve(dataPackage)
        }).catch((err) => {
            reject(err)
        });

    })
}
module.exports = {
    getAllGames,
    getGame
}