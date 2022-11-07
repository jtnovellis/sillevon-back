require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./database');
const { routesConfig } = require('./routes.config');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));

connectDB();
routesConfig(app);

module.exports = app;
