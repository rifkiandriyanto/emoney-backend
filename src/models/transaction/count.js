const connection = require("../../configs/connection");

module.exports = (user_id) =>
  new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(*) AS count FROM transactions WHERE user_id=?";
    connection.query(sql, [user_id], (err, res) => {
      if (err) reject(new Error("can't get count of users"));
      else resolve(res);
    });
  });
