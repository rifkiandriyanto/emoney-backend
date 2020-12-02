const topUpModel = require('../../models/transaction/topUp');
const transactionValidator = require('../../validators/transaction');
const response = require('../../utils/response');

module.exports = async (req, res) => {
  const { status, passed, msg } = transactionValidator.topup({
    ...req.body,
    ...{ user_id: req.me.id },
  });

  if (status) {
    try {
      const topUp = await topUpModel(passed);
      res.status(200).send(response(true, msg, topUp));
    } catch (e) {
      res.status(500).send(response(false, e.message, topUp));
    }
  } else {
    res.status(400).send(response(false, msg, req.body));
  }
};
