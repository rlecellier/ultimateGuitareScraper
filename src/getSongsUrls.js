const queryString = require('./utils/query-string');

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.ultimate-guitar.com/'
const SEARCH_URL = `${BASE_URL}search.php`
const cookies = 'euconsent-v2=CPWOOK-PWOOK-AKAnAENCHCsAP_AAH_AACiQIptd_X__bX9j-_5_f_t0e…1.1.1.4.2.1.12.1.1.3.1.2.2.3.1.2.1.1.1.2.1.1.2.1.1.1.1.2.1.3.1.5.1.2.4.3.8.2.2.9.7.2.2.1.2.1.4; '

const search = async (searchString) => {
  const queryParams = {
    search_type: 'title',
    value: searchString,
  }
  const url = `${SEARCH_URL}?${queryString.stringify(queryParams)}`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const html = await page.content()
  let $ = cheerio.load(html)
  $('h3', html).each(function () {
    console.log($(this).text());
  });

  let response = ''
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url)
    const html = await page.content()
    let $ = cheerio.load(html)
    response = $('a', html).each(function () {
      console.log($(this).text());
    });
    browser.close()
  } catch (err) {
    console.log('ERR', err)
    browser.close()
  }

  return {
    browser,
    page,
    $
  }
}

const res = search('Ma Liberté')
console.log('search results', res)