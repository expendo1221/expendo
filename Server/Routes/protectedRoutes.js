const express = require('express');
const authMiddleware = require('../middlewares/auth');  // Import the middleware

const router = express.Router();

// A protected route example
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'You have access to this protected route', user: req.user });
});

// More protected routes can be added below
router.get('/another-protected-route', authMiddleware, (req, res) => {
  res.json({ msg: 'This is another protected route', user: req.user });
});

module.exports = router;
