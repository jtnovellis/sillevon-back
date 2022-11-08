require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./database');
const { routesConfig } = require('./routes.config');

const app = express();

const whitelist = ['http://localhost:3000', 'https://sillevon.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

connectDB();
routesConfig(app);

module.exports = app;
