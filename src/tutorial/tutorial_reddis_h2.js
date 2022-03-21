// https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = 'https://www.reddit.com';

let browser

const tutorial = async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    console.log('goto page')
    await page.goto(url)
    // await page.waitForNavigation({ waitUntil: 'networkidle0' })
    const html = await page.content()
    // console.log('html', html)
    let $ = cheerio.load(html)
    $('h3', html).each(function () {
      console.log($(this).text());
    });
    // console.log('cheerio', $('h2'))
    browser.close()
  } catch (err) {
    console.log('ERR', err)
    browser.close()
  }
}

tutorial()