const register = require('../../models/auth/register');
const authValidator = require('../../validators/auth');
const response = require('../../utils/response');
const emailSender = require('../../utils/emailSender');
const OTPGenerator = require('../../utils/OTPGenerator');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  const registerValidator = await authValidator.register(req.body);
  if (registerValidator.status) {
    const { email, password } = registerValidator.passed;
    try {
      const template = await fs.readFileSync(
        path.join(__dirname, '../../templates/OTPVerification.html'),
        'utf-8'
      );
      const code = await OTPGenerator(4);
      emailSender({
        to: email,
        subject: "Hello, i'm from antoo e-wallet",
        text: 'Thanks for your registration, here is your OTP',
        html: mustache.render(template, {
          email,
          code,
        }),
      })
        .then(async () => {
          const registeredUser = await register({
            email,
            password: bcrypt.hashSync(password, 12),
            otp: code,
          });

          delete registeredUser.password;
          delete registeredUser.balance;
          delete registeredUser.isVerified;
          res
            .status(201)
            .send(response(true, registerValidator.msg, registeredUser));
        })
        .catch((error) => {
          if (error) {
            res.status(500).send(response(false, 'Error email server'));
          } else {
            res
              .status(500)
              .send(response(false, 'Error email server', registeredUser));
          }
        });
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, registerValidator.msg));
  }
};
