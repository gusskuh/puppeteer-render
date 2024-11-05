import axios from 'axios';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import cron from 'node-cron';
import { createApi } from 'unsplash-js';

import SocialMediaAPI from 'social-media-api';
const social = new SocialMediaAPI(process.env.SOCIAL_MEDIA_API_KEY);

const categorySelector = 'li.stream-item';
const financeSelector = '.titles';

const scienceUrl = 'https://www.yahoo.com/news/science/';
const worldUrl = 'https://www.yahoo.com/news/world/';
const helthUrl = 'https://www.yahoo.com/lifestyle/tagged/health';
const financeUrl = 'https://finance.yahoo.com/';

const urls = {
    science: [
        {
            url: 'https://www.yahoo.com/news/science',
            selector: 'li.stream-item',
        },
        {
            url: 'https://news.sky.com/technology',
            selector: '.ui-story-headline',
        },
        {
            url: 'https://www.businessinsider.com/science',
            selector: 'article.with-description',
        },
        {
            url: 'https://www.ft.com/technology',
            selector: '.o-teaser__content',
        },
        {
            url: 'https://edition.cnn.com/science',
            selector: '.container__headline',
        },
        {
            url: 'https://www.ibtimes.com/technology',
            selector: 'article',
        },
    ],
    world: [
        {
            url: 'https://www.businessinsider.com/travel',
            selector: 'article.with-description',
        },
        {
            url: 'https://www.ft.com/world',
            selector: '.o-teaser__content',
        },
        {
            url: 'https://edition.cnn.com/world',
            selector: '.container__headline',
        },
        {
            url: 'https://www.ibtimes.com/world',
            selector: 'article',
        },
        {
            url: 'https://www.yahoo.com/news/world/',
            selector: 'li.stream-item',
        },
    ],
    health: [
        {
            url: 'tps://www.businessinsider.com/health',
            selector: 'article.with-description',
        },
        {
            url: 'https://edition.cnn.com/health',
            selector: '.container__headline',
        },
        {
            url: 'https://www.webmd.com/',
            selector: '.module-text',
        },
        {
            url: 'https://www.healthline.com/',
            selector: '.css-wqbhht',
        },
        {
            url: 'https://www.yahoo.com/lifestyle/tagged/health',
            selector: 'li.stream-item',
        },
    ],
    finance: [
        {
            url: 'https://www.investing.com/',
            selector: 'div[data-test="homepage-news-main-item-snippet"]',
        },
        {
            url: 'https://www.businessinsider.com/finance',
            selector: 'article.with-description',
        },
        {
            url: 'https://www.ft.com/',
            selector: '.primary-story__teaser',
        },
        {
            url: 'https://edition.cnn.com/business',
            selector: '.container__headline',
        },
        {
            url: 'https://www.ibtimes.com/economy-markets',
            selector: 'article',
        },
        {
            url: 'https://finance.yahoo.com',
            selector: '.titles',
        },
    ],
}

const deafualtImages = {
    finance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHxmaW5hbmNlfGVufDB8fHx8MTcyMDUxMzcyN3ww&ixlib=rb-4.0.3&q=80&w=1080',
    health: 'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHxoZWFsdGh8ZW58MHx8fHwxNzIwNTE0MTE1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    world: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMGNvbnRpbmVudHN8ZW58MHx8fHwxNzIwNTE0MDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    science: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjgwMjR8MHwxfHNlYXJjaHwxfHxlcXVhdGlvbnN8ZW58MHx8fHwxNzIwNTE0MjMxfDA&ixlib=rb-4.0.3&q=80&w=1080'
}

let getTitlecounter = 0;

export default async function scrape(req, res, ticker) {

    try {
        cron.schedule('*/5 * * * *', () => {
            console.log('starting finance job')
            // const randomNumber = getRandomNumber(0, urls.finance.length)
            // const data = urls.finance[randomNumber]
            // console.log('data', data)

            init('business');
        });

        init('business');
        // cron.schedule('0 9 */3 * *', () => {
        //     console.log('starting science job')
        //     const randomNumber = getRandomNumber(0, urls.science.length)
        //     const data = urls.finance[randomNumber]

        //     init(data.selector, data.url, 'science');
        // });
        // cron.schedule('0 8 */3 * *', () => {
        //     console.log('starting world job')

        //     const randomNumber = getRandomNumber(0, urls.world.length)
        //     const data = urls.finance[randomNumber]

        //     init(data.selector, data.url, 'world');
            
        // });
        // cron.schedule('0 13 */4 * *', () => {
        //     console.log('starting healths job')

        //     const randomNumber = getRandomNumber(0, urls.health.length)
        //     const data = urls.finance[randomNumber]

        //     init(data.selector, data.url, 'health');
        // });

        // await init(categorySelector, worldUrl, 'world')
        // await init(financeSelector, financeUrl, 'finance');
        // await init('.ui-story-headline', 'https://news.sky.com/technology', 'science');
        // await init('div[data-test="homepage-news-main-item-snippet"]', 'https://www.investing.com/', 'finance');
        // await init('article.with-description', 'https://www.businessinsider.com/finance', 'finance');...
        // await init('article.with-description', 'https://www.businessinsider.com/science', 'science');...
        // await init('article.with-description', 'https://www.businessinsider.com/health', 'health');..
        // await init('article.with-description', 'https://www.businessinsider.com/travel', 'world');..
        // await init('.primary-story__teaser', 'https://www.ft.com/', 'finance');...
        // await init('.o-teaser__content', 'https://www.ft.com/world', 'world');...
        // await init('.o-teaser__content', 'https://www.ft.com/technology', 'science');..
        // await init('.container__headline', 'https://edition.cnn.com/world', 'world');..
        // await init('.container__headline', 'https://edition.cnn.com/business', 'finance');
        // await init('.container__headline', 'https://edition.cnn.com/science', 'science');
        // await init('.container__headline', 'https://edition.cnn.com/health', 'health');
        // await init('article', 'https://www.ibtimes.com/world', 'world');....
        // await init('article', 'https://www.ibtimes.com/economy-markets', 'finance');
        // await init('article', 'https://www.ibtimes.com/technology', 'science');
        // await init('.module-text', 'https://www.webmd.com/', 'health');
        // await init('.css-wqbhht', 'https://www.healthline.com/', 'health');
        // await init(categorySelector, scienceUrl, 'science');
        // await init(categorySelector, helthUrl, 'health');

        return;
        // return {stockData, chartData};
    } catch (e) {
        console.log('ERROR HAS ACCURED', e)
    } finally {
        // await browser.close();
    }
}

async function init(category) {
    try {
        console.log('Starting...')
      
        const apiKey = process.env.AI_API_KEY;
        const title = await getNewsTitleFromApi();
        console.log(title)

        console.log('Title', title);
        if (title) {
            const messages = [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user", content: `Can you pretend you are a Yahoo reporter that is writing the content of the subject of the main title that is in Yahoo right now. this is the tiltle:
                ${title}. please ignore any white spaces, links html tags, or any other things that are not valid text.
                The content, title. and subtitle must be original, unique, SEO friendly and between 800-1000 words.  
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
                please make sure you dont use the title and subtitle you got, please make a new one. Could you return it as is, without the '''javascript decoration you add there.
                socialMediaSummary: summarize the article for social media post. This summary should be short and just give the jist of the article.
                ticker: If in the article you created a company that is trades in the NYES or NASDAQ, or in the us market, is mentioned. please set the stock ticker in this property. So for example
                if in the article Amazon was mentioned please set the ticker propery to AMZN since its their stock ticker. If you cant determine a stock ticker set the value to null` }
            ];
    
            const data = {
                model: "gpt-4o",  // Use gpt-3.5-turbo instead of gpt-4
                messages: messages,
                max_tokens: 2500,
                temperature: 0.7,
            };
    
            const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            })
            try {
                let article = response.data.choices[0].message.content.trim();
                if (article) {
                    const articleObj = JSON.parse(article)
                    articleObj.date = new Date().toDateString();
                    articleObj.timeStamp = Date.now();
                    articleObj.category = 'finance';
                    console.log('articleObj.keywordForImage', articleObj.keywordForImage)
                    const imgData = await getImgUrl(articleObj.keywordForImage, 'finance');
                    articleObj.imgUrl = imgData.imageUrl;
                    articleObj.imgUser = imgData.userName;
                    articleObj.imgUserProfile = imgData.userProfile;
                    article = JSON.stringify(articleObj)
                    // console.log(article);
        
                    const resultFromFireBase = await axios.post('https://ai-content-generation-7fd31-default-rtdb.firebaseio.com/generated-content.json', article);
                    console.log('resultFromFireBase', resultFromFireBase.data.name);
                    const firebaseId = resultFromFireBase.data.name;
                    const titleForUrl = encodeURIComponent(articleObj.title.split(' ').join('-'))
                    const articlePth = `https://new-content-ivory.vercel.app/${articleObj.category}/${titleForUrl}/${firebaseId}`;
                    console.log('articlePth', articlePth);
                    // const post = await social.post({
                    //     post: `${articleObj.socialMediaSummary} - read more here: ${articlePth}`,
                    //     platforms: ['pinterest', 'facebook', 'linkedin', 'twitter', 'reddit'],
                    //     mediaUrls: [articleObj.imgUrl],
                    //     title: articleObj.title,
                    //     subreddit: 'investingforbeginners'
                    //   }).catch(console.error);
                    //   console.log(post);
                        //  console.log(article);
                    
                    
                    return Promise.resolve(article);
                }
                return Promise.resolve(null);
    
    
            } catch (err) {
                console.log('***** SOMETHING WENT WRONG!!!!!******', err)
            }
        }



    } catch (err) {
        console.log('***** SOMETHING WENT WRONG in INIT!!!!!******', err)
    }

}

async function getNewsTitleFromApi() {
    const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.NEWS_API_KEY}`);
    const index = getRandomNumber(0, result.data.articles.length);
    console.log(result.data.articles[index].title)
    return result.data.articles[index].title;
}

async function getImgUrl(subtitle, category) {
    try {

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
    
        let imageUrl = imageResponse.response.results[0]?.urls?.regular;
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
    } catch(err) {
        console.log('FAILED TO FEtCH IMG URL', err, 'subtitle', subtitle, 'category', category)
    }
}

function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}