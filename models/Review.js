const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReviewSchema = new Schema(
  {
    feedback: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 5
    },
    creationDate: Date /* function () {
      return new Date().getFullYear()
    }, */,
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Review', ReviewSchema)
