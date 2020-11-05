const connection = require('../../configs/connection')

module.exports = async (data) =>
  new Promise((resolve, reject) => {
    const sql = `INSERT INTO transactions SET ?`;
    const sql2 = `UPDATE users SET ? WHERE ?`;
    const sql3 = `SELECT * FROM users WHERE ?`;
    const { amount, user_id } = data;
    const type_id = 1;
    connection.beginTransaction((beginTransactionError) => {
      if (beginTransactionError !== null) {
        reject(new Error(beginTransactionError.message));
      }

      connection.query(sql3, { id: user_id }, (queryError, res) => {
        if (queryError !== null) {
          connection.rollback((rollbackError) => {
            if (rollbackError !== null) reject(rollbackError.message);
            else reject(queryError.message);
          });
        } else if (res.length === 0) {
          connection.rollback((rollbackError) => {
            if (rollbackError !== null) reject(rollbackError.message);
            else reject(queryError.message);
          });
        } else {
          connection.query(
            sql2,
            [{ balance: res[0].balance + amount }, { id: user_id }],
            (queryError2) => {
              if (queryError2 !== null) {
                connection.rollback((rollbackError) => {
                  if (rollbackError !== null) reject(rollbackError.message);
                  else reject(queryError2.message);
                });
              } else
                connection.query(sql, { amount, user_id, type_id }, (queryError3) => {
                  if (queryError3 !== null)
                    connection.rollback((rollbackError) => {
                      if (rollbackError !== null) reject(rollbackError.message);
                      else reject(queryError3.message);
                    });
                  else
                    connection.commit((errorCommit) => {
                      if (errorCommit !== null) {
                        reject(errorCommit.message);
                      }
                      delete res[0].password;
                      delete res[0].otp;
                      delete res[0].isVerified;
                      resolve({
                        ...res[0],
                        ...{ balance: res[0].balance + amount },
                        amount,
                      });
                    });
                });
            }
          );
        }
      });
    });
  });
