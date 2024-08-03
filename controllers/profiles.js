const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/verify-token');

// Create User Route
router.post("/", async (req, res) => {
    // Check data is valid
    // Hash Password
    // Create User
    // Reurn Succsess codewith token
});

module.exports = router;