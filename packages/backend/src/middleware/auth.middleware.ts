import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PrismaClient, User } from '@prisma/client';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpError from '@/helpers/HttpError';

dotenv.config();

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'default_jwt_secret',
};

interface JwtPayload {
  id: number;
}

passport.use(
  new JwtStrategy(options, async (jwt_payload: JwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export const generateToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_jwt_secret', { expiresIn: '24h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret') as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User | false) => {
    if (err) return next(err);
    if (!user) return next(new HttpError(401, 'Unauthorized'));
    req.user = user;
    next();
  })(req, res, next);
};