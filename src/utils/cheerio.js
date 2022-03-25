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

const getParent = ($node, nbParents) => {
  let $searchNode = $node
  for (let i = 0; i < nbParents; i++) {
    $searchNode = $searchNode.parent()
  }
  return $searchNode
}

const getSongDetails = ($, $link) => {
  const $row = getParent($link, 5)
  let score, type
  $row.find('div').each((i, el) => {
    if (i) {
      if (!score && !isNaN($(el).text())) {
        score = $(el).text()
      } else {
        type = $(el).text()
      }
    }
  })
  return {
    'name': $link.text(),
    score,
    type
  }
}

const getSongUrl = (html, searchSong) => {
  const $ = cheerio.load(html)
  let songUrl = ''
  $('a').each((i, link) => {
    let bestScore
    if (nrmStr($(link).text()) === nrmStr(searchSong)) {
      const songDetails = getSongDetails($, $(link))
      if (
        songDetails.type === 'chords'
        && (
          !bestScore
          || bestScore < songDetails.score
        )
      ) {
        bestScore = songDetails.score
        songUrl = $(link).attr('href')
      }
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