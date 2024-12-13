const jwt = require('jsonwebtoken');

const authRequerided = (req, res, next) => {
  const token = req.cookies['x-token'];

  if (!token) return res.status(401).json({ message: 'No token, Access denied' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token, Access denied' });
    req.user = user;
    next();
  });
};

module.exports = { authRequerided };