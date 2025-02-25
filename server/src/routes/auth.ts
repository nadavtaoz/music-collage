import express from 'express';
import authController from '../controllers/auth';
import authMiddleware from '../middelwares/is-auth';

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/spotify_token', authMiddleware, authController.spotifyToken);

export default router;
