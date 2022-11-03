const user = require('./api/user/user.route');
const genre = require('./api/genre/genre.route');

const routesConfig = (app) => {
  app.use('/auth/local', user);
  app.use('/api/users', user);
  app.use('/api/genres', genre);
};

module.exports = { routesConfig };
