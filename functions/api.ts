

const express = require('express');

const serverless = require('serverless-http');

const app = express();
const router = express.Router();

import scrape from './scrape.js';
scrape();

console.log('Starting')


router.get('/hello', (req, res) => res.json('Hello World!'));
router.get('/', (req: any, res: any) => {
    res.json('HELLO WORLD3');
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);