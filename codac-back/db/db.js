const mysql = require('mysql2');

var credenciales = {
  host: process.env.host,
  user: process.env.userDB,
  password: process.env.passDB,
  database: process.env.dataBase,
  multipleStatements: true
};
const mysqlConnection = mysql.createConnection(credenciales);

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
