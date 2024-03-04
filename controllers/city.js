const City = require('../models/City')

const index = async (req, res) => {
  const cities = await City.find({})
  res.send(cities)
}

const show = async (req, res) => {
  const city = await City.findById(req.params.id)
  res.send(city)
}
const create = async (req, res) => {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const city = await City.create(req.body)
    res.send(city)
  } catch (err) {
    res.send(`error in creating city: ${err}`)
  }
}

module.exports = {
  index,
  show,
  create
}
