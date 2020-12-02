const connection = require('../../configs/connection');

module.exports = async (data) => {
  const sql = `SELECT * FROM user_details WHERE ?`;
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (err, res) => {
      if (err) reject(new Error('Internal server error'));
      else if (res.length < 1) reject('user not found');
      else {
        resolve(res[0]);
      }
    });
  });
};
