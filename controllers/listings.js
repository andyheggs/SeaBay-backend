const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Listing = require('../models/listing.js')
const router = express.Router()


