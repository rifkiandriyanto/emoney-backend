const connection = require('../../configs/connection');

module.exports = async (data) => {
  const { otp } = data;
  const dataToSend = {
    otp,
  };
  const sql = `UPDATE users SET isVerified=1 WHERE ? AND isVerified=0`;
  return new Promise((resolve, reject) => {
    connection.query(sql, dataToSend, (err, res) => {
      if (err) reject(new Error('Internal server error'));
      if (res.affectedRows > 0) {
        resolve({ ...dataToSend });
      } else {
        reject(new Error('Code is not valid'));
      }
    });
  });
};
