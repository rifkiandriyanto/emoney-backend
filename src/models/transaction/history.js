const connection = require('../../configs/connection');

module.exports = (data, start, limit, sortBy) =>
  new Promise((resolve, reject) => {
    const { user_id, type_id } = data;

    const sql = `SELECT t.id, t.amount, t.date, t.concerned, ts.type FROM transactions t, transaction_types ts WHERE t.user_id=? AND ts.id=t.type_id ${
      type_id ? 'AND t.type_id='.concat(connection.escape(type_id)) : ''
    } ORDER BY id ${sortBy} LIMIT ?, ?`;
    connection.query(sql, [user_id, start, limit], (err, res) => {
      if (err) reject(new Error('Database error'));
      else resolve(res);
    });
  });
