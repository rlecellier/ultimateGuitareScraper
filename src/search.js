const queryString = require('./utils/query-string');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.ultimate-guitar.com'
const SEARCH_URL = `${BASE_URL}/search.php`
const cookies = 'euconsent-v2=CPWOOK-PWOOK-AKAnAENCHCsAP_AAH_AACiQIptd_X__bX9j-_5_f_t0e…1.1.1.4.2.1.12.1.1.3.1.2.2.3.1.2.1.1.1.2.1.1.2.1.1.1.1.2.1.3.1.5.1.2.4.3.8.2.2.9.7.2.2.1.2.1.4; '

const nrmStr = (str) => str.trim().toLowerCase()

const search = async (type, searchArtist, searchSong) => {
  const queryParams = {
    search_type: type,
    value: searchArtist,
  }
  const url = `${SEARCH_URL}?${queryString.stringify(queryParams)}`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  let response = {
    page,
  }
  await page.goto(url)
  // const html = await page.content()
  // let $ = cheerio.load(html)
  // $('h3', html).each(function () {
  //   console.log($(this).text());
  // });

  await page.goto(url)

  return response
}



const searchArtist = async (searchArtist, searchSong) => {
  const { page } = await search('band', searchArtist)
  let $ = cheerio.load(await page.content())

  let artistlLink = []
  $('a').each((i, link) => {
    if (nrmStr($(link).text()) === nrmStr(searchArtist)) {
      artistlLink = [$(link).text(), $(link).attr('href')]
    }
  })
  console.log('artistlLink', artistlLink)
  // console.log('artistlLink:href', artistlLink.attr('href'))
  //   if ($(this).text() === searchString) {
  //     return $(this).attr('href')
  //   }
  // })
  const [_artistName, artistUri] = artistlLink
  const artistURL = `${BASE_URL}${artistUri}`

  // console.log('artistURL', artistURL)

  await page.goto(artistURL)
  $ = cheerio.load(await page.content())

  let songLink = []
  $('a').each((i, link) => {
    if (nrmStr($(link).text()) === nrmStr(searchSong)) {
      songLink = [$(link).text().trim(), $(link).attr('href')]
    }
  })
  console.log('songLink', songLink)

  const [_songName, songUrl] = songLink
  console.log('songUrl', songUrl)
  await page.goto(songUrl)
  const songPageHtml = await page.content()
  // console.log('songPageHtml', songPageHtml)
  $ = cheerio.load(songPageHtml)
  $('code pre').each((i, found) => {
    console.log('found for iteration', i, $(found).text())
  })
  // const html = await page.content()
  // $ = cheerio.load(html)
  // $('a').each(function () {
  //   $(this).text()
  // })
}

searchArtist('Georges Moustaki', 'Ma Liberté')

module.exports = {
  search
}