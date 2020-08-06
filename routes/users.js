const express = require('express')
const router = express.Router()
const { googleMap } = require('../controllers/GoogleMapDirection')

router.get('/', googleMap)

module.exports = router