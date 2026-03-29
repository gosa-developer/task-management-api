import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';

export interface UserPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // --- THE FIX ---
    // 1. Assign to a local variable
    const secret = config.jwtSecret;

    // 2. Use a "Truthiness" check that TypeScript 100% recognizes
    if (typeof secret !== 'string') {
      res.status(500).json({ message: 'Internal Server Error: JWT Secret is not configured' });
      return;
    }

    // 3. Now 'secret' is guaranteed to be a 'string' for the rest of this block
    const decoded = jwt.verify(token, secret as string) as JwtPayload;

    if (decoded && typeof decoded !== 'string' && decoded.id && decoded.email) {
      req.user = {
        id: Number(decoded.id),
        email: String(decoded.email),
      };
      next();
    } else {
      res.status(401).json({ message: 'Invalid token payload' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};