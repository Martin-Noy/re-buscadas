const {Router} = require('express')
const {getOfertas} = require('../controller/ofertas.controller');
const router = Router()

router.get('/',getOfertas)

module.exports = router