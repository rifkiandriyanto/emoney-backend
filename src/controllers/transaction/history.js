const historyModel = require('../../models/transaction/history');
const historyCountModel = require('../../models/transaction/count');
const response = require('../../utils/response');
const pagination = require('../../utils/pagination');

module.exports = async (req, res) => {
  const { id: user_id } = req.me;
  const query = req.query;

  query.type_id = query.type_id || '';

  try {
    const { result, pageInfo } = await pagination(
      { user_id, type_id: query.type_id },
      req.query,
      historyModel,
      historyCountModel,
      'transaction/history',
      user_id
    );
    res.status(200).send(response(true, 'List history', result, { pageInfo }));
  } catch (e) {
    res
      .status(500)
      .send(
        response(false, 'Failed to get list history [Internal error server]')
      );
  }
};
