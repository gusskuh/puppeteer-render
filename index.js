const express = require('express');
const app = express();

const { scrape } = require('./scrape');

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/scrape', (req, res) => {
    scrape(req, res);
})

app.listen(6543, () => {
    console.log('App is listening on port 6543')
})