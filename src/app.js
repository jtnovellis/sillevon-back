require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const { connectDB } = require('./database');
const { routesConfig } = require('./routes.config');

const app = express();

app.use(express.json());
// app.use(cors({ origin: 'https://sillevon.vercel.app' }));
app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

connectDB();
routesConfig(app);

module.exports = app;
