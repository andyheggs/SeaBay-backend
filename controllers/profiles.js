const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/verify-token');
const bcrypt = require('bcryptjs');

// Create User Route
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
     const newUser = await User.create({
        username: req.body.username, 
        password: hashedPassword,
        email: req.body.email
     });
    // Create User
    // Reurn Succsess codewith token
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;