const express = require('express')
const router = express.Router()
const { GoogleMapDirection } = require('../controllers/GoogleMapDirectionController')

router.get('/', GoogleMapDirection)

module.exports = router