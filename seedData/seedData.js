const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Listing = require('../models/listing');
const listingData = require('./listing_seed_data.json');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

async function seedDatabase() {
  try {
    await Listing.deleteMany({});
    console.log('Listings collection cleared');

    const listings = listingData.map(listing => {
      listing.seller = new mongoose.Types.ObjectId(listing.seller.replace("ObjectId('", "").replace("')", ""));
      return listing;
    });
    
    await Listing.insertMany(listings);
    console.log('Listings seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
}