const dbController = require('./controller')

exports.routesConfig = function(app) {
  app.get('/db/insert/:name', [
    dbController.insertData
  ]);

  app.get('/db/all/', [
    dbController.getAll
  ]);
}

// app.get('/', function(req, res) {
//   res.status(200).send("Hello world!")
// })
