const Hotel = require('../models/Hotel')

const index = async (req, res) => {
  const hotels = await Hotel.find({})
  res.send(hotels)
}
const show = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id)
  return hotel
  //might need to populate/add more details later
}
const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const hotel = await Hotel.create(req.body)
    res.send(hotel)
  } catch (err) {
    res.send(`error in creating hotel: ${err}`)
  }
}
module.exports = {
  index,
  show,
  create
}
