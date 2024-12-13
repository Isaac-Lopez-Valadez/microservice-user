const { encrypPassword, registerUser, responseData } = require('./auxiliaries');
const validateData = require('./validations');

const register = ({ payload }) => {
  return validateData(payload)
    .then(encrypPassword)
    .then(registerUser)
    .then(responseData)
    .catch(error => {
      throw error;
    });
}

module.exports = register;