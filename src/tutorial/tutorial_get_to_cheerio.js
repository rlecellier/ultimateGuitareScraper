// https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
    .then(function (html) {
        //success!
        let $ = cheerio.load(html);
        console.log($('big > a', html).length);
        console.log($('big > a', html));
    })
    .catch(function (err) {
        console.log('err', err)
        //handle error
    });