const express = require('express')
const router = express.Router()
const sendMailCtrl = require('../controllers/sendMail')
//create a hotel
router.post('/send', sendMailCtrl.create)
module.exports = router
