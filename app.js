require('dotenv').config()
const cheerio = require('cheerio')
const axios = require('axios')
const express = require('express')
const e = require('express')


const app = express()
const PORT = process.env.PORT


app.get('/getOfertas', async (req, res) => {
    try{
        const respuesta = []
        const crypto = await getOfertas();
        console.log(crypto)
        
        return res.status(200).json(crypto);
    }catch (err){
        return res.status(500).json({
            err: err.toString(),
        })
    }
})

async function getOfertas(){
    const URL = 'https://quotes.toscrape.com/'
    let result = [];
    await axios(URL).then((response)=>{
        const html_data = response.data
        const $ = cheerio.load(html_data)
        $('.quote').each(
            (i,element) => {
                console.log('elemento === '+element)
                result.push({
                    "texto":$(element).find('span.text').text(),
                    "autor":$(element).find('span').find('.author').text(),
                })
            })

    })
    return result
}


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
