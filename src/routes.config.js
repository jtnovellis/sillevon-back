const user = require('./api/user/user.route');

const routesConfig = (app) => {
  app.use('/auth/local', user);
  app.use('/api/users', user);
};

module.exports = { routesConfig };
