const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Changed from req.userData to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};