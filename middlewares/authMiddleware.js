import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify token with secret key from .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user information (including user_id) to the request
    next();  // Proceed with the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
