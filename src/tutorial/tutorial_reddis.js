// https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com';

puppeteer
  .launch()
  .then(function (browser) {
    return browser.newPage();
  })
  .then(function (page) {
    return page.goto(url).then(function () {
      return page.content();
    });
  })
  .then(function (html) {
    console.log(html);
  })
  .catch(function (err) {
    //handle error
  });