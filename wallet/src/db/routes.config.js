const dbController = require('./controller')

exports.routesConfig = function(app) {
  app.get('/db/address/all', [
    dbController.getAllAddress
  ]);

  app.get('/db/transaction/all', [
    dbController.getAllTransaction
  ]);

  app.get('/db/smartcontract/all', [
    dbController.getAllSmartContract
  ]);

  app.get('/db/smartcontract/deployed/all', [
    dbController.getAllDeployedSmartContract
  ]);

  app.post('/db/smartcontract/add', [
    dbController.addSmartContract
  ]);
}
