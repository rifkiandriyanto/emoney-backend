const {
  resetPassword: resetPasswordValidator,
} = require('../../validators/auth');
const resetPasswordModel = require('../../models/auth/changePassword');
const bcrypt = require('bcryptjs');
const response = require('../../utils/response');

module.exports = async (req, res) => {
  const { status, msg, passed } = await resetPasswordValidator(req.body);
  if (status) {
    try {
      const { password, id } = passed;
      const reseted = await resetPasswordModel(
        { password: bcrypt.hashSync(password, 12) },
        id
      );

      delete passed.password, delete passed.confirm_password;
      res.status(200).send(response(true, msg, passed));
    } catch (e) {
      res.status(500).send(response(false, msg, passed));
    }
  } else {
    res.status(400).send(response(false, msg, passed));
  }
};
