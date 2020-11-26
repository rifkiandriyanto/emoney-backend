const emailSender = require('../../utils/emailSender');
const {
  forgotPassword: forgotPasswordValidator,
} = require('../../validators/auth');
const response = require('../../utils/response');

module.exports = async (req, res) => {
  const { email } = req.body;
  const forgotPasswordValidatorPassed = await forgotPasswordValidator({
    email,
  });
  if (forgotPasswordValidatorPassed.status) {
    try {
      const { email, token } = forgotPasswordValidatorPassed.passed;

      res.status(200).send(response(true, 'Success send email', { email }));
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, forgotPasswordValidatorPassed.msg));
  }
};
