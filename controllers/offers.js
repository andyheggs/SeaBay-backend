const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const offers = require('../models/offer.js')
const listing = require('../models/listing.js');
const router = express.Router()

//--------------------------------------- PUBLIC ROUTES-------------------------//



//--------------------------------------- PROTECTED ROUTES-------------------------//


// * GET SPECIFIC OFFER //
router.get("/:offerId", (req, res) => {
    
})

// * GET OFFERS USING LISTINGID //
router.get("/listing/:listingId", (req, res) => {
    
})

// * GET OFFERS USING USERID //
router.get("/user/:userId", (req, res) => {
    
})

// * ACCEPT OR REJECT OFFER FROM A USER //
router.post("/asses/:offerId", (req, res) => {
    
})

// * CREATE NEW OFFER //
router.post("/", (req, res) => {

})

// * EDIT OFFERS //
router.put("/:offerId", (req, res) => {
    
})

// * DELETE OFFER //
router.delete("/:offerId", (req, res) => {
    
})


module.exports = router