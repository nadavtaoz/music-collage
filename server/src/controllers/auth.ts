import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { Document } from 'mongoose';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../classes/app-error';
import axios from 'axios';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export type SpotifyTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

class UserResponseObj {
  public name: string;
  public email: string;
  public token: string | undefined;
  public userId: string;
  public hasSpotifyToken: boolean;

  constructor(
    user: Document & {
      name: string;
      email: string;
      spotifyToken?: string | null;
      _id: any;
    },
    token?: string
  ) {
    this.name = user.name;
    this.email = user.email;
    this.token = token;
    this.userId = user._id.toString();
    this.hasSpotifyToken = !!user.spotifyToken;
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('Email not found', 401, req.body);
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new AppError('Wrong Password', 401);
    }

    const token = jwt.sign(
      { email, userId: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: '10h' }
    );

    res.status(200).json(new UserResponseObj(user, token));
  } catch (err) {
    const error = err as AppError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, country } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPw, name, country });
    const result = await user.save();

    res.status(201).json({
      message: 'User created',
      userId: result._id,
    });
  } catch (err) {
    const error = err as AppError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const spotifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not exist', 401);
    }

    const body = {
      code: token,
      redirect_uri: process.env.SPOTIFY_TOKEN_REDIRECT,
      grant_type: 'authorization_code',
    };

    const response = await axios.post(SPOTIFY_TOKEN_URL, body, {
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
    });

    const data = response.data as SpotifyTokenResponse;
    user.spotifyToken = data.access_token;
    user.refreshToken = data.refresh_token;
    user.tokenTime = new Date();
    await user.save();

    res.status(200).json(new UserResponseObj(user, token));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const statusCode = err.response?.status || 500;
      const message =
        err.response?.data?.error?.message ||
        err.message ||
        'Spotify API request failed';

      const error = new AppError(
        'Spotify error : ' + message,
        statusCode,
        err.response?.data
      );
      return next(error);
    }

    const error = err as AppError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const authController = {
  login,
  signup,
  spotifyToken,
};

export default authController;
