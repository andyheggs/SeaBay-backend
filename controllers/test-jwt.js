const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/sign-token', (req, res) => {
    // Mock user object added
    const user = {
      _id: 1,
      username: 'test',
      password: 'test',
      email: 'test',
    };


  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  res.json({ token });

  });

module.exports = router;