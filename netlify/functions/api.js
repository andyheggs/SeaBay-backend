const serverless = require('serverless-http')

const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')

const mongoose = require('mongoose')
const testJWTRouter = require('../../controllers/test-jwt')
const usersRouter = require('../../controllers/users')
const profilesRouter = require('../../controllers/profiles')
const listingsRouter = require('../../controllers/listings.js')
const offersRouter = require('../../controllers/offers.js')
const morgan = require('morgan');

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});
app.use(morgan("dev"))
app.use(cors());
app.use(express.json())
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use('/test-jwt', testJWTRouter)
//app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)
app.use('/listings', listingsRouter)
app.use('/offers', offersRouter)

module.exports.handler = serverless(app)