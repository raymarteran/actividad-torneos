import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'secret_key_default',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
};

