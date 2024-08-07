const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({

    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ['Motor', 'Sail', 'Other']
    },

    hullType: {
        type: String,
        required: true,
        enum: ['Monohull', 'Catamaran', 'Trimaran', 'Multihull', 'Other']
    },
    
    make: {type: String, required: true},

    model: {type: String, required: true},  
    
    boatName: {type: String, required: true},
    
    length: {type: Number, required: true},

    age: {type: Number, required: true},

    location: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        postcode: {type: String, required: true},
        country: {type: String, required: true},
    },

    description: {type: String},

    price: {type: Number, required: true },

    additionalInfo: {type: String},

    //new field to add image to form
    vesselImage: {type: String},
    
    listingCreated: {type: Date, default: Date.now},

    offers: [{
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    }]
    
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;