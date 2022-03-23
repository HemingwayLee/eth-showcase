var typeorm = require("typeorm")
var entitySchema = typeorm.EntitySchema

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const name = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS

exports.conn = typeorm.createConnection({
  type: "postgres",
  host: host,
  port: port,
  username: user,
  password: pass,
  database: name,
  synchronize: true,
  entities: [
    new entitySchema(require("./entities/smartContract")),
    new entitySchema(require("./entities/addresses")),
    new entitySchema(require("./entities/deployedSmartContract")),
    new entitySchema(require("./entities/transactions"))
  ]
});
