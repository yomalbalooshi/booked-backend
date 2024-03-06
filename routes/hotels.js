const express = require('express')
const router = express.Router()
const hotelsCtrl = require('../controllers/hotels')

//get All Hotels
router.get('/', hotelsCtrl.index)

//get specific company hotels
router.get('/companyprofile/:id', hotelsCtrl.showCompanyHotels)
//get specific hotel
router.get('/:id', hotelsCtrl.show)
//create a hotel review
router.post('/:id/reviews', hotelsCtrl.createReview)
//deleate a hotel review
router.delete('/:id/reviews/:reviewId', hotelsCtrl.deleteReview)
//create a hotel
router.post('/', hotelsCtrl.create)
router.delete('/deletenone', hotelsCtrl.deleteNone)
router.delete('/:id', hotelsCtrl.deleteHotel)
router.put('/:id', hotelsCtrl.update)

module.exports = router
