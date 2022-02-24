const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://accounts.binance.com/en/login');

 await page.screenshot({ path: 'example.png' });

  //accept cookies  id="onetrust-accept-btn-handler"

  await page.type('input[name=email]', 'tst@g.com')

  await page.type('input[name=password]', '12345678')

  //click enterPassword
  // try {
  //     await page.click("button[id='onetrust-accept-btn-handler']")
  // } catch (error) {
  //     console.log(error)
  // }
  await page.waitFor(3000)

  await page.click("button[id='click_login_submit']")
  
  await page.waitFor(3000)

  //let hide= await page.$('.css-t0jkly')
  //hide.evaluate((el) => el.style.display === 'none');
//   let textContent =  await page.$('.css-t0jkly').evaluate
// await textContent.evaluate((el) => el.style.fontSize = 150 + 'px'); 

 //await page.evaluate(() => { document.querySelector('.css-t0jkly').children[0].style.display = 'node'; });
 await page.evaluate(() => { document.querySelector('.css-t0jkly').firstChild });

  //_id="slth" 

  console.log('done');

  //await page.click('[data-test-foo4="true"]');

  //await browser.close();
})();
