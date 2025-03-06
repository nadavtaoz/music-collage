import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth';
import musicRouter from './routes/music';
import AppError from './classes/app-error';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRouter);
app.use('/music', musicRouter);

// Error handler middleware
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data, status });
});

mongoose
  .connect(process.env.DB_URL || '')
  .then(() => {
    console.log('listen on 8080...');
    app.listen(8080);
  })
  .catch((err: Error) => console.log(err));
