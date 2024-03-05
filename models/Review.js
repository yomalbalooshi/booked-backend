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

    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    creationDate: { type: Date }
  },
  { timestamps: true }
)

ReviewSchema.virtual('customer', {
  ref: 'Customer',
  localField: 'customerId',
  foreignField: '_id'
})

ReviewSchema.set('toObject', { virtuals: true })
ReviewSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Review', ReviewSchema)
