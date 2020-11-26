const register = require('../../models/auth/register');
const authValidator = require('../../validators/auth');
const response = require('../../utils/response');
const OTPGenerator = require('../../utils/OTPGenerator');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  const registerValidator = await authValidator.register(req.body);
  if (registerValidator.status) {
    const { email, password } = registerValidator.passed;
    try {
      const code = await OTPGenerator(4);

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
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, registerValidator.msg));
  }
};
