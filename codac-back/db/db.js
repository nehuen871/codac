const mysql = require('mysql2');


switch (process.env.ambiente) {
  case "prod":
    var credenciales = {
      host: process.env.hostProduccion,
      user: process.env.userDBprod,
      password: process.env.passDBprod,
      database: process.env.dataBase,
      multipleStatements: true
    };
    break;
  case "hml":
    var credenciales = {
      host: process.env.hostHML,
      user: process.env.userDBhml,
      password: process.env.passDBhml,
      database: process.env.dataBase,
      multipleStatements: true
    };
    break;
  case "qa":
    var credenciales = {
      host: process.env.hostQa,
      user: process.env.userDBqa,
      password: process.env.passDBqa,
      database: process.env.dataBase,
      multipleStatements: true
    };
    break;
  case "dev":
    var credenciales = {
      host: process.env.hostDev,
      user: process.env.userDBdev,
      password: process.env.passDBdev,
      database: process.env.dataBase,
      multipleStatements: true
    };
    break;
  default:
    var credenciales = {
      host: process.env.hostLocal,
      user: process.env.userDBlocal,
      password: process.env.passDBlocal,
      database: process.env.dataBase,
      multipleStatements: true
    };
    break;
}
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
