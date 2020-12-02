const transferModel = require('../../models/transaction/transfer');
const { transfer: transferValidator } = require('../../validators/transaction');
const response = require('../../utils/response');

module.exports = async (req, res) => {
  const { passed, msg, status } = await transferValidator({
    ...req.body,
    ...{ user_id: req.me.id, email_from: req.me.email },
  });
  if (status) {
    try {
      const { email_to, user_id, amount } = passed;
      const transfered = await transferModel({ email_to, user_id, amount });
      res
        .status(200)
        .send(response(true, `Success transfer to ${email_to}`, transfered));
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, msg, req.body));
  }
};
