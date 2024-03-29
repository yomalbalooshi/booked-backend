const Booking = require('../models/Booking')
const Customer = require('../models/Customer')
const Hotel = require('../models/Hotel')

const index = async (req, res) => {
  const bookings = await Booking.find({})
  res.send(bookings)
}

const show = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('roomType')
  res.send(booking)
  //might need to populate/add more details later
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied

  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const booking = await Booking.create(req.body)
    const customer = await Customer.findById(req.body.customerId)
    const hotel = await Hotel.findById(booking.hotelId)

    customer.bookings.push(booking._id)
    hotel.bookings.push(booking._id)
    await customer.save()
    await hotel.save()

    res.send(booking)
  } catch (err) {
    res.send(`error in creating hotel: ${err}`)
  }
}
const showByCustomer = async (req, res) => {
  const booking = await Booking.find({ customerId: req.params.id })
    .populate('hotelId')
    .populate('roomType')

  res.send(booking)
  //might need to populate/add more details later
}
const showByHotel = async (req, res) => {
  const booking = await Booking.find({ hotelId: req.params.id })
  res.send(booking)
  //might need to populate/add more details later
}
const deleteBooking = async (req, res) => {
  console.log(req.body)
  try {
    const booking = await Booking.findById(req.params.id)
    const hotel = await Hotel.findById(booking.hotelId)

    const customer = await Customer.findById(req.body.userId)

    customer.bookings = customer.bookings.filter(
      (booking) => booking._id.toString() !== req.params.id
    )
    await customer.save()

    hotel.bookings = hotel.bookings.filter(
      (booking) => booking._id.toString() !== req.params.id
    )
    await hotel.save()
    console.log('hotel', hotel)
    res.send(await booking.deleteOne())
  } catch (error) {
    res.send(`error in deleting booking: ${error}`)
  }
}

const update = async (req, res) => {
  let bookingId = req.params.id
  const update = {
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    noOfRooms: req.body.noOfRooms,
    adults: req.body.adults,
    children: req.body.children,
    specialRequest: req.body.specialRequest,
    lateCheckout: req.body.lateCheckout,
    earlyCheckIn: req.body.earlyCheckIn,
    totalCost: req.body.totalCost,
    extraBed: req.body.extraBed
  }
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId },
      { $set: update },
      { new: true }
    )
    res.send(updatedBooking)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  showByCustomer,
  showByHotel,
  deleteBooking,
  update
}
