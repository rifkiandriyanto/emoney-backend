const transactionTypeModel = require('../../models/transactionType/getAll');
const response = require('../../utils/response');

module.exports = async (req, res) => {
  try {
    const result = await transactionTypeModel();
    res.status(200).send(response(true, 'list all transaction types', result));
  } catch (e) {
    res.status(500).send(response(false, e.message));
  }
};
