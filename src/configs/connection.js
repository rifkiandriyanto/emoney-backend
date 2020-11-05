const { database } = require('./index');
const mysql = require('mysql');

const connection = mysql.createConnection(database);

connection.connect((error) => {
  if (error) console.log(error);
  console.log('Database connected!');
});

module.exports = connection;
