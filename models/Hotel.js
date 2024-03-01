const mongoose = require('mongoose')
const Schema = mongoose.Schema
const HotelSchema = new Schema(
  {
    name: String,
    description: String,
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    locationLong: String,
    locationLat: String,
    city: String,
    country: String,
    image: String,
    amenities: [
      {
        type: String
      }
    ],
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  },
  { timestamps: true }
)
module.exports = mongoose.model('Hotel', HotelSchema)