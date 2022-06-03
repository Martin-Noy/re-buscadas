const express = require("express");
const cors = require("cors")
class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.getOfertas = '/api/ofertas';
        
        this.middlewares()
 
        this.routs()
    }
    middlewares(){
        this.app.use(cors())
    }
    routs(){
        this.app.use(this.getOfertas, require('../routes/ofertas'))
    }
    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Example app listening on port ${this.port}!`)
        })
    }
}

module.exports = Server