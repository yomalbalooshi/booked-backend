const { Schema, model } = require('mongoose')

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
  },
  { timestamps: true }
)

module.exports = model('Customer', customerSchema)
