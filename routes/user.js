const express = require('express');
const connectDB = require('./../db/connection');
const {
  registerUser,
  loginUser,
  getUsers
} = require('./../application/indexRest');
const { authRequerided } = require('./../middlewares/validateToken');

const app = express();
connectDB();

const params = { payload: '' };
const EXCEPTION_CODE = 500;

const sendCookie = (res, token) => {
  res.cookie('x-token', token, {
    httpOnly: true,
    secure: false
    // sameSite: 'Strict',
    // maxAge: 3600000
  });
};

app.get('/', (req, res) => {
  res.send('Microservice-user running...');
});

// endpoint for register user
app.post('/register-user', async (req, res) => {
  params.payload = req.body;
  try {
    const response = await registerUser(params);
    res.send(response);
  } catch (error) {
    res.status(EXCEPTION_CODE).send({ statusCode: EXCEPTION_CODE, error });
  }
});

// endpoint for login user
app.post('/login-user', async (req, res) => {
  params.payload = req.body;
  try {
    const response = await loginUser(params);
    const { token, ...data } = response;
    sendCookie(res, token);
    res.send({ success: 200, message: 'User login', data });
  } catch (error) {
    const resMessage = error.message || error;
    res.status(EXCEPTION_CODE).send({ statusCode: EXCEPTION_CODE, error: resMessage });
  }
});

// endpoint for get users
app.get('/getUsers', authRequerided, async (req, res) => {
  try {
    const response = await getUsers(params);
    res.send(response);
  } catch (error) {
    res.status(EXCEPTION_CODE).send({ statusCode: EXCEPTION_CODE, error });
  }
});

// endpoint for logout user
app.get('/logout', async (req, res) => {
  sendCookie(res, '');
  res.send({ success: 200, message: 'User logout', data: '' });
});

module.exports = app;