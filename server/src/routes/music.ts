import express from 'express';

import musicController from '../controllers/music';
import authMiddleware from '../middelwares/is-auth';
import spotifyRefreshMiddleware from '../middelwares/spotify-refresh';

const router = express.Router();

router.get(
	'/top',
	authMiddleware,
	spotifyRefreshMiddleware,
	musicController.getTopMusic
);

export default router;
