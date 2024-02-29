const { Schema, model } = require('mongoose')

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    hotels: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }]
  },
  { timestamps: true }
)

module.exports = model('Company', companySchema)
