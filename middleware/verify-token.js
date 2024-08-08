// Import jsonwebtoken library for handling JWTs
const jwt = require('jsonwebtoken')

// Import User model (not directly used in this function)
const User = require('../models/user')

// Middleware function to verify JWT token in request headers
function verifyToken(req, res, next) {

    try {
        // Log auth header for debugging
        console.log(req.headers.authorization)

        // Extract token from auth header
        const token = req.headers.authorization.split(' ')[1]

        // Verify extracted token using secret key defined in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Assign decoded payload to req.user for further use in subsequent middleware or route handlers
        req.user = decoded.user

        // Log decoded user
        console.log('Decoded User:', decoded ) 

        // invoke next middleware function
        next();

    } catch (error) {
        // Log token verification err
        console.log('Token Error:', error)

        // If error occurs - 401 Unauthorised response
        res.status(401).json({ error: 'Invalid authorisation token.' })
    }
}

// Export 
module.exports = verifyToken;
