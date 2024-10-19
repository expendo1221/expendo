const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Split to get the token after 'Bearer'

  // If there's no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to the request object
    req.user = decoded;
    next();
  } catch (err) {
    // Handle invalid token
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
