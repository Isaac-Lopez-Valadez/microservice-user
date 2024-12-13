const User = require('../../models/user.model.js');
const bcrypt = require('bcryptjs');

const auxiliaries = {};

auxiliaries.encrypPassword = async (userData) => {
  const { password: passwordClone } = userData;
  const passwordHash = await bcrypt.hash(passwordClone, 10);
  userData.password = passwordHash;
  return userData;
};

auxiliaries.registerUser = async userData => {
  try {
    const newUser = new User(userData);
    return newUser.save();
  } catch (error) {
    return { message: 'Failed create user', data: [] };
  }
};

auxiliaries.responseData = async data => ({ success: 200, message: 'User created', data: [] });

module.exports = auxiliaries;