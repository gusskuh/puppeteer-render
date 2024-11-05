
import serverless from 'serverless-http';

const express = require('express');

const serverless = require('serverless-http');

const app = express();
const router = express.Router();


router.get('/hello', (req, res) => res.send('Hello World!'));

app.use('/.netlify/functions/api', router);

export const handler = serverless(api);