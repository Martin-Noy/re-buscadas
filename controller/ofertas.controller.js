const {request ,response} = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const getOfertas = async (req = request, res = response) =>{
    try{
        const respuesta = []
        console.log(req.query.color1);
        console.log(req)
        const crypto = await getQuotes();
        return res.status(200).json(crypto);
    }catch (err){
        return res.status(500).json({
            err: err.toString(),
        })
    }
}
async function getQuotes(){
    const URL = 'https://quotes.toscrape.com/'
    let result = [];
    await axios(URL).then((response)=>{
        const html_data = response.data
        const $ = cheerio.load(html_data)
        $('.quote').each(
            (i,element) => {
                result.push({
                    "texto":$(element).find('span.text').text(),
                    "autor":$(element).find('span').find('.author').text(),
                })
            })

    })
    return result
}

module.exports = {getOfertas}