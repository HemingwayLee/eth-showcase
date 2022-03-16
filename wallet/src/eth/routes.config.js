const ethController = require('./controller')

exports.routesConfig = function(app) {
  
  app.get('/eth/create/', [
    ethController.create
  ]);

  app.get('/eth/send/', [
    ethController.send
  ]);
}

