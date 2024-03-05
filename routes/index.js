var express = require('express')
var router = express.Router()
const hotelsCtrl = require('../controllers/hotels')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

//create a hotel review
// router.post('/hotels/:id/reviews', hotelsCtrl.createReview)
router.get('/test/:id', hotelsCtrl.show)
module.exports = router
