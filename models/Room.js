const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RoomSchema = new Schema(
  {
    roomType: String,
    price: { type: Number, require: true },
    amenities: [
      {
        type: String
      }
    ],
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    maxAdults: Number,
    maxChildren: Number,
    images: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model('Room', RoomSchema)
