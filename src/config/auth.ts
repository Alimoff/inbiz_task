import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

  
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
    // Verify the token and decode its payload
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };

    // Attach the user object to the request
    req.user = { id: decodedToken.id };
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export default authenticateUser;
