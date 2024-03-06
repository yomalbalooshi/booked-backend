const express = require('express')
const router = express.Router()
const cityCtrl = require('../controllers/city')

//get All cities
router.get('/', cityCtrl.index)

//get specific city
router.get('/:id', cityCtrl.show)

//create a city
router.post('/', cityCtrl.create)
module.exports = router
