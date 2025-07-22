import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);  // 401 - Unauthorized

  jwt.verify(token, process.env.JWT_SECRET!, (err, payload) => {
    if (err) return res.sendStatus(403);  // 403 - Forbidden
    (req as any).user = payload;
    next();
  });
}
