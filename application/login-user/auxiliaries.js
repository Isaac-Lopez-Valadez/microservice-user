const User = require('./../../models/user.model.js');
const bcrypt = require('bcryptjs');
const createToken = require('./../../libs/jwt.js');

const auxiliaries = {};

auxiliaries.ifExistUser = async userData => {
  const { phoneNumber, username } = userData;
  if (!username && !phoneNumber) {
    throw new Error('Se debe proporcionar el nombre de usuario o el número de teléfono.');
  }

  const query = {
    $or: [
      username ? { username } : null,
      phoneNumber ? { phoneNumber } : null
    ].filter(Boolean)
  };

  const userFound = await User.findOne(query);
  if (!userFound) throw new Error('Invalid username or phone number');
  return { userFound, userData };
}

auxiliaries.loginUser = async ({ userFound, userData }) => {
  const { password } = userData;

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) throw new Error('Invalid credential');

  const { _id: idUser, name, lastName1, lastName2, phoneNumber, email, username } = userFound;
  const token = await createToken({ idUser, name, lastName1, lastName2, phoneNumber, email, username });
  return { name, lastname: `${lastName1} ${lastName2}`, phoneNumber, email, username, token };
};

module.exports = auxiliaries;