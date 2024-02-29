const express = require('express')
const router = express.Router()
const hotelsCtrl = require('../controllers/hotels')

//get All Hotels
router.get('/', hotelsCtrl.index)
//get specific hotel
router.get('/:id', hotelsCtrl.show)
//create a hotel
router.post('/', hotelsCtrl.create)
module.exports = router
