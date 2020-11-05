const connection = require("../../configs/connection");

module.exports = (otp, isVerified) => {
  const sql = "SELECT * FROM users WHERE otp=? AND isVerified=?";
  return new Promise((resolve, reject) => {
    connection.query(sql, [otp, isVerified], (err, res) => {
      if (err) reject(new Error("Internal server error"));
      if (res.length > 0) resolve(res[0]);
      else resolve(false);
    });
  });
};
