const Hotel = require('../models/Hotel')

const index = async (req, res) => {
  const hotels = await Hotel.find({}).populate('rooms')
  res.send(hotels)
}
const show = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id).populate('rooms')
  res.send(hotel)
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
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.send(await hotel.deleteOne())
  } catch (error) {
    res.send(`error in deleting hotel: ${error}`)
  }
}
const update = async (req, res) => {
  let hotelId = req.params.id
  const update = {
    name: req.body.name,
    description: req.body.description,
    locationLong: req.body.locationLong,
    locationLat: req.body.locationLat,
    city: req.body.city,
    country: req.body.country,
    image: req.body.image
  }
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      { $set: update },
      { new: true }
    )
    res.send(updatedHotel)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  deleteHotel,
  update
}