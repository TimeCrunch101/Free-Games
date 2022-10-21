
const api = require('./apiController');
var gamesArr
exports.entry = async (req, res) => {
    if (gamesArr === undefined) {
        try {
            gamesArr = await api.getAllGames();
            return res.status(200).send(gamesArr);
        } catch (error) {
            let errMsg = {
                msg: 'Error with API...'
            }
            return res.status(500).send(errMsg)
        }
    }
    return res.status(200).send(gamesArr);
}
exports.gameData = async (req, res) => {
    try {
        const gameData = await api.getGame(req.params.game_id)
        return res.status(200).send(gameData)
    } catch (error) {
        let errMsg = {
            msg: 'Error with API...'
        }
        return res.status(500).send(errMsg)
    }
}