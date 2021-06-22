const puppeteer = require('puppeteer');
const fs = require('fs');
const launchConfig = {
    headless: true,
    defaultViewport: { width: 1080, height: 1920 },
    ignoreHTTPSErrors: true,
    args: [
      `--window-size=${1080},${1920}`,
      `–disable-gpu`,
      `–disable-dev-shm-usage`,
      `–disable-setuid-sandbox`,
      `–no-first-run`,
      `–no-sandbox`,
      `–no-zygote`,
      `–single-process`
    ],
  };
puppeteer.launch(launchConfig).then(browser => {
    const wsEPAddress = browser.wsEndpoint();
    // const w_data = new Buffer(wsEPAddress);
    // console.log(w_data)
    fs.writeFile(__dirname + '/wsa.txt', wsEPAddress, {flag: 'w+'}, function (err) {
        if(err) {
            console.error(err);
        } else {
            console.log('写入成功');
        }
    });
});