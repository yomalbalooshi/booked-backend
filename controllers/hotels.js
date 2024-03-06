const Hotel = require('../models/Hotel')
const Company = require('../models/Company')
const Review = require('../models/Review')
const reviewCtrl = require('../controllers/reviews')
const Booking = require('../models/Booking')
const Room = require('../models/Room')

const index = async (req, res) => {
  const hotels = await Hotel.find({})
    .populate('rooms')
    .populate('location')
    .populate('bookings')
  res.send(hotels)
}
const show = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id)
    .populate('rooms')
    .populate('location')
    .populate('bookings')
    .populate({
      path: 'reviews',
      populate: {
        path: 'customer',
        model: 'Customer'
      }
    })
    .exec()
  // console.log('showing hotel :', hotel)
  // hotel.populate('reviews')
  res.send(hotel)
  //might need to populate/add more details later
}
const showCompanyHotels = async (req, res) => {
  const hotel = await Hotel.find({ companyId: req.params.id })
    .populate('rooms')
    .populate('location')
    .populate({ path: 'bookings', populate: { path: 'customerId' } })
  console.log(hotel)
  res.send(hotel)
}
const deleteNone = async (req, res) => {
  const bookings = await Booking.find().populate('customerId')
  const emptyBooking = bookings.filter((booking) => booking.customerId === null)
  console.log(emptyBooking)
  res.send('OK')
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const hotel = await Hotel.create(req.body)
    const company = await Company.findById(req.body.companyId)
    company.hotels.push(hotel._id)
    await company.save()
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
    amenities: req.body.amenities
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

const createReview = async (req, res) => {
  // console.log('Creating hotel review..')
  try {
    const reviewBody = {
      feedback: req.body.feedback,
      customerId: req.body.customerId,
      rating: req.body.rating
    }
    // await review.save()
    const review = await reviewCtrl.createReview(reviewBody)
    // console.log('hotel review created  , new review now ==> ', review)
    const hotel = await Hotel.findById(req.params.id).populate('reviews')
    hotel.reviews.push(review._id)
    await hotel.save()
    // console.log('hotel review created  , hotel is now ==> ', hotel)
    res.send(hotel)
  } catch (err) {
    res.send(`error in creating review: ${err}`)
  }
  // res.send('creating a review for hotel')
}

const deleteReview = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const review = await Review.findById(req.params.reviewId)

    hotel.reviews = hotel.reviews.filter(
      (reviewId) => review._id !== req.params.reviewId
    )
    await hotel.save()

    // reviewCtrl.createReview(reviewBody)
    console.log(
      'Deleting reviw: ',
      review.feedback,
      ' from hotel :',
      hotel.name
    )
    res.send(await review.deleteOne())
    // res.send(await hotel.deleteOne())
  } catch (error) {
    res.send(`error in deleting hotel: ${error}`)
  }
}

module.exports = {
  index,
  showCompanyHotels,
  show,
  create,
  deleteHotel,
  update,
  createReview,
  deleteReview,
  deleteNone
}
