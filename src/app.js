import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes';

const app = express();

dotenv.config();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true }, () =>
  console.log('connected to mongodb...')
);

app.use('/api', router);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// any routes will display these static files
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => console.log('Running on localhost:3002'));
export default app;
