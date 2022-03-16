const express = require('express')
const dbRoutes = require('./db/routes.config')
const ethRoutes = require('./eth/routes.config')

function addRoutes(app) {
  dbRoutes.routesConfig(app);
  ethRoutes.routesConfig(app);
}

function runExpress() {
  const app = express();
  addRoutes(app);

  app.listen(3000);
}


(async () => {
  // const conf = await loadConfig();

  runExpress();
})();


