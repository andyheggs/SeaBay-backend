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

