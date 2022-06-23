const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', async (request, response) => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto('https://pt.wikipedia.org/wiki/Software_como_servi%C3%A7o');
  
    const subititleList = await page.evaluate(() => {

        const subtitle = document.querySelectorAll('.mw-parser-output h2')
        const subtitleArray = [...subtitle]

        const subititleList = subtitleArray.map( ({innerText}) => ({
            innerText
        }))

        console.log(subititleList)

        return subititleList
            
    })

    response.send({
        subititleList
    })
})

const port = 3003

app.listen(port, () => {
    console.log(`
        Servidor online, se uma nova aba não abrir
        acesse em http://localhost:${port}
    `)
})
