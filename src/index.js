const app = require('./app');
const { connectDB } = require('./database');

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, async () => {
  await connectDB();
  console.log(
    `The Server is runnig on port: http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
