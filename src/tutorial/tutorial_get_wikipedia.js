// https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
const rp = require('request-promise');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then(function (html) {
    //success!
    console.log(html);
  })
  .catch(function (err) {
    //handle error
  });