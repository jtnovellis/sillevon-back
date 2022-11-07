const {
  updateConnectionHandler,
  createConnectionHandler,
} = require('./connection.controller');
const express = require('express');
const { authenticate } = require('../../utils/auth');

const router = express.Router();

router.post('/new', authenticate, createConnectionHandler);
router.put('/update/:connectionId', authenticate, updateConnectionHandler);

module.exports = router;
