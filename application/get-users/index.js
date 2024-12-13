const { getUsers } = require('./auxiliaries.js');

const getUsersRegistered = () => {
  return getUsers()
    .catch(error => {
      throw error;
    });
}

module.exports = getUsersRegistered;