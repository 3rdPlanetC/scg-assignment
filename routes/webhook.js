const express = require('express')
const router = express.Router()
const { lineNotification } = require('../controllers/DOSCG')

router.post('/', lineNotification)

module.exports = router