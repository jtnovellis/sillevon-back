const server = require('./src/app');

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

server.listen(PORT, async () => {
  console.log(
    `The Server is runnig on port: http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
