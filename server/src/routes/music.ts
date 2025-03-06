import express from 'express';
import { query } from 'express-validator';

import musicController from '../controllers/music';
import authMiddleware from '../middelwares/is-auth';
import spotifyRefreshMiddleware from '../middelwares/spotify-refresh';

const router = express.Router();

router.get(
  '/search-artists',
  [
    query('q')
      .isString()
      .withMessage('q must be a string')
      .notEmpty()
      .withMessage('q cannot be empty'),
  ],
  authMiddleware,
  spotifyRefreshMiddleware,
  musicController.searchArtist
);

router.get(
  '/top',
  authMiddleware,
  spotifyRefreshMiddleware,
  musicController.getTopMusic
);

export default router;
