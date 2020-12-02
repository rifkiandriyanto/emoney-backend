const connection = require('../../configs/connection');

module.exports = (data) =>
  new Promise((resolve, reject) => {
    const { email_to, user_id, amount } = data;
    const sql1 = `SELECT * FROM users WHERE email=?`;
    const sql2 = `SELECT * FROM users WHERE id=?`;
    const sql3 = `INSERT INTO transactions (id, user_id, type_id, amount, concerned) VALUES (null, ?, ?, ?, ?), (null, ?, ?, ?, ?)`;
    const sql4 = `UPDATE users SET ? WHERE ?`;

    const type_id = 2;

    connection.beginTransaction((beginTransactionError) => {
      if (beginTransactionError) {
        reject(new Error('Database error'));
      } else {
        connection.query(sql1, [email_to], (queryError1, userTo) => {
          if (queryError1) {
            connection.rollback((rollbackError) => {
              if (rollbackError) reject(rollbackError.message);
              else reject(new Error('Database error [Error get user to data]'));
            });
          } else {
            if (userTo.length > 0) {
              connection.query(sql2, [user_id], (queryError2, userFrom) => {
                if (queryError2) {
                  connection.rollback((rollbackError) => {
                    if (rollbackError) reject(rollbackError.message);
                    else
                      reject(
                        new Error('Database error [Error get user from data]')
                      );
                  });
                } else {
                  if (userFrom.length > 0) {
                    connection.query(
                      sql3,
                      [
                        user_id,
                        type_id,
                        amount * -1,
                        userTo[0].email,
                        userTo[0].id,
                        type_id,
                        amount,
                        userFrom[0].email,
                      ],
                      (queryError3, insertedTransaction) => {
                        if (queryError3) {
                          connection.rollback((rollbackError) => {
                            if (rollbackError) reject(rollbackError.message);
                            else
                              reject(
                                new Error(
                                  'Database error [failed to create case]'
                                )
                              );
                          });
                        } else {
                          if (insertedTransaction.affectedRows > 1) {
                            connection.query(
                              sql4,
                              [
                                {
                                  balance:
                                    parseInt(userFrom[0].balance) -
                                    parseInt(amount),
                                },
                                { id: user_id },
                              ],
                              (queryError4, updatedUserFrom) => {
                                if (queryError4) {
                                  connection.rollback((rollbackError) => {
                                    if (rollbackError)
                                      reject(rollbackError.message);
                                    else
                                      reject(
                                        new Error(
                                          'Database error [failed to update user from]'
                                        )
                                      );
                                  });
                                } else {
                                  if (updatedUserFrom.affectedRows > 0) {
                                    connection.query(
                                      sql4,
                                      [
                                        {
                                          balance:
                                            parseInt(userTo[0].balance) +
                                            parseInt(amount),
                                        },
                                        { id: userTo[0].id },
                                      ],
                                      (queryError42, updatedUserTo) => {
                                        if (queryError42) {
                                          connection.rollback(
                                            (rollbackError) => {
                                              if (rollbackError)
                                                reject(rollbackError.message);
                                              else
                                                reject(
                                                  new Error(
                                                    'Database error [failed to update user to]'
                                                  )
                                                );
                                            }
                                          );
                                        } else {
                                          if (updatedUserTo.affectedRows > 0) {
                                            delete userFrom[0].password;
                                            delete userFrom[0].otp;
                                            delete userFrom[0].isVerified;

                                            connection.commit((commitErr) => {
                                              if (commitErr) {
                                                connection.rollback(
                                                  (rollbackError) => {
                                                    if (rollbackError)
                                                      reject(
                                                        rollbackError.message
                                                      );
                                                    else
                                                      reject(
                                                        new Error(
                                                          'Database error [failed to update user to]'
                                                        )
                                                      );
                                                  }
                                                );
                                              } else {
                                                resolve({
                                                  ...userFrom[0],
                                                  ...{
                                                    balance:
                                                      parseInt(
                                                        userFrom[0].balance
                                                      ) - parseInt(amount),
                                                    amount,
                                                  },
                                                });
                                              }
                                            });
                                          } else {
                                            connection.rollback(
                                              (rollbackError) => {
                                                if (rollbackError)
                                                  reject(rollbackError.message);
                                                else
                                                  reject(
                                                    new Error(
                                                      'Database error [failed to update user from]'
                                                    )
                                                  );
                                              }
                                            );
                                          }
                                        }
                                      }
                                    );
                                  } else {
                                    connection.rollback((rollbackError) => {
                                      if (rollbackError)
                                        reject(rollbackError.message);
                                      else
                                        reject(
                                          new Error(
                                            'Database error [failed to update user from]'
                                          )
                                        );
                                    });
                                  }
                                }
                              }
                            );
                          } else {
                            connection.rollback((rollbackError) => {
                              if (rollbackError) reject(rollbackError.message);
                              else
                                reject(
                                  new Error(
                                    'Database error [failed to create case]'
                                  )
                                );
                            });
                          }
                        }
                      }
                    );
                  } else {
                    connection.rollback((rollbackError) => {
                      if (rollbackError) reject(rollbackError.message);
                      else
                        reject(
                          new Error(
                            'Database error [data user id is not valid]'
                          )
                        );
                    });
                  }
                }
              });
            } else {
              connection.rollback((rollbackError) => {
                if (rollbackError) reject(rollbackError.message);
                else
                  reject(new Error('Database error [data email is not valid]'));
              });
            }
          }
        });
      }
    });
  });
