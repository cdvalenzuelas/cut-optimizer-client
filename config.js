require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  cors: process.env.CORS  
};

module.exports = config