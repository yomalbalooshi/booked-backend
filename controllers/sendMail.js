const nodemailer = require('nodemailer')
const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied

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

    transporter.verify((error, success) => {
      if (error) {
        console.log(error)
      } else {
        console.log('All works fine, congratz!')
      }
    })

    var mail = {
      from: 'AAmir Saleh',
      to: 'blank.line@outlook.com',
      subject: 'Test Mail from Booking proj',
      html: 'This is a test email message sent to you from aamiralmayad@gmail.com'
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
    // res.send('create() method called.')
  } catch (err) {
    res.send(`error calling create ${err}`)
  }
  /* 
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

var mail = {
    from: name,
    to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',
    subject: 'Contact form request',
    html: message
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
 */
}

module.exports = {
  create
}
