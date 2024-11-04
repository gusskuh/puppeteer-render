import express from 'express';
const app = express();

const router = express.Router();
import serverless from 'serverless-http';

import scrape from './scrape.js';
scrape();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/get-title',async (req, res) => {
    const article = await scrape();
    console.log('article',article)
    res.send(article);
})

app.listen(6543, () => {
    console.log('App is listening on port 6543')
})

app.use('/.netlify/functions/app', router);
export const handler = serverless(app);