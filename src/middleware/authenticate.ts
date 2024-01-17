import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to verify JWT and attach user information to req
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers or cookies or wherever you store it
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
    // Verify the token and decode its payload
    const decodedToken = jwt.verify(token, 'your-secret-key') as { id: string };

    // Attach the user ID to the request object
    req.user = { id: decodedToken.id };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
