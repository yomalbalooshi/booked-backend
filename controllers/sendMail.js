const nodemailer = require('nodemailer')
const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  require('dotenv').config()
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }

  try {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    console.log('process.env.MAIL_USER', process.env.MAIL_USER)
    console.log('process.env.MAIL_PASS', process.env.MAIL_PASS)
    transporter.verify((error, success) => {
      if (error) {
        console.log('error----------', error)
      } else {
        console.log('All works fine, congratz!')
      }
    })
    const messageString =
      'from: ' + req.body.email + ' Message: ' + req.body.messageHtml
    var mail = {
      from: req.body.name,
      to: 'yyasmeen.b@gmail.com',
      subject: 'Booked Contact Request',
      html: messageString
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })

    // console.log('req.body :', req.body)
  } catch (err) {
    res.send(`error calling create ${err}`)
  }
}

module.exports = {
  create
}
