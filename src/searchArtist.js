const search = require('./search')
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const searchArtist = async (searchString) => {
  page = search.search('band', searchString)
  $ = cheerio.load(await page.content())
  $('a').each(function () {
    if ($(this).text() === searchString) {
      this.click()
    }
  });
  const html = await page.content()
  let $ = cheerio.load(html)
  $('a').each(function () {
    $(this).text()
  })
}

searchArtist('Georges Moustaki')