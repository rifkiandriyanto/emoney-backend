require("dotenv").config();

module.exports = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  port: process.env.APP_PORT,
  jwt_key: process.env.APP_KEY,
  url: process.env.APP_URL,
  nodemailer_mail: process.env.NODEMAILER_EMAIL,
  nodemailer_password: process.env.NODEMAILER_PASSWORD,
};
