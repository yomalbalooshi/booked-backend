const Room = require('../models/Room')
const Hotel = require('../models/Hotel')

const index = async (req, res) => {
  const rooms = await Room.find({})
  res.send(rooms)
}

const show = async (req, res) => {
  const room = await Room.findById(req.params.id)
  res.send(room)
}

const showByHotel = async (req, res) => {
  const room = await Room.find({ hotelId: req.params.id })
  res.send(room)
}
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    res.send(await room.deleteOne())
  } catch (error) {
    res.send(`error in deleting room: ${error}`)
  }
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const room = await Room.create(req.body)
    const hotel = await Hotel.findById(req.body.hotelId)
    hotel.rooms.push(room._id)
    await hotel.save()
    res.send(room)
  } catch (err) {
    res.send(`error in creating room: ${err}`)
  }
}

const update = async (req, res) => {
  let roomId = req.params.id
  const update = {
    roomType: req.body.roomType,
    price: req.body.price,
    amenities: req.body.amenities,
    maxAdults: req.body.maxAdults,
    maxChildren: req.body.maxChildren
    // images: req.body.images
  }
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { _id: roomId },
      { $set: update },
      { new: true }
    )
    res.send(updatedRoom)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  showByHotel,
  deleteRoom,
  update
}
