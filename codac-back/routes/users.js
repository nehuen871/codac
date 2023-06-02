var express = require('express');
var router = express.Router();
const mysqlConnection  = require('../db/db.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  const query = `SELECT * from usuarios;`;
  mysqlConnection.query(query, (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json({data:rows});
      }
    } else {
      res.json(err);
    }
  });
});
router.post('/insert', (req, res) => {
  console.log(req.body);
  let {nombre,apellido,cuit,pass,roles_idroles} = req.body;
  const query = `INSERT INTO usuarios (nombre,apellido,cuit,pass,roles_idroles) VALUES (?,?,?,?,?);`;
  mysqlConnection.query(query,[nombre,apellido,cuit,pass,roles_idroles], (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json(rows);
      }
    } else {
      res.json(err);
    }
  });
});

router.post('/getUser', (req, res) => {
  console.log(req.body);
  let {id} = req.body;
  const query = `SELECT * from usuarios where id = ?;`;
  mysqlConnection.query(query,[id], (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json(rows);
      }
    } else {
      res.json(err);
    }
  });
});

/**UPDATE `usuarios`.`usuarios` SET `nombre` = 'test31' WHERE (`idusuarios` = '3');
 */

router.post('/edit', (req, res) => {
  console.log(req.body);
  let {nombre,apellido,cuit,pass,roles_idroles,idusuarios} = req.body;
  const query = `UPDATE usuarios SET nombre=?, apellido=?, cuit=?, pass=?,roles_idroles=? WHERE idusuarios = ?;`;
  mysqlConnection.query(query,[nombre,apellido,cuit,pass,roles_idroles,idusuarios], (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json(rows);
      }
    } else {
      res.json(err);
    }
  });
});


/**DELETE FROM `usuarios`.`usuarios` WHERE (`idusuarios` = '4'); */
router.post('/delete', (req, res) => {
  console.log(req.body);
  let {idusuarios} = req.body;
  const query = `DELETE from usuarios WHERE idusuarios = ?;`;
  mysqlConnection.query(query,[idusuarios], (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json(rows);
      }
    } else {
      res.json(err);
    }
  });
});


router.post('/getUserData', (req, res) => {
  let {idSearch} = req.body;
  response = "";
  try {
    let urlSend = process.env.userDataUrl+idSearch;
    const init = {
      method: 'GET'
    };
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
