const ethController = require('./controller')

exports.routesConfig = function(app) {
  
  app.get('/eth/create/', [
    ethController.create
  ]);

  app.get('/eth/balance/:addr', [
    ethController.getBalance
  ]);

  app.post('/eth/transaction/all/block/:count', [
    ethController.getLatestTransactions
  ]);

  app.post('/eth/add/', [
    ethController.addAccount
  ]);

  app.post('/eth/smartcontract/deploy/', [
    ethController.deploySmartContract
  ]);

  app.post('/eth/smartcontract/deployed/invoke', [
    ethController.invokeSmartContract
  ]);
}

