const connection = require("../../configs/connection");

module.exports = () =>
  new Promise((resolve, reject) => {
    const sql = "SELECT * FROM transaction_types";
    connection.query(sql, (err, res) => {
      if (err)
        reject(
          new Error("Database error [failed to get all transaction types]")
        );
      else resolve(res);
    });
  });
