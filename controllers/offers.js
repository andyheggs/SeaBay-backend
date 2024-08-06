const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Offer = require('../models/offer.js')
const Listing = require('../models/listing.js');
const router = express.Router()

//--------------------------------------- PUBLIC ROUTES-------------------------//



//--------------------------------------- PROTECTED ROUTES-------------------------//

router.use(verifyToken)

// * GET SPECIFIC OFFER //
router.get("/:offerId", async (req, res) => {
    try {
        const offer = Offer.findById(req.params.offerId)
    res.status(200).json(offer)
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

// * ACCEPT OR REJECT OFFER FROM A USER (takes a question parameter {rejected:bool})//
router.put("/assess/:offerId", (req, res) => {
try {
    const offer = Offer.findById(req.params.offerId).populate("listing")
    if (offer.listing.seller.equals(req.user._id)) return res.status(403).json({error: "Unauthorized Access"})
    offer.rejected = req.params.rejected
    const updatedOffer = Offer.findByIdAndUpdate(req.params.offerId, offer, {new: true})
    res.status(200).json(updatedOffer)
} catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
}
})

// * CREATE NEW OFFER //
router.post("/", async (req, res) => {
    try{
        req.body.rejected = false 
        req.body.user = req.user._id
        const newOffer = Offer.create(req.body)
        newOffer._doc.user = req.user
        // Might need to add in the listingId as well but idk
        res.status(200).json(newOffer)
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

// * EDIT OFFERS //
router.put("/:offerId", (req, res) => {
    try {
        const offer = Offer.findById(req.params.offerId)
        if (!offer.user.equals(req.user._id)) return res.status(403).json({error: "Unauthorized Access"})
        req.body.user = req.user
    req.body.listing = offer.listing
    req.body.rejected = false
        const updatedOffer = Offer.findByIdAndUpdate(req.params.offerId, req.body, {new: true})
        res.status(200).json(updatedOffer)
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

// * DELETE OFFER //
router.delete("/:offerId", (req, res) => {
    
})


module.exports = router