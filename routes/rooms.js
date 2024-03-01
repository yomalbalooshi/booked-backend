const express = require('express')
const router = express.Router()
const roomCtrl = require('../controllers/rooms')

//get All rooms
router.get('/', roomCtrl.index)
//get all rooms for specific hotel
router.get('/hotel/:id', roomCtrl.showByHotel)
//get specific room
router.get('/:id', roomCtrl.show)
//create a rooms
router.post('/', roomCtrl.create)
//delete a room
router.delete('/:id', roomCtrl.deleteRoom)
//update a room
router.put('/:id', roomCtrl.update)
module.exports = router
