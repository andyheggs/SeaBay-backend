const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Listing = require('../models/listing.js')
//const router = express.Router()

//--------------------------------------- PUBLIC ROUTES-------------------------//



//--------------------------------------- PROTECTED ROUTES-------------------------//


// * CREATE //

// Define POST route for creating new listing
router.post('/', async (req, res) => {
    try {
      // Attach seller ID from the authed user
      req.body.seller = req.user._id;
      
      // Create new listing in DB
      const listing = await Listing.create(req.body)
      
      // Populate seller info in new listing doc to inc. seller details
      await listing.populate('seller').execPopulate()
      
      // Return 201 Created success status with new listing as JSON
      return res.status(201).json(listing)

      //error handling:
    } catch (error) {

      console.error(error);

      //return 500 Internal Server Error response as JSON
      return res.status(500).json({ error: error.message })
    }
  });


// * INDEX //

// Define a GET route for retrieving all listings
router.get('/', async (req, res) => {

    try {
        // Find all listings in DB
        const listings = await Listing.find()

        // Populate 'seller' field with details of listing
        .populate('seller')

        // Populate'offers' field with details of the offers made on the listing
        .populate('offers')

      // Return listings as a JSON
      return res.json(listings)

        //error handluing:
    } catch (error) {

      console.log(error)

      //return 500 Internal Server Error response as JSON
      return res.status(500).json({ error: error.message })
    }
  })

// * SHOW //



// * UPDATE //



// * DELETE //

