import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import Promise from 'bluebird';

import cartController from './controllers/cartController';
import router from './routes';

const MongoStore = require('connect-mongo')(session);

const app = express();

dotenv.config();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URL ||
    'mongodb://kim:Zenten#2@ds064198.mlab.com:64198/shop',
  { useMongoClient: true },
  () => console.log('connected to mongodb...')
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
// Set up session to connect cookie to mongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkeyagain",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
    store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
    // ttl: 2 days * 24 hours * 60 minutes * 60 seconds
  })
);

app.post('/api/cart', cartController.post);
app.get('/api/cart', cartController.get);
app.use('/api', router);

// static files
app.use(express.static(path.join(__dirname, 'client/build')));

// any routes will display these static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT || 3002);
export default app;
