import * as dotenv from 'dotenv';
dotenv.config();

const APP_PORT = process.env.APP_PORT;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';
const MAILER_USER = process.env.MAILER_USER || '';
const MAILER_PASS = process.env.MAILER_PASS || '';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';

export {
  APP_PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  MAILER_USER,
  MAILER_PASS,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
};
