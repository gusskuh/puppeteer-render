const puppeteer = require('puppeteer');
require('dotenv').config();

const scrape = async (req, res) => {
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
        await page.goto(`https://finance.yahoo.com/quote/META/cash-flow`);
        const cashFlows = await getDataFromTable('Free Cash Flow', page);

        // Print the full title
        console.log('The title of this blog post is "%s".', cashFlows);
        res.send('The title of this blog post is "%s".' + cashFlows)

    } catch (error) {
        console.log(error)
        res.send('An error occurred ' + error)
    } finally {
        await browser.close();
    }
}

async function getDataFromTable(dataType, page) {
    const arr = [];

    const tableBody = await page.waitForSelector('.tableBody');
    const elementText = await tableBody?.evaluate((el, dataType) => {
        console.log('EL', el)
        let element;
        el.childNodes.forEach((el) => {
            if (el?.textContent?.includes(dataType)) {
                element = el;
                return;
            }
        })
        return (element) ? element?.textContent : 0;
    }, dataType);

    if (!elementText) {
        return [0];
    }

    elementText.split(' ').forEach((el) => {
        const regexRes = el.match(/[0-9]+\,[^\s-]/);
        if (regexRes) {
            arr.push((+regexRes.input.trim().split(',').join('')))
        }
    })
    return arr;
}

module.exports = {
    scrape
};