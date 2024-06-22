const express = require('express');
const app = express();

const { scrape } = require('./scrape');

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/scrape/:ticker', (req, res) => {
    const ticker  = req.params.ticker;
    scrape(req, res, ticker);
})

app.get('/get-title', (req, res) => {
    const ticker  = req.params.ticker;
    const title = scrape();
    res.send(title);
})

app.listen(6543, () => {
    console.log('App is listening on port 6543')
})