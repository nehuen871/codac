const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'nenu',
  password: 'Mohicano22!',
  database: 'tableros',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
