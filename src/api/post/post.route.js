const express = require('express');
const {
  createPostHandler,
  updatePostHandler,
  getPostsByUserHandler,
} = require('./post.controller');
const { authenticate } = require('../../utils/auth');
const { formData } = require('../../utils/formData');

const router = express.Router();

router.post('/new', authenticate, formData, createPostHandler);
router.get('/user-posts', authenticate, getPostsByUserHandler);
router.put('/update', authenticate, updatePostHandler);

module.exports = router;
