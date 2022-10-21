// List the Dependencies
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const initMainRouter = require('./router/mainRouter');
// Create Express Server
const app = express();
const PORT = process.env.PORT || 5000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Router Init
initMainRouter(app);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}
app.listen(PORT, () => console.log(`Server running http://127.0.0.1:${PORT}/`));