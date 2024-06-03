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
        // await page.goto(`https://finance.yahoo.com/quote/${ticker}/cash-flow`);
        // const cashFlows = await getDataFromTable('Free Cash Flow', page);

        await page.goto(`https://finance.yahoo.com/quote/${ticker}/financials`);
    const netIncomes = await getDataFromTable('Net Income', page);
    const revenues = await getDataFromTable('Total Revenue', page);
    const res = {revenues, netIncomes};
    // const intrestExpenses = await getDataFromTable('Interest Expense', page);
    // const intrestExpense = intrestExpenses[1];
    // console.log('Interest Expense', intrestExpense);
    // stockData.intrestExpense = intrestExpense;
    // const taxExpenses = await getDataFromTable('Tax Provision', page);
    // const taxExpense = taxExpenses[1];
    // console.log('taxRates', taxExpense);
    // stockData.taxExpense = taxExpense;
    // const incomeBeforeTaxs = await getDataFromTable('Pretax Income', page);
    // const incomeBeforeTax = incomeBeforeTaxs[1];
    // console.log('incomeBeforeTax', incomeBeforeTax);
    // stockData.incomeBeforeTax = incomeBeforeTax;
    // const years = await getYearsFromTableHead(page);
    // const selectedYears = years.slice(0, 4);
    // console.log('Years', years);
    // console.log('Selected Years', selectedYears);
    // stockData.selectedYears = selectedYears;

    // await page.goto(`https://finance.yahoo.com/quote/${ticker}/balance-sheet`);
    // const assets = await getDataFromTable('Total Assets', page);
    // console.log('Total Assets ' + ticker, assets);
    // stockData.assets = assets;
    // const debts = await getDataFromTable('Total Debt', page);
    // console.log('debts' + ticker, debts)
    // const debt = debts[1];
    // console.log('Total Debt ' + ticker, debt);
    // stockData.debt = debt;


    // await page.goto(`https://finance.yahoo.com/quote/${ticker}`);
    // const beta = await getDataType(page, DATA_FIELD.Beta);
    // stockData.beta = beta;
    // const dividend = await getDataType(page, DATA_FIELD.Dividend);
    // stockData.dividend = dividend;
    // const eps = await getDataType(page, DATA_FIELD.Eps);
    // stockData.eps = eps;
    // const pe = await getDataType(page, DATA_FIELD.Pe);
    // stockData.peRatio = pe;
    // const marketCap = await getDataType(page, DATA_FIELD.MarketCap);
    // stockData.marketCap = marketCap;
    // const marketPrice = await getMarketPrice(page);
    // stockData.price = marketPrice;
    // let numeralMarketCap = +marketCap.replace(/[^0-9.-]+/g, "");
    // numeralMarketCap = convertStringToNumber(marketCap);

    // console.log('Beta', beta);
    // console.log('dividend', dividend);
    // console.log('eps', eps);
    // console.log('pe', pe);
    // console.log('marketCap', marketCap);
    // console.log('numeralMarketCap', numeralMarketCap);
    // console.log('marketPrice', marketPrice);

    // // await page.goto(`https://finance.yahoo.com/bonds`);
    // // const riskFreeRate = await getRiskFreeRate(page);
    // const riskFreeRate = 0.044;
    
    // console.log('riskFreeRate', riskFreeRate);
    // stockData.riskFreeRate = riskFreeRate;


    // await page.goto(`https://finance.yahoo.com/quote/${ticker}/key-statistics`);
    // const sharesOutstanding = await getSharesOutstanding(page);
    // console.log('SHARESSSSOUTSTANDING', sharesOutstanding);
    // stockData.sharesOutstanding = sharesOutstanding;

    // revenues.reverse().pop();
    // netIncomes.reverse().pop();
    // cashFlows.reverse().pop();
    // selectedYears.reverse();

    // console.log('revenues', revenues)
    // console.log('netIncomes', netIncomes)
    // console.log('cashFlows', cashFlows)
    // stockData.revenues = revenues;
    // stockData.netIncomes = netIncomes;
    // stockData.cashFlows = cashFlows;

    // const yearsAsNumbers = selectedYears.map((year) => +year.split('/')[2]);

    // console.log('Revenues', revenues)
    // console.log('yearsAsNumbers', yearsAsNumbers)
    

    // const growthRate = utilsService.calcGrowthAvg(revenues);
    // console.log('Growth Rate', growthRate);
    // stockData.growth = (growthRate *100).toFixed(2);

    // const revenuesByYear = revenues.map((revenue, i) => {
    //     return {
    //         revenue,
    //         year: yearsAsNumbers[i]
    //     }
    // });

    // console.log('revenuesByYear', revenuesByYear)

    // const lastRevenueByYear = revenuesByYear[revenuesByYear.length - 1]


    // const projectedRevs = projectGrowthByYear(lastRevenueByYear, growthRate);

    // const hasNegativeCashFlow = cashFlows.some(cashFlow => cashFlow < 0);
    // const hasNegativeNetIncome = netIncomes.some(netIncome => netIncome < 0);



    // // get cfs margins --> CF / N.Income = CFCMargin
    // const cfcMargins = cashFlows.map((cashFlow, idx) => +Math.min(cashFlow / netIncomes[idx]).toFixed(3));
    // console.log('cfcMargins', cfcMargins);
    // // get the lowest CFCMargin
    // const minCFCMargin = +Math.min(...cfcMargins).toFixed(3);
    // console.log('minCFCMargin', minCFCMargin);
    // stockData.minCFCMargin = minCFCMargin;
    // // get net incomes margins --> netincome / reveune = net income margin
    // const netIncomeMargins = netIncomes.map((netIncome, idx) => revenues[idx] ? +Math.min(netIncome / revenues[idx]).toFixed(3) : 0)
    // console.log('netIncomeMargins', netIncomeMargins);
    // // get the lowest netincome margin
    // const minNetIncomeMargin = +Math.min(...netIncomeMargins).toFixed(3);
    // console.log('minNetIncomeMargin', minNetIncomeMargin);
    // stockData.minNetIncomeMargin = minNetIncomeMargin;

    // projectedRevs.forEach((rev) => {
    //     rev.netIncome = Math.floor(rev.revenue * minNetIncomeMargin);
    //     rev.cashFlow = Math.floor(rev.netIncome * minCFCMargin);
    // });

    // let wacc = getWacc(intrestExpense, taxExpense, incomeBeforeTax, debt, +beta, marketReturn, riskFreeRate, numeralMarketCap);
    // console.log('WACC', wacc);
    // if (wacc < 0.05) {
    //     wacc = 0.09;
    // }
    // wacc = wacc || 0.1;
    // stockData.wacc = wacc;
    // console.log('Serialized Wacc', wacc);
    // const terminalValue = utilsService.getTermianlValue(0.02, projectedRevs, wacc);
    // projectedRevs.push({ cashFlow: terminalValue });
    // const disCashFlows = utilsService.getDiscountedCashFlows(projectedRevs, wacc);
    // console.log('projectedRevs@@@@', projectedRevs);
    // stockData.projectedRevs = projectedRevs;
    // console.log('disCashFlows', disCashFlows);
    // stockData.disCashFlows = disCashFlows;
    // const disCashFlowsSum = disCashFlows.reduce((acc, cf) => acc + cf.disCF, 0);
    // console.log('disCashFlowsSum', disCashFlowsSum);
    // console.log('sharesOutstanding', sharesOutstanding);
    // const fairValue = (disCashFlowsSum / sharesOutstanding).toFixed(2);  
    // console.log('FAIRRRRR VALLUUESS', fairValue);
    // stockData.symbol = ticker; 
    // stockData.fairValue = fairValue;

    // stockData.overValue =(+marketPrice > +fairValue) ? 'Overvalued' : (( (-1) + (+fairValue /  +marketPrice)) *100).toFixed(2);

    // const chartData = {
    //     netIncomes: {},
    //     revenues: {},
    //     assets: {},
    //     cashFlows: {}

    // };

    // chartData.netIncomes.data = netIncomes
    // chartData.netIncomes.years = yearsAsNumbers
    // chartData.revenues.data = revenues
    // chartData.revenues.years = yearsAsNumbers
    // chartData.assets.data = assets
    // chartData.assets.years = yearsAsNumbers
    // chartData.cashFlows.data = cashFlows
    // chartData.cashFlows.years = yearsAsNumbers

    // if (hasNegativeCashFlow || hasNegativeNetIncome) {
    //     console.log('THIS COMPANY HAVE NEGETEVISE CASHFLOWS/NETINCOMES')
    //     stockData.hasNegative = true;
    //     stockData.fairValue = 0;
    // }
    // calcService.upateDbWithNewStockData(stockData);

    res.send(res);
    // return {stockData, chartData};
    } catch (e) {
        console.log('ERROR HAS ACCURED', e)
    } finally {
        await browser.close();
    }
}

async function getMarketPrice(page) {
    const element = await page.waitForSelector('.livePrice');
    const marketParice = await element?.evaluate((el) => {
        return parseFloat((el.textContent).replace(/[^0-9.-]+/g, ""))
    })
    return marketParice;
}

async function getSharesOutstanding(page) {
    return page.evaluate(() => {
        const arr = Array.from(document.querySelectorAll('section table tr.row'))
        const firstEl = arr.filter(el => el.textContent?.includes('Shares Outstanding'))[0];
            const exp = firstEl?.textContent?.match(/[0-9]+\.[0-9]\S+/);
            console.log('exp', exp)

        const numberPart = parseFloat(exp[0]);
        const multiplier = exp[0]?.slice(-1);
        let multiplierValue = 1;
        
        if (multiplier === 'B') {
            multiplierValue = 1e9;
        } else if (multiplier === 'M') {
            multiplierValue = 1e6;
        } else if (multiplier === 'T') {
            multiplierValue = 1e12;
        }
        
        return (numberPart * multiplierValue) / 1000;
    })

} 

function convertStringToNumber(stringValue) {
    const numberPart = parseFloat(stringValue);
    const multiplier = stringValue.slice(-1);
    let multiplierValue = 1;
    
    if (multiplier === 'B') {
        multiplierValue = 1e9;
    } else if (multiplier === 'M') {
        multiplierValue = 1e6;
    } else if (multiplier === 'T') {
        multiplierValue = 1e12;
    }
    
    return (numberPart * multiplierValue) / 1000;
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