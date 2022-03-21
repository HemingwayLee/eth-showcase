const ethController = require('./controller')

exports.routesConfig = function(app) {
  
  app.get('/eth/create/', [
    ethController.create
  ]);

  app.get('/eth/balance/:addr', [
    ethController.getBalance
  ]);

  app.post('/eth/add/', [
    ethController.addAccount
  ]);
}

