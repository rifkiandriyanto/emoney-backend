const connection = require("../../configs/connection");

module.exports = (data, user_id) =>
  new Promise((resolve, reject) => {
    const sql = `UPDATE users SET password=? WHERE id=?`;
    const { password } = data;
    connection.query(sql, [password, user_id], (err, res) => {
      if (err) reject(new Error("failed update user"));
      else {
        if (res.affectedRows > 0) {
          resolve(true);
        } else {
          reject(new Error("failed update user"));
        }
      }
    });
  });
