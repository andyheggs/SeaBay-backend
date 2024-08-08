const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Listing = require('../models/listing.js')
const User = require('../models/user.js')
const router = express.Router()

//--------------------------------------- PUBLIC ROUTES-------------------------//

// * INDEX //

// Define GET route to retrieving all listings (public access)
router.get('/', async (req, res) => {

  try {
      // Find all listings in the DB
      const listings = await Listing.find()

        // Populate seller details
          .populate('seller') 
      
      // Return listings as JSON
      return res.json(listings)

  } catch (error) {

      console.error(error)

      // Return 500 Internal Server Error response as JSON
      return res.status(500).json({ error: error.message })
  }
});


// * SHOW //

// Define a GET route for retrieving a single listing by ID (public access)
router.get('/:id', async (req, res) => {

  try {
      // Find the listing by ID in the DB
      const listing = await Listing.findById(req.params.id)
          
        // Populate seller details
          .populate('seller', 'username email') 
      
      if (!listing) {
          return res.status(404).json({ error: 'Listing not found' })
      }

      // Return listing as JSON
      return res.json(listing);

  } catch (error) {

      console.error(error);

      // Return 500 Internal Server Error response as JSON
      return res.status(500).json({ error: error.message })
  }
});


//--------------------------------------- PROTECTED ROUTES-------------------------//

// token verification middleware for all protected routes
router.use(verifyToken)

// * SELLER TO 'CREATE' A LISTING //

// Define POST route for creating new listing for seller
router.post('/', async (req, res) => {

    try {

      // Log authenticated user
      console.log('Authenticated User:', req.user)
      
      // Attach seller ID from the authed user
      console.log("TYROEPSPSPSD", typeof(req.user._id))
      req.body.seller = req.user._id
      console.log(req.body)
      // Create new listing in DB
      const listing = await Listing.create(req.body)
      console.log(listing)
      
      
      // Populate seller info in new listing doc to inc. seller details
      //await listing.populate('seller')

      // Add Listing_Id to the User Model's Listings 
      //const newUser = await User.findByIdAndUpdate(listing.seller, { $push: { listings: listing._id } }, {new:true})

      // Return 201 Created success status with new listing as JSON
      return res.status(201).json(listing)

      //error handling:
    } catch (error) {

      console.error(error);

      //return 500 Internal Server Error response as JSON
      return res.status(500).json({ error: error.message })
    }
  });


// * INDEX - SELLER TO RETRIEVE THIER LISTING(S) ON THEIR DASHBOARD//

// Define a GET route retrieving the sellers' listing(s)
router.get('/seller', async (req, res) => {

    try {
        // Find all listings in DB for seller
        const listings = await Listing.find({ seller: req.user._id })

        // Populate 'seller' field with details of listing
        .populate('seller')

        // Populate'offers' field with details of the offers made on the listing
        .populate({
          path: 'offers',
          populate: { path: 'user', select: 'username email' } 
        });

      // Return listings as a JSON
      return res.json(listings)

        //error handluing:
    } catch (error) {

      console.log(error)

      //return 500 Internal Server Error response as JSON
      return res.status(500).json({ error: error.message })
    }
  })

// * 'UPDATE' SELLERS LISTING(S) //

// Define PUT route for updating sellers listing
router.put('/:id', async (req, res) => {

  try {

      // Find the listing by ID
      const listing = await Listing.findById(req.params.id).populate('seller')

      // If no listing exists:
      if (!listing) {
          return res.status(404).json({ error: 'Listing not found' })
      }

      // Check if the authenticated user is the seller of the listing
      if (!listing.seller._id.equals(req.user._id)) {

          return res.status(403).json({ error: 'You are not authorized to update this listing' })
      }

      // Updating the listing
      const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .populate('seller')

      // Ensure the seller field is populated correctly
      updatedListing.seller = req.user

      // Return the updated listing
      return res.json(updatedListing)

  } catch (error) {

      console.error(error)

      return res.status(500).json({ error: error.message })
  }
});

// * DELETE SELLERS LISTING //

// Define DELETE route for deleting an existing listing
router.delete('/:id', async (req, res) => {

  try {
      // Find the listing by ID and populate the seller field
      const listing = await Listing.findById(req.params.id).populate('seller')

      if (!listing) {
          return res.status(404).json({ error: 'Listing not found' })
      }

      // Check if the authenticated user is the seller of the listing
      if (!listing.seller._id.equals(req.user._id)) {
          return res.status(403).json({ error: 'You are not authorized to delete this listing' })
      }

      // Delete the listing
      await Listing.findByIdAndDelete(req.params.id)

      // Return 204 No Content success status
      return res.status(204).send()

  } catch (error) {

      console.error(error);

      // Return 500 Internal Server Error response as JSON
      return res.status(500).json({ error: error.message })
  }
});


module.exports = router