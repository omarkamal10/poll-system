/* eslint-disable import/no-anonymous-default-export */
import Dotenv from "dotenv";

Dotenv.config();

export default {
  Port: process.env.PORT * 1,

  SentryDNS: process.env.SENTRY_DNS,

  Database: {
    Host: process.env.DATABASE_HOST,
    Port: process.env.DATABASE_PORT * 1,
    Name: process.env.DATABASE_NAME,
    Username: process.env.DATABASE_USERNAME,
    Password: process.env.DATABASE_PASSWORD,

    Dialect: "postgres",
    Pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },

  Caching: {
    Host: process.env.CACHING_HOST,
    Port: process.env.CACHING_PORT * 1,
    expirationLifeTime: process.env.CACHING_LIFE_TIME * 1,
  },

  JwtSecret: process.env.JWT_SECRET,
  JwtLifeTime: process.env.JWT_LIFE_TIME,

  OTPLifeTime: process.env.OTP_LIFE_TIME,

  SMTP: {
    Host: process.env.SMTP_HOST,
    Port: process.env.SMTP_PORT * 1,
    User: process.env.SMTP_USER,
    Password: process.env.SMTP_PASSWORD,
  },

  App: {
    Name: process.env.APP_NAME,
    Logo: process.env.APP_LOGO,
    Website: process.env.APP_WEBSITE,
    Mail: process.env.APP_MAIL,
  },
};
