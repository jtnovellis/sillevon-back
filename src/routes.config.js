const user = require('./api/user/user.route');
const genre = require('./api/genre/genre.route');
const post = require('./api/post/post.route');
const comment = require('./api/comment/comment.route');
const contract = require('./api/contract/contract.route');

const routesConfig = (app) => {
  app.use('/auth/local', user);
  app.use('/api/users', user);
  app.use('/api/genres', genre);
  app.use('/api/posts', post);
  app.use('/api/comments', comment);
  app.use('/api/contracts', contract);
};

module.exports = { routesConfig };
