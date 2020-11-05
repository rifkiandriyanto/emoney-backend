const connection = require("../../configs/connection");

module.exports = async (data) => {
  const sql = `UPDATE user_details SET ? WHERE ?`;
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (err, res) => {
      console.log(err)
      console.log(err)
      if (err) reject(new Error("Internal server error"));
      if (res.affectedRows > 0) {
        resolve({ ...{ id: res.insertId }, ...data });
      }
    });
  });
};
