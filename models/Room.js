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
    maxGuests: Number,
    images: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model('Room', RoomSchema)
