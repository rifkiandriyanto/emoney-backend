const connection = require("../../configs/connection");

module.exports = async (data) => {
  const sql = `INSERT INTO user_details SET ?`;
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (err, res) => {
      if (err) reject(new Error("Internal server error"));
      if (res.affectedRows > 0) {
        resolve({ ...{ id: res.insertId }, ...data });
      }
    });
  });
};
