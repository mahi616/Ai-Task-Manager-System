const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware: verify JWT and attach user to req
const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2️⃣ Extract token
      token = req.headers.authorization.split(' ')[1];

      // 3️⃣ Verify token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ Attach user id to req.user
      req.user = decoded.id;

      // 5️⃣ Call next middleware/controller
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 6️⃣ If token not found
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
