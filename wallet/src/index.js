var express = require('express')
var app = express()

var pgp = require("pg-promise")(/*options*/)

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const name = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS
console.log(host)
console.log(port)
console.log(name)
console.log(user)
console.log(pass)
var db = pgp(`postgres://${user}:${pass}@${host}:${port}/${name}`)

app.get('/', function(req, res){
  db.one("SELECT $1 AS value", 123)
    .then(function (data) {
      res.status(200).send(`DATA: ${data.value}`)
    })
    .catch(function (error) {
      res.status(500).send(`ERROR: ${error}`)
    });
});

app.listen(3000)
