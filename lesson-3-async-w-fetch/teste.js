const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8887/lesson-3-async-w-fetch/');
  const inputElement = await page.$('input[name="search-keyword"]');
  await inputElement.type('dog');
  await inputElement.press('Enter');


  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);

 // await browser.close();
})();