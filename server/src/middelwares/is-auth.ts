import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '../classes/app-error';

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new AppError('Not authenticated', 401);
  }
  const token = authHeader.split(' ')[1] ?? '';
  let decodedToken: string | JwtPayload;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError(err.message, 401);
    }
    throw new AppError('Invalid token', 500);
  }

  if (!decodedToken || typeof decodedToken === 'string') {
    throw new AppError('Not authenticated', 401);
  }

  req.userId = decodedToken.userId;
  next();
};

export default authMiddleware;
