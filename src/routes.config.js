const user = require('./api/user/user.route');

const routesConfig = (app) => {
  app.use('/auth/local', user);
};

module.exports = { routesConfig };
