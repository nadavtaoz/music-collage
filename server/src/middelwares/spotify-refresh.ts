import { Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import User, { UserSchemaType } from '../models/user';
import Document from 'mongoose';
import { AuthRequest } from '../middelwares/is-auth';
import AppError from '../classes/app-error';
import axios from 'axios';
import { SpotifyTokenResponse } from '../controllers/auth';

const SPOTIFY_REFRESH_URL: string = 'https://accounts.spotify.com/api/token';
const SPOTIFY_EXP_IN_SECONDS: number = 3500;

export interface UserRequest extends AuthRequest {
  user?: UserSchemaType;
}

/**
 * This middleware is response for checking the user's spotify token expiretion and to refresh it if needed.
 * @param req
 * @param res
 * @param next
 */
const spotifyRefreshMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new AppError('Email not found', 401, req.body);
    }

    if (!user.spotifyToken || !user.tokenTime || !user.refreshToken) {
      throw new AppError('User has no Spotify token', 401, req.body);
    }

    const diff = new Date().getTime() - user.tokenTime.getTime();

    if (diff / 1000 > SPOTIFY_EXP_IN_SECONDS) {
      const response = await axios.post(
        SPOTIFY_REFRESH_URL,
        {
          grant_type: 'refresh_token',
          refresh_token: user.refreshToken,
          client_id: process.env.SPOTIFY_CLIENT_ID,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              Buffer.from(
                process.env.SPOTIFY_CLIENT_ID +
                  ':' +
                  process.env.SPOTIFY_CLIENT_SECRET
              ).toString('base64'),
          },
        }
      );

      const data = response.data as SpotifyTokenResponse;
      user.spotifyToken = data.access_token;
      user.refreshToken = data.refresh_token;
      user.tokenTime = new Date();
      await user.save();
    }
    req.user = user;
    next();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const statusCode = err.response?.status || 500;
      const message =
        err.response?.data?.error?.message ||
        err.message ||
        'Spotify API request failed';

      const error = new AppError(message, statusCode, err.response?.data);
      return next(error);
    }

    const error = err as AppError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

export default spotifyRefreshMiddleware;
