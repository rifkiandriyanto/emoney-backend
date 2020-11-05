const emailSender = require("../../utils/emailSender");
const {
  forgotPassword: forgotPasswordValidator,
} = require("../../validators/auth");
const response = require("../../utils/response");
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  const { email } = req.body;
  const forgotPasswordValidatorPassed = await forgotPasswordValidator({
    email,
  });
  if (forgotPasswordValidatorPassed.status) {
    try {
      const template = await fs.readFileSync(
        path.join(__dirname, "../../templates/ForgotPassword.html"),
        "utf-8"
      );
      const { email, token } = forgotPasswordValidatorPassed.passed;
      emailSender({
        to: email,
        subject: "Forgot Password Confirmation",
        text: "Here is your forgot password confirmation",
        html: mustache.render(template, {
          email,
          token,
        }),
      })
        .then(() => {
          res.status(200).send(response(true, "Success send email", { email }));
        })
        .catch((err) => {
          res
            .status(500)
            .send(response(false, "Error server email", { email, token }));
        });
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, forgotPasswordValidatorPassed.msg));
  }
};
