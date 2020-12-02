const connection = require('../../configs/connection');

const sql = `DELETE FROM users WHERE ?`;
module.exports = (data) =>
  new Promise((resolve, reject) => {
    connection.query(sql, data, (err, res) => {
      if (err) reject(new Error('Error database server'));
      else if (res.affectedRows > 0) resolve(true);
      else reject(new Error('Error database server'));
    });
  });
