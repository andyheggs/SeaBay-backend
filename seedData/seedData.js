const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
dotenv.config();

const Listing = require('../models/listing');
const User = require('../models/user');
const listingData = require('./listing_seed_data.json');
const userData = require('./user_seed_data.json');

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
    // Clear existing collections
    await Listing.deleteMany({});
    await User.deleteMany({});
    console.log('Listings and Users collections cleared');

    // Hash userData passwords
    const hashedUserData = userData.map((user) => {
      user.password = bcrypt.hashSync(user.password, 12)
      return user
    })

    // Create users
    const createdUsers = await User.insertMany(hashedUserData);
    console.log('Users seeded successfully');

    // Map user IDs to listings
    const listings = listingData.map((listing, index) => {
      listing.seller = createdUsers[index % createdUsers.length]._id; // Assign users cyclically
      return listing;
    });

    // Create listings
    await Listing.insertMany(listings);
    console.log('Listings seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
}
