const jwt = require('jsonwebtoken');

const createAccessToken = params => jwt.sign(params, process.env.SECRET_KEY, { expiresIn: '1h' });

module.exports = createAccessToken;