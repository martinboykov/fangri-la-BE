/* eslint-disable no-process-env*/
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const limiterHandler = require('../middleware/limiter');
const slowDown = require('express-slow-down');
const limiter = slowDown({
  windowMs: 10 * 60 * 1000, // 10 minutes
  delayAfter: 1000, // allow 1000 requests per 10 minutes, then...
  delayMs: 100, // begin adding 100ms of delay per request above 1000:
});
const fileUpload = require('express-fileupload');

const dotenv = require('dotenv');
dotenv.config({ override: true, quiet: true });

module.exports = (app) => {
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.json());
  app.use(
    cors({
      // origin: 'http://localhost:8100',
      // credentials: true
    }),
  );
  app.use(function (req, res, next) {
    const period = 60 * 60;
    if (req.method == 'GET') {
      res.set('Cache-control', `public, max-age=${period}`);
    }
    next();
  });

  app.use(compression());
  app.use(fileUpload());
  if (process.env.NODE_ENV === 'production') {
    // test
    // app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
    app.use(limiter, limiterHandler);
  }
};
