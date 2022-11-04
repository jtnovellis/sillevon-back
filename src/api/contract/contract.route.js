const express = require('express');
const {
  createContractHandler,
  updateContractHandler,
  getContractHandler,
} = require('./contract.controller');
const { authenticate } = require('../../utils/auth');

const router = express.Router();

router.post('/new/:artistId', authenticate, createContractHandler);
router.put('/update/:contractId', authenticate, updateContractHandler);
router.get('/:contractId', authenticate, getContractHandler);

module.exports = router;
