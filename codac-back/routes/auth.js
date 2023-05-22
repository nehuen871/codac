var express = require('express');
var router = express();
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
const mysqlConnection  = require('../db/db.js');
switch (process.env.ambiente) {
  case "prod":
    var url = process.env.adUrlPrdo;
    break;
  case "hml":
    var url = process.env.adUrlHml;
    break;
  case "qa":
    var url = process.env.adUrlQa;
    break;
  case "dev":
    var url = process.env.adUrlDev;
    break;
  default:
    var url = process.env.adUrlLocal;
    break;
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  let {cuit,pass} = req.body;
  const query = `SELECT * from usuarios where cuit = ? and pass = ?;`;
  mysqlConnection.query(query,[cuit,pass], (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json({data:rows[0]});
      }
    } else {
      res.json(err);
    }
  });
});
router.post('/adauth', (req, res) => {
  let {cuit,pass} = req.body;
  response = "";
  try {
    let urlSend = url+cuit;
    const init = {
      method: 'GET',
      headers:{
        'client_id': process.env.client_id,
        'client_secret': process.env.client_secret
      }
    };
    console.log(urlSend);
    console.log(init);
    fetch(urlSend, init)
    .then((response) => {
      return response.json(); // or .text() or .blob() ...
    })
    .then((text) => {
      res.json(text);
    })
    .catch((e) => {
      console.log(e);
    });
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;
