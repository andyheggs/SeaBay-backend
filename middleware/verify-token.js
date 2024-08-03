const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  try {
    // split JWT to aquire payload 
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // JWT payload to req.user
    req.user = decoded;

    //invoke middleware
    next();

  } catch (error) {

    // handle errors
    res.status(401).json({ error: 'Invalid authorization token.' });
  }
}

module.exports = verifyToken;