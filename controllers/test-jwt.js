const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/sign-token', (req, res) => {
    // Mock user object added
    const user = {
      _id: 1,
      username: 'test',
      password: 'test',
    };


  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  res.json({ token });

  });

module.exports = router;