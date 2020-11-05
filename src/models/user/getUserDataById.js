const connection = require("../../configs/connection");

module.exports = async (data) => {
  let sql = `SELECT users.id as id,
                    users.email as email,
                    users.balance as balance,
                    user_details.full_name as full_name,
                    user_details.image as image,
                    user_details.phone_number as phone_number
                    FROM users INNER JOIN user_details ON users.id = user_details.user_id 
                    WHERE users.id=${data.id}`

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) reject(new Error("Internal Server Error"));
      if (res.length < 1) reject(new Error(`User id.${data.id}, not Found`));
      else resolve(res);
    });
  });
}