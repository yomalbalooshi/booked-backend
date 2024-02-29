const nodemailer = require('nodemailer')
const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied

  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }

  try {
    res.send('create() method called.')
  } catch (err) {
    res.send(`error calling create ${err}`)
  }
  /* 
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bb03a9478dca66",
      pass: "dbb6b2a1be929d"
    }
  });

 */
}

module.exports = {
  create
}
