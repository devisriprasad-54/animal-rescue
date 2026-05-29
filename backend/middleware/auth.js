import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};
