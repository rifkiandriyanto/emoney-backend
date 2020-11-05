const activation = require("../../models/auth/activation");
const { activation: activationValidator } = require("../../validators/auth");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  const { status, passed, msg } = await activationValidator(req.body);
  if (status) {
    const { otp } = passed;
    try {
      await activation({ otp });
      res.status(200).send(response(true, msg, { otp }));
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, msg));
  }
};
