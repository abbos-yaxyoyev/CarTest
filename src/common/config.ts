import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});



export const ENV = {
  DB_URL: process.env.DB_URL || "mongodb+srv://mongofastify:nodefastify@cluster0.ipnzs.mongodb.net/CarTest?retryWrites=true&w=majority",
  HOST: process.env.HOST || '0.0.0.0',
  EMPLOYEE_PORT: parseInt(process.env.EMPLOYEE_PORT) || 3000,
  USER_PORT: parseInt(process.env.USER_PORT) || 4000,
  PAYSYS_PORT: parseInt(process.env.PAYSYS_PORT) || 2000,
  UPLOAD_PORT: parseInt(process.env.UPLOAD_PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '1W',
  PAYME_PASSWORD: process.env.PAYME_PASSWORD || 'dQYvEUSf5RmG?bhQH0U4Oug?OCRQY9PIV4Fm',
  CLICK_PASSWORD: process.env.CLICK_PASSWORD || 'dQYvEUSf5RmG?bhQH0U4Oug?OCRQY9PIV4Fm',
  GEO_CODE_KEY: process.env.GEO_CODE_KEY || '222484db-b4a7-421b-9ed4-ed7893f93ed9',
};

export const USER_REGISTER = {
  BLOCK_SIGN_TIME: parseInt(process.env.BLOCK_SIGN_TIME) || 2 * 60,
  SIGN_ATTEMPTS: parseInt(process.env.SIGN_ATTEMPTS) || 5,
  INTERVAL_SIGNIN: parseInt(process.env.INTERVAL_SIGNIN) || 2 * 60,
  SMS_ACTIVE_TIME: parseInt(process.env.SMS_ACTIVE_TIME) || 2 * 60,
  OTP_RETRY: parseInt(process.env.OTP_RETRY) || 3,
  BLOCK_SMS_TIME: parseInt(process.env.BLOCK_SMS_TIME) || 2 * 60,
};

export const API = {
  admin_api: process.env.ADMIN_API || '',
  user_api: process.env.USER_API || '',
  paysys_api: process.env.PAYSYS_API || '',
};
