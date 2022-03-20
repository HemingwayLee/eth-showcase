const pageController = require('./controller')
const nunjucks = require('nunjucks')

exports.routesConfig = function(app) {
  nunjucks.configure('./src/views', {
    autoescape: true,
    express: app
  });
  
  app.get('/', [
    pageController.dashboard
  ]);

  app.get('/page/dashboard/', [
    pageController.dashboard
  ]);

  app.get('/page/addresses/', [
    pageController.addresses
  ]);

  app.get('/page/tokens/', [
    pageController.tokens
  ]);
}
