const express = require('express')
const router = express.Router()
const { lineNotification } = require('../controllers/DOSCG')

router.post('/webhook', lineNotification)

module.exports = router