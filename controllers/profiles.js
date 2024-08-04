const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const verifyToken = require('../middleware/verify-token')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()

// Creates User models 
router.post("/signup", async (req, res) => {
    try {
        // Hashes incoming password
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        // Creates new user using information from req.body and hashedPassword
     const newUser = await User.create({
        username: req.body.username, 
        password: hashedPassword,
        email: req.body.email
     })
    //  Creates the new token
     const token = jwt.sign({username: newUser.username, _id : newUser._id}, process.env.TOKENSECRET)
    //  Returns both the created user and the token for that user 
    res.status(200).json({newUser, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

module.exports = router