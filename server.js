var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var methodOverride = require('method-override')
var cors = require('cors')
require('dotenv').config()
require('./config/database')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const AuthRouter = require('./routes/AuthRouter')
const { resourceUsage } = require('process')
const MailRouter = require('./routes/sendMail')
const hotelsRouter = require('./routes/hotels')
const bookingsRouter = require('./routes/bookings')
const roomsRouter = require('./routes/rooms')

const cityRouter = require('./routes/city')

const reviewsRouter = require('./routes/reviews')


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', indexRouter)
app.use('/hotels', hotelsRouter)
app.use('/users', usersRouter)
app.use('/rooms', roomsRouter)
app.use('/', AuthRouter)
app.use('/mail', MailRouter)
app.use('/bookings', bookingsRouter)

app.use('/rooms', roomsRouter)
app.use('/city', cityRouter)

app.use('/reviews', reviewsRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
