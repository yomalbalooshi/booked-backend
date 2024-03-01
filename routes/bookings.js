const express = require('express')
const router = express.Router()
const bookingCtrl = require('../controllers/bookings')

//get All bookings
router.get('/', bookingCtrl.index)
//get all bookings for specific customer
router.get('/customer/:id', bookingCtrl.showByCustomer)
//get all bookings for specific hotel
router.get('/hotel/:id', bookingCtrl.showByHotel)
//get specific booking
router.get('/:id', bookingCtrl.show)
//create a booking
router.post('/', bookingCtrl.create)
//delete a booking
router.delete('/:id', bookingCtrl.deleteBooking)
//update a booking
router.put('/:id', bookingCtrl.update)
module.exports = router
