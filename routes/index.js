const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
require('./../config');

const app = express();

const MESSAGE_FAIL = 'Bad request';
const ROUTE_NOT_FOUND = 400;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
  res.setHeader('permissions-policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), usb=()');
  next();
});

// parse application/json
app.use((req, res, next) => {
  bodyParser.json()(req, res, err => {
    if (err) {
      return res.json({
        statusCode: ROUTE_NOT_FOUND,
        message: MESSAGE_FAIL,
        content: ''
      });
    }
    next();
  });
});

app.use('/user', require('./user'));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`---- ---- ---- Server User by REST running at ${process.env.SERVER_URL}:${process.env.SERVER_PORT} at ${process.env.APP_ENV} environment ---- ---- ---- `);
});

module.exports = app;