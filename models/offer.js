const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({

  rejected: {type: Boolean, default: false},

  listing: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  offeringPrice: {type: Number, required: true},

  message: {type: String, required: true},

  offerCreated: {type: Date, default: Date.now}

});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
