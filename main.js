const puppeteer = require('puppeteer')
const Rembrandt = require('rembrandt')

async function run () {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1366, height: 768 }
    })
    const page = await browser.newPage()

    let originalImage = ''

    await page.setRequestInterception(true)
    page.on('request', request => request.continue())

    page.on('response', async response => {
        if (response.request().resourceType() === 'image')
            originalImage = await response.buffer().catch(() => {})
    })

    await page.goto('https://accounts.binance.com/en/login');
   
     await page.type('input[name=email]', 'tst@g.com')
   
     await page.type('input[name=password]', '12345678')
   
     //click enterPassword
     try {
         await page.click("button[id='onetrust-accept-btn-handler']")
     } catch (error) {
         console.log(error)
     }
     await page.waitFor(3000)
   
     await page.click("button[id='click_login_submit']")
     
     await page.waitFor(3000)


    const sliderElement = await page.$('.verify-slider.css-13rz4tr')
    const slider = await sliderElement.boundingBox()

    const sliderHandle = await page.$('.css-p72bjc')
    const handle = await sliderHandle.boundingBox()

    let currentPosition = 0
    let bestSlider = {
        position: 0,
        difference: 100
    }

    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2)
    await page.mouse.down()

    while (currentPosition < slider.width - handle.width / 2) {

        await page.mouse.move(
            handle.x + currentPosition,
            handle.y + handle.height / 2 + Math.random() * 10 - 5
        )

        let sliderContainer = await page.$('.css-vurnku')
        
        // let hide= await page.$eval('.css-t0jkly',(el)=>{
        //     console.log(el);
        //     for (let i=0; i<el.length; i++){
        //         el[i].style.display = 'none'
        //     }
        // })

        // hide.style.display = 'none';

        let sliderImage = await sliderContainer.screenshot()

        const rembrandt = new Rembrandt({
            imageA: originalImage,
            imageB: sliderImage,
            thresholdType: Rembrandt.THRESHOLD_PERCENT
        })

        let result = await rembrandt.compare()
        let difference = result.percentageDifference * 100

        if (difference < bestSlider.difference) {
            bestSlider.difference = difference
            bestSlider.position = currentPosition
        }

        currentPosition += 5
        await page.screenshot({ path: 'test/'+currentPosition+'.png' });
    }

    await page.mouse.move(handle.x + bestSlider.position, handle.y + handle.height / 2, { steps: 10 })
    await page.screenshot({ path: 'test/example'+Date.now()+'.png' });
    await page.mouse.up()

    await page.waitFor(3000)

    // success!

   // await browser.close()
}

run()