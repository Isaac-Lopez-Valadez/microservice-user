const { ifExistUser, loginUser } = require('./auxiliaries');
const validateData = require('./validations');

const login = ({ payload }) => {
  return validateData(payload)
    .then(ifExistUser)
    .then(loginUser)
    .catch(error => {
      throw error;
    });
}

module.exports = login;