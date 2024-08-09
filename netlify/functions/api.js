const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const testJWTRouter = require('../controllers/test-jwt');
const profilesRouter = require('../controllers/profiles');
const listingsRouter = require('../controllers/listings');
const offersRouter = require('../controllers/offers');
const morgan = require('morgan');

// Initialize Express app
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/.netlify/functions/api/test-jwt', testJWTRouter);
app.use('/.netlify/functions/api/profiles', profilesRouter);
app.use('/.netlify/functions/api/listings', listingsRouter);
app.use('/.netlify/functions/api/offers', offersRouter);

// Export the serverless function
module.exports.handler = serverless(app);

const serverless = require('serverless-http')

const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express()
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