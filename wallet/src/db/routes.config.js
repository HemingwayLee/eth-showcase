const dbController = require('./controller')

exports.routesConfig = function(app) {
  app.get('/db/address/all', [
    dbController.getAllAddress
  ]);

  app.get('/db/smartcontract/all', [
    dbController.getAllSmartContract
  ]);

  app.post('/db/smartcontract/add', [
    dbController.addSmartContract
  ]);
}
