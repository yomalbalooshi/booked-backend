var express = require('express')
var router = express.Router()
// const hotelsCtrl = require('../controllers/hotels')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// CAN BE DELETED LATER
router.get('/example/:id/subs/:sub1/:sub2/data', function (req, res, next) {
  console.log(req.params)
  res.send('Testing 2')
})

//create a hotel review
// router.post('/hotels/:id/reviews', hotelsCtrl.createReview)
module.exports = router
