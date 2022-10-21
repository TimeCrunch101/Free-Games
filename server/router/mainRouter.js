const express = require('express');
const main = require('../controllers/main')

const router = express.Router();

let initMainRouter = (app) => {

    router.get('/api', main.entry);
    router.get('/api/game:game_id', main.gameData);

    return app.use('/', router)
};

module.exports = router;
module.exports = initMainRouter;
