const dbController = require('./controller')

exports.routesConfig = function(app) {
  app.get('/db/address/all', [
    dbController.getAllAddress
  ]);
}
