const express = require('express')
const bodyParser = require('body-parser')
const dbRoutes = require('./db/routes.config')
const ethRoutes = require('./eth/routes.config')
const pageRoutes = require('./page/routes.config')

require('dotenv').config({path: `${__dirname}/.env`});

function addRoutes(app) {
  pageRoutes.routesConfig(app);
  dbRoutes.routesConfig(app);
  ethRoutes.routesConfig(app);
}

function runExpress() {
  const app = express();

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
