const puppeteer = require('puppeteer');
require('dotenv').config();

const scrape = async (req, res, ticker) => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process', '--no-zygote'],
        executablePath: process.env.NODE_ENV === 'production' 
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(), 
    });

    try {
        const page = await browser.newPage();

        // Navigate the page to a URL
        await page.goto(`https://www.ynet.co.il`);
        const textSelector = await page.waitForSelector('.textDiv');
        const title = await textSelector?.evaluate(el => el.textContent);


    return title;
    // return {stockData, chartData};
    } catch (e) {
        console.log('ERROR HAS ACCURED', e)
    } finally {
        await browser.close();
    }
}


module.exports = {
    scrape
};