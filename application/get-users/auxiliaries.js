const User = require('../../models/user.model.js');

const getUsers = async userData => {
  const usersFound = await User.find();
  if (usersFound.length === 0) throw new Error('No users registered');
  const data = usersFound.map(user => {
    const { _id: userID, name, lastName1, lastName2, phoneNumber, email, username } = user;
    return { userID, name, lastName: `${lastName1} ${lastName2}`, phoneNumber, email, username };
  });
  return ({ success: 200, message: 'Users registered', data });
};

module.exports = { getUsers };