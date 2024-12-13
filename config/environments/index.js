const dotenv = require('dotenv');

module.exports = function loadEnvVariables () {
  switch (process.env.NODE_ENV) {
    case 'prod':
      dotenv.config({ path: './config/environments/.env.production' });
      break;
    case 'dev':
      dotenv.config({ path: './config/environments/.env.development' });
      break;
    default:
      dotenv.config({ path: './config/environments/.env.development' });
  }
};