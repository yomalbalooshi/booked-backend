const { Schema, model } = require('mongoose')

const citySchema = new Schema(
  {
    city: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    country: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = model('City', citySchema)
