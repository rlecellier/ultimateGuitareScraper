const queryString = require('./utils/query-string');
const puppeteer = require('./utils/puppeteer');
const cheerio = require('./utils/cheerio');

const BASE_URL = 'https://www.ultimate-guitar.com'
const SEARCH_URL = `${BASE_URL}/search.php`

const search = async (searchArtist, searchSong) => {
  const artistSearchQueryParams = {
    search_type: 'band',
    value: searchArtist,
  }
  const artistSearchUrl = `${SEARCH_URL}?${queryString.stringify(artistSearchQueryParams)}`

  let html
  html = await puppeteer.get(artistSearchUrl)
  const artistUrl = cheerio.getArtistUrl(html, searchArtist)

  html = await puppeteer.get(artistUrl)
  const songUrl = cheerio.getSongUrl(html, searchSong)

  html = await puppeteer.get(songUrl)
  const songLyrics = cheerio.getSongLyrics(html)
  console.log('songLyrics', songLyrics)
}

search('Georges Moustaki', 'Ma Liberté')

module.exports = {
  search
}