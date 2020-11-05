const nodemailer = require("nodemailer");
const {nodemailer_email, nodemailer_password} = require('../configs')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: nodemailer_email,
    pass: nodemailer_password,
  },
});

module.exports = (data) => {
  const mailOptions = {
    from: nodemailer_email,
    ...data,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) reject(new Error("Error internal server (Email)"));
      else resolve(true);
    });
  });
};
