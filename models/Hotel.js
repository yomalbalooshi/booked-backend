const mongoose = require('mongoose')
const Schema = mongoose.Schema
const HotelSchema = new Schema(
  {
    name: String,
    description: String,
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    location: { type: Schema.Types.ObjectId, ref: 'City' },
    image: String,
    amenities: [
      {
        type: String
      }
    ],
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
  },
  { timestamps: true }
)
module.exports = mongoose.model('Hotel', HotelSchema)
