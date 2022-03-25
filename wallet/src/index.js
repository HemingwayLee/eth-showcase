require('dotenv').config({path: `${__dirname}/.env`});

const express = require('express')
const bodyParser = require('body-parser')
const dbRoutes = require('./db/routes.config')
const ethRoutes = require('./eth/routes.config')
const pageRoutes = require('./page/routes.config')
const orm = require('./db/db.config')
const config = require('./config')

async function initData(conn) {
  const accounts = config.getAccountsFromEnv();

  await conn.then(async conn => {
    const repo = await conn.getRepository("Addresses");
    await repo.clear();
    await repo.save(accounts);
  }).catch(error => {
    console.log(error);
  });

  const ret = config.getExistingSolidityCodeFromDisk();
  await conn.then(async conn => {
    const repo = await conn.getRepository("SmartContract");
    await repo.clear();
    await repo.save(ret.solEntries);
  }).catch(error => {
    console.log(error);
  });

  await conn.then(async conn => {
    const repo = await conn.getRepository("DeployedSmartContract");
    await repo.clear();
    await repo.save(ret.scEntries);
  }).catch(error => {
    console.log(error);
  });
}

function addRoutes(app) {
  pageRoutes.routesConfig(app);
  dbRoutes.routesConfig(app);
  ethRoutes.routesConfig(app);
}

function runExpress() {
  const app = express();

  initData(orm.conn);

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  addRoutes(app);

  app.listen(3000);
}

(async () => {
  // const conf = await loadConfig();
  console.log(`The project ID is ${process.env.PROJECT_ID}`)

  runExpress();
})();
