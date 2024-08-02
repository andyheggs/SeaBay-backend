const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Boat = require('../models/listing'); 


mongoose.connect('mongodb://localhost:27017/boat-trading-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Read JSON data from file
const dataPath = path.join(__dirname, 'listing_seed_data.json');
const seedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Insert seed data into the database
Boat.insertMany(seedData)
    .then(() => {
        console.log('Data seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error seeding data:', err);
        mongoose.connection.close();
    });