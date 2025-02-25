import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import AppError from '../classes/app-error';
import axios from 'axios';
import { UserRequest } from '../middelwares/spotify-refresh';

const SPOTIFY_URL = 'https://api.spotify.com';

interface Artist {
  id: string;
  name: string;
}

interface Album {
  images: string[];
  name: string;
  artists: Artist[];
}

interface Track {
  album: Album;
  name: string;
}

type SPOTIFY_TOP_RESPONSE = {
  items: Track[];
  limit: number;
  next: string | undefined;
  previous: string | undefined;
  offset: number;
  total: number;
};

/**
 * Make an API call to spotify to get the user's top music
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getTopMusic = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError('User does not exists');
    }

    const spotifyToken = user.spotifyToken;

    const response = await axios.get(SPOTIFY_URL + '/v1/me/top/tracks', {
      headers: {
        Authorization: 'Bearer ' + spotifyToken,
      },
    });

    const data = response.data as SPOTIFY_TOP_RESPONSE;
    const tracks: Track[] = data.items.map((i) => {
      return {
        album: {
          images: i.album.images,
          artists: i.album.artists.map((a) => {
            return {
              id: a.id,
              name: a.name,
            };
          }),
          name: i.album.name,
        },
        name: i.name,
      };
    });
    res.status(200).json(tracks);
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

const musicController = { getTopMusic };

export default musicController;
