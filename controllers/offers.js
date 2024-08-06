const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Offer = require('../models/offer.js')
const Listing = require('../models/listing.js');
const router = express.Router()

//--------------------------------------- PUBLIC ROUTES-------------------------//



//--------------------------------------- PROTECTED ROUTES-------------------------//

router.use(verifyToken)

// * GET SPECIFIC OFFER //
router.get("/:offerId", (req, res) => {
    try {
        const offer = Offer.findById(req.params.offerId)
    res.status(200).json(offer)
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
    }
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