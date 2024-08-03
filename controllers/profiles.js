const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/verify-token');

// Create User Route
router.post("/", async (req, res) => {
    try {
        // Check data is valid
    // Hash Password
    // Create User
    // Reurn Succsess codewith token
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;