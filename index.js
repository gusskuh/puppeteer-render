import express from 'express';
const app = express();

import scrape from './scrape.js';
scrape();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/get-title',async (req, res) => {
    const article = await scrape();
    console.log('article',article)
    res.send(article);
})

app.listen(6543, () => {
    console.log('App is listening on port 6543')
})