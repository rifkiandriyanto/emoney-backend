const connection = require("../../configs/connection");

module.exports = async (field) => {
  const sql = `SELECT * FROM users WHERE ?`;
  return new Promise((resolve, reject) => {
    connection.query(sql, field, (err, res) => {
      if (err) reject(new Error("database error"));
      else if (res.length > 1) resolve(res);
      else if (res.length > 0) resolve(res[0]);
      else resolve(false);
    });
  });
};
