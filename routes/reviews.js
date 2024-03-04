const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviews')

//get All reviews -- no use since reviews are hotel specific (showByHotel)
router.get('/', reviewCtrl.index)
//get all reviews for specific hotel
router.get('/hotel/:id', reviewCtrl.showByHotel)
//get specific review
router.get('/:id', reviewCtrl.show)
//create a reviews
router.post('/', reviewCtrl.create)
//delete a review
router.delete('/:id', reviewCtrl.deleteReview)
//update a review
router.put('/:id', reviewCtrl.update)
module.exports = router
