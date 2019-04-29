const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: false
    });
    const page = await browser.newPage();
    // Enable both JavaScript and CSS coverage
    await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
    ]);
    // Navigate to page
    await page.goto('http://127.0.0.1:8887/lesson-3-async-w-fetch/', {        
        timeout: 0,        
    });
    const inputElement = await page.$('input[name="search-keyword"]');
    await inputElement.type('cat');
    await inputElement.press('Enter');
    // Disable both JavaScript and CSS coverage 
    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage(),
    ]);
    let totalBytes = 0;
    let usedBytes = 0;
    const coverage = [...jsCoverage, ...cssCoverage];
    for (const entry of coverage) {
    totalBytes += entry.text.length;
    for (const range of entry.ranges)
        usedBytes += range.end - range.start - 1;
    }
    console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);

  //  browser.close();
})();