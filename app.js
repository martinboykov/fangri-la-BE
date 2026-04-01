// require('newrelic'); // https://rpm.newrelic.com/accounts/2300349/applications/setup#nodejs
const express = require('express');

const app = express();

const path = require('path');

require('express-async-errors');
require('./starter/third-party')(app);
require('./starter/routes')(app);

module.exports = app;
