const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookingSchema = new Schema(
  {
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    roomType: { type: Schema.Types.ObjectId, ref: 'Room' },
    checkIn: Date,
    checkOut: Date,
    noOfRooms: Number,
    adults: Number,
    children: Number,
    specialRequest: String,
    lateCheckout: { type: Boolean, default: false },
    earlyCheckIn: { type: Boolean, default: false },
    totalCost: Number,
    extraBed: { type: Boolean, default: false },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', BookingSchema)
