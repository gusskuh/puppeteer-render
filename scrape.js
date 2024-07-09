import axios from 'axios';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';
import cron from 'node-cron';
import {createApi} from 'unsplash-js';

const categorySelector = 'ul.grid-layout li p';
const financeSelector = '.titles';

const scienceUrl = 'https://www.yahoo.com/news/science/';
const worldUrl = 'https://www.yahoo.com/news/world/';
const helthUrl = 'https://www.yahoo.com/lifestyle/tagged/health';
const financeUrl = 'https://finance.yahoo.com/';

const deafualtImages = {
    finance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHxmaW5hbmNlfGVufDB8fHx8MTcyMDUxMzcyN3ww&ixlib=rb-4.0.3&q=80&w=1080',
    health: 'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHxoZWFsdGh8ZW58MHx8fHwxNzIwNTE0MTE1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    world: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMGNvbnRpbmVudHN8ZW58MHx8fHwxNzIwNTE0MDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    science: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHxlcXVhdGlvbnN8ZW58MHx8fHwxNzIwNTE0MjMxfDA&ixlib=rb-4.0.3&q=80&w=1080'
}

export default async function scrape(req, res, ticker) {
    
    try {
        cron.schedule('*/2 * * * *', () => {
            init(financeSelector, financeUrl, 'finance');
        });
        cron.schedule('*/3 * * * *', () => {
            init(categorySelector, scienceUrl, 'science');
        });
        cron.schedule('/4 * * * *', () => {
            init(categorySelector, worldUrl, 'world');
        });
        cron.schedule('/5 * * * *', () => {
            init(categorySelector, helthUrl, 'health');
        });



    return;
    // return {stockData, chartData};
    } catch (e) {
        console.log('ERROR HAS ACCURED', e)
    } finally {
        // await browser.close();
    }
}

async function init(selector, url, category) {
    try {
        console.log('Starting...')
        const apiKey = process.env.AI_API_KEY;
        // console.log('apiKEy', apiKey)
        const title = await getTitle(selector, url);
        console.log('Title', title);
        
        // return;
    
        
        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Can you pretend you are a Yahoo reporter that is writing the content of the subject of the main title that is in Yahoo right now. this is the tiltle:
            ${title}.
            The content, title. and subtitle must be original, unique, SEO friendly and between 500-800 words.  
            Please return a javascript object where properties are srounded with "" with the following properties: 
            title: please create a new title based on the one you got, 
            subtitle:please create a new subtitle based on the one you got,
            metaTitle: a title that will be used for meta tags,
            metaKeywords: keywords array for meta tags,
            metaDescription: short description that will be used for meta tags, 
            content: this is an array of the content you wrote. each elemnet in the array has, subtitle and content propert, (please dont use the words: 'conclusion: or introduction: in the subtitles')
            timeToRead: how long in minutes it will take to read the article you just created. 
            keywordForImage: choose the most relevant keyword of the topic you wrote. This will be used to fetch image from an api
            so its important that this keyword would be the best to describe the topic you write about.
            please make sure you dont use the title and subtitle you got, please make a new one. Could you return it as is, without the '''javascript decoration you add there.` }
        ];
        
        const data = {
            model: "gpt-4o",  // Use gpt-3.5-turbo instead of gpt-4
            messages: messages,
            max_tokens: 2500,
            temperature: 0.7,
        };
        
        axios.post('https://api.openai.com/v1/chat/completions', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        })
        .then(async(response) => {
            let article = response.data.choices[0].message.content.trim();
            const articleObj = JSON.parse(article)
            articleObj.date = new Date().toDateString();
            articleObj.timeStamp = Date.now();
            articleObj.category = category;
            console.log('articleObj.keywordForImage', articleObj.keywordForImage)
            const imgData = await getImgUrl(articleObj.keywordForImage, category);
            articleObj.imgUrl = imgData.imageUrl;
            articleObj.imgUser = imgData.userName;
            articleObj.imgUserProfile = imgData.userProfile;
            article = JSON.stringify(articleObj)
            console.log(article);
        
            axios.post('https://ai-content-generation-7fd31-default-rtdb.firebaseio.com/generated-content.json', article);
            return article;
        })
        .catch(error => {
            console.error('Error generating content:', error.response ? error.response.data : error.message);
        });

    } catch(err) {
        console.log('***** SOMETHING WENT WRONG!!!!!******', err)
    }

}

async function getTitle(selector, url) {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        timeout: 180000,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process', '--no-zygote'],
        executablePath: process.env.NODE_ENV === 'production' 
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(), 
    });

    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(url);

    // Locate the full title with a unique string.
    const textSelector = await page.waitForSelector(selector);
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title.

    await browser.close();
    return fullTitle
}

async function getImgUrl(subtitle, category) {
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    const unsplash = createApi({
        accessKey: unsplashAccessKey,
        fetch: fetch,
    });

     // Fetch a relevant image from Unsplash
     const imageResponse = await unsplash.search.getPhotos({
        query: subtitle,
        page: 1,
        perPage: 1,
    });

    const imageUrl = imageResponse.response.results[0]?.urls?.regular;
    if (!imageUrl) {
        imageUrl = deafualtImages[category]
    }
    const userName = imageResponse.response.results[0]?.user?.name;
    const userProfile = imageResponse.response.results[0]?.user?.links?.html;

        console.log(imageUrl)
        return {
            imageUrl,
            userName,
            userProfile
    }
}