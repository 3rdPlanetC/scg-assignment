const express = require('express')
const router = express.Router()
const controller = require('../controllers/DOSCG')

router.post('/webhook', controller.lineNotification)

module.exports = router