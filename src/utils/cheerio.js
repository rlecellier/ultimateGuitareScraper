const cheerio = require('cheerio');

const BASE_URL = 'https://www.ultimate-guitar.com'

const nrmStr = (str) => str.trim().toLowerCase()

const getArtistUrl = (html, searchArtist) => {
  const $ = cheerio.load(html)
  let artistUri = []
  $('a').each((i, link) => {
    if (nrmStr($(link).text()) === nrmStr(searchArtist)) {
      artistUri = $(link).attr('href')
    }
  })
  return `${BASE_URL}${artistUri}`
}

const getSongUrl = (html, searchSong) => {
  const $ = cheerio.load(html)
  let songUrl = ''
  $('a').each((i, link) => {
    if (nrmStr($(link).text()) === nrmStr(searchSong)) {
      songUrl = $(link).attr('href')
    }
  })
  return songUrl
}

const getSongLyrics = (html) => {
  const $ = cheerio.load(html)
  let songLyrics = []
  $('code pre').each((i, lyricsNode) => {
    songLyrics = $(lyricsNode).text()
  })
  return songLyrics
}

module.exports = {
  getArtistUrl,
  getSongUrl,
  getSongLyrics,
}