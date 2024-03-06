const Review = require('../models/Review')
const Hotel = require('../models/Hotel')

// No use (see routes/reviews)
const index = async (req, res) => {
  const reviews = await Review.find({})
  res.send(reviews)
}

const show = async (req, res) => {
  const review = await Review.findById(req.params.id)
  res.send(review)
}

const showByHotel = async (req, res) => {
  const review = await Review.find({ hotelId: req.params.id })
  res.send(review)
}
const deleteReview = async (req, res) => {
  try {
    console.log(req.body)
    const review = await Review.findById(req.params.id)

    const hotel = await Hotel.findById(req.body.hotelId)

    hotel.reviews = hotel.reviews.filter(
      (review) => review._id.toString() !== req.params.id
    )
    await hotel.save()

    res.send(await review.deleteOne())
  } catch (error) {
    res.send(`error in deleting review: ${error}`)
  }
}

const createReview = async (reviewBody) => {
  try {
    const review = await Review.create(reviewBody)
    await review.save()
    return review
  } catch (err) {
    throw err
  }
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const review = await Review.create(req.body)
    res.send(review)
  } catch (err) {
    res.send(`error in creating review: ${err}`)
  }
}

const update = async (req, res) => {
  console.log('Updating...')
  let reviewId = req.params.id
  const update = {
    customerId: req.body.customerId,
    feedback: req.body.feedback,
    rating: req.body.rating
  }
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { $set: update },
      { new: true }
    )
    res.send(updatedReview)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  createReview,
  showByHotel,
  deleteReview,
  update
}
